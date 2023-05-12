<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getStorage, ref as firebaseRef, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import "../css/main.css";

//デフォルトの画像
const defaultIconURL =
  "https://4.bp.blogspot.com/-YYjAdMaEFQk/UbVvW1p58xI/AAAAAAAAUwI/6mIziJiekDU/s400/vacation_island.png";

const route = useRoute();
const router = useRouter();

//島情報取得
const IslandId = ref(route.params.id);
const Island = ref({
  icon: "",
  islandName: "",
  islandDescription: "", 
  comment: "",
});

const overName = ref("");
const overDescription = ref("");
const overComment = ref("");

const data = ref({
  recruitTitle: "",
  recruitJob: "",
  recruitPoint: "",
  createDate: "",
});

onMounted(async () => {
  try {
    const response = await fetch(
      `http://localhost:8000/Islands/${IslandId.value}`
    );
    if (!response.ok) {
      throw new Error(`HTTPエラーです！！！: ${response.status}`);
    }
    Island.value = await response.json();
    console.log("IslandId.valueの中身", IslandId.value);
  } catch (err) {
    err.value = err;
    console.log("エラー", err.value);
  }
});

//icon選択
async function iconEdit(event) {
  try {
    const file = event.target.files[0];
    if (!file) return; // ファイルが選択されていない場合は終了
    
    const storage = getStorage(); // Firebase Storage instance
    const storageRef = firebaseRef(storage, `island/${file.name}`); // Firebase Storageに保存するパスを指定
    await uploadBytesResumable(storageRef, file); // ファイルをFirebase Storageにアップロード

    // アップロードした画像のURLを取得して、Island.iconにセット
    const fileURL = await getDownloadURL(storageRef);
    Island.value.icon = fileURL;
  } catch (error) {
    console.error(error);
  }
}


//画像削除
const removeIcon = () => {
  Island.value.icon = defaultIconURL;
};

//Island更新
async function updateIslands() {
  if (!check()) {
    return;
  }
  try {
    const response = await fetch(
      `http://localhost:8000/Islands/${Island.value.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Island.value),
      }
    );

    // recruitNewUser更新
    async function updateRecruitNewUser() {
      try {
        const response = await fetch(
          `http://localhost:8000/RecruitNewUser/${Island.value.id}`
        );
        if (!response.ok) {
          console.log(`RecruitNewUser/${Island.value.id}は存在しません`);
          return;
        }
        // const recruitNewUserData = await response.json();
        await fetch(`http://localhost:8000/RecruitNewUser/${Island.value.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            islandId: IslandId.value,
            recruitTitle: data.value.recruitTitle,
            recruitJob: data.value.recruitJob,
            recruitPoint: data.value.recruitPoint,
            createDate: data.value.createDate,
            islandName: Island.value.islandName,
            islandIcon: Island.value.icon,
          }),
        });
      } catch (error) {
        console.error("エラーが発生しました:", error);
      }
    }

    updateRecruitNewUser();

    if (!response.ok) {
      throw new Error(`HTTPエラーです！！！: ${response.status}`);
    }
    console.log("更新！！！！");
    // router.push(`/islandShow/${Island.value.id}`);
  } catch (err) {
    console.log("更新できません", err);
  }
}

const back = () => {
  router.push(`/islandShow/${IslandId.value.id}`);
};

// バリデーションチェック
function check() {
  let isValid = true;

  const maxName = 20;
  if (
    Island.value.islandName.length > maxName ||
    Island.value.islandName.length === 0
  ) {
    overName.value = "島名は1文字以上20文字以内で入力してください";
    isValid = false;
  } else {
    overName.value = "";
  }

  const maxDescription = 20;
  if (
    Island.value.islandDescription.length > maxDescription ||
    Island.value.islandDescription.length === 0
  ) {
    overDescription.value = "詳細は1文字以上20文字以内で入力してください";
    isValid = false;
  } else {
    overDescription.value = "";
  }

  // Island.commentに関するバリデーション
  const maxComment = 255;
  if (Island.value.comment.length > maxComment) {
    overComment.value = "ひとことは255文字以内で入力してください";
    isValid = false;
  } else {
    overComment.value = "";
  }

  return isValid; // すべて成功
}
</script>

<template>
  <!-- 島編集画面 -->
  <div class="mypage">
    <div class="mypage__container">
      <div class="edit__column">
        <label for="icon_file">
          <img :src="Island.icon" alt="" class="mypage__profileiconImg" />
        </label>
        <input
          type="file"
          @change="iconEdit"
          id="icon_file"
          style="display: none"
        />
        <button @click="removeIcon" class="edit__button_cansel">
          画像を削除
        </button>
      </div>
      <ul class="edit__column2">
        <li class="mypage__item_name">
          <p>島名：</p>

          <div>
            <input
              type="text"
              v-model="Island.islandName"
              class="edit__input"
            />
          </div>
          <div style="height: 40px">
            <span v-show="overName" class="mypage__check">{{ overName }}</span>
          </div>
          <p  class="mypage__details">島詳細：</p>
          
          <div>
            <input
            type="text"
            v-model="Island.islandDescription"
            class="edit__input"
            />
          </div>
          <div style="height: 40px;">
             <span v-show="overDescription" class="mypage__check">{{
            overDescription
          }}</span>
          </div>
        </li>
      </ul>
    </div>
    <div class="edit__item">
      <span>ひとこと：</span>
      <p>
        <textarea
        cols="30"
        rows="10"
        class="edit__textarea"
        v-model="Island.comment"
        ></textarea>
      </p>
      <div style="height: 40px;">
        <span v-show="overComment" class="mypage__check">{{ overComment }}</span>
      </div>
    </div>
    
    <div class="edit__buttoncontainer">
      <button class="edit__button_cansel" @click="back">戻る</button>
      <button class="edit__button" @click="updateIslands">更新</button>
    </div>
  </div>
</template>

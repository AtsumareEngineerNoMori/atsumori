<script setup>
// import { placeholder } from "@babel/types";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import "../css/main.css";
import { auth } from "../../firebase";

//会員情報取得
const userId = ref(); //firebaseでログインしてる人のIDが入る
const err = ref();
const User = ref({
  icon: "",
  name: "",
  icon: "",
  job: "",
  comment: "",
});
const router = useRouter();
const overName = ref("");
const overComment = ref("");

const back = () => {
  router.push("/mypage");
};
//会員情報取得
onMounted(async () => {
  //onAuthStateChanged★Firebaseの認証状態が変更されたときに呼び出され、現在の認証状態を示すユーザーオブジェクトを返す
  auth.onAuthStateChanged(async (loggedInUser) => {
    if (loggedInUser) {
      userId.value = loggedInUser.uid; // ログインしているユーザーのUIDをセット

      try {
        const response = await fetch(
          `http://localhost:8000/Users/${userId.value}`
        );
        if (!response.ok) {
          throw new Error(`HTTPエラーです！！！: ${response.status}`);
        }
        User.value = await response.json();
        console.log("User.valueの中身", User.value);
      } catch (err) {
        err.value = err;
        console.log("エラー", err.value);
      }
    } else {
      router.push("/login");
    }
  });
});

//icon選択
async function iconEdit(event) {
  try {
    const file = event.target.files[0];
    if (!file) return; // ファイルが選択されていない場合は終了
    const base64String = await convertToBase64(file);
    User.value.icon = base64String;
  } catch (error) {
    console.error(error);
  }
}

function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

//デフォルトの画像
const defaultIconURL =
  "https://3.bp.blogspot.com/-n0PpkJL1BxE/VCIitXhWwpI/AAAAAAAAmfE/xLraJLXXrgk/s170/animal_hamster.png";

//画像削除
const removeIcon = () => {
  User.value.icon = defaultIconURL;
};
//User更新
async function updateUser() {
  if (!check()) {
    return;
  }
  try {
    const response = await fetch(
      `http://localhost:8000/Users/${userId.value}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(User.value),
      }
    );
    if (!response.ok) {
      throw new Error(`HTTPエラーです！！！: ${response.status}`);
    }
    console.log("更新！！！！");
    router.push("/mypage");
  } catch (err) {
    console.log("更新できません", err);
  }
}

// バリデーションチェック
function check() {
  const maxName = 20;
  if (User.value.name.length > maxName) {
    overName.value = "名前は1文字以上20文字以内で入力してください";
    return false;
  } else {
    overName.value = "";
  }

  const maxComment = 255;
  if (User.value.comment.length > maxComment) {
    overComment.value = "コメントは255文字以内で入力してください";
    return false;
  }
  return true;
}

</script>

<template>
  <div class="edit">
    <div class="edit__container">
      <div class="edit__column">
        <label for="icon_file">
          <img :src="User.icon" alt="" class="mypage__profileiconImg" />
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
          <sp>なまえ：</sp>
          <span v-if="overName" class="mypage__check">{{ overName }}</span>
          <span
            ><input
              type="text"
              v-model="User.name"
              class="edit__input"
          /></span>
        </li>
        <li class="mypage__item">
          <span>職種：</span>
          <label class="edit__label">
            <input type="radio" name="job" value="WEB" v-model="User.job" />
            WEB
          </label>
          <label class="edit__label">
            <input type="radio" name="job" value="FR" v-model="User.job" />
            FR
          </label>
          <label class="edit__label">
            <input type="radio" name="job" value="ML" v-model="User.job" />
            ML
          </label>
          <label class="edit__label">
            <input type="radio" name="job" value="CL" v-model="User.job" />
            CL
          </label>
          <label class="edit__label">
            <input type="radio" name="job" value="QA" v-model="User.job" />
            QA
          </label>
          <label class="edit__label">
            <input type="radio" name="job" value="その他" />
            その他
          </label>
        </li>
        <li class="mypage__item">
          <span>ひとこと：</span><span v-if="overComment"  class="mypage__check">{{ overComment }}</span>
          <p>
            <textarea
              cols="30"
              rows="10"
              class="edit__input"
              v-model="User.comment"
                  ></textarea>
          </p>
        </li>
      </ul>
    </div>
    <div class="edit__buttoncontainer">
      <button class="edit__button_cansel" @click="back">戻る</button>
      <button class="edit__button" @click="updateUser">更新</button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import "../css/main.css";

const Islands = ref(1); //?????
//島情報取得
const IslandId = ref(1); //firebaseでログインしてる人のIDが入る
const Island = ref({
  icon: "",
  islandName: "",
  comment: "",
});
const data = ref({
  recruitTitle: "",
  recruitJob: "",
  recruitPoint: "",
  createDate: "",
});

onMounted(async () => {
  try {
    const response = await fetch(
      `http://localhost:8000/Islands/${Islands.value}`
    );
    if (!response.ok) {
      throw new Error(`HTTPエラーです！！！: ${response.status}`);
    }
    Islands.value = await response.json();
    console.log("Islands.valueの中身", Islands.value);
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
    const base64String = await convertToBase64(file);
    Islands.value.icon = base64String;
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

//RecruitNewUser取得
const getFlight = async () => {
  const response = await fetch(
    `http://localhost:8000/RecruitNewUser/${IslandId.value}`
  );
  const recruitNewUserData = await response.json();
  console.log(recruitNewUserData);
  data.value = recruitNewUserData;
  console.log(data);
};
getFlight();

//デフォルトの画像
const defaultIconURL =
  "https://4.bp.blogspot.com/-YYjAdMaEFQk/UbVvW1p58xI/AAAAAAAAUwI/6mIziJiekDU/s400/vacation_island.png";

//画像削除
const removeIcon = () => {
  Islands.value.icon = defaultIconURL;
};

//Island更新
async function updateIslands() {
  try {
    const response = await fetch(
      `http://localhost:8000/Islands/${Islands.value.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Islands.value),
      }
    );

    // recruitNewUser更新
    const updateRecruitNewUser = () => {
      fetch(`http://localhost:8000/RecruitNewUser/${Islands.value.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          islandId: IslandId,
          recruitTitle: data.value.recruitTitle,
          recruitJob: data.value.recruitJob,
          recruitPoint: data.value.recruitPoint,
          createDate: data.value.createDate,
          islandName: Island.value.islandName,
          islandIcon: Island.value.icon,
          id: IslandId,
        }),
      });
    };
    updateRecruitNewUser();

    if (!response.ok) {
      throw new Error(`HTTPエラーです！！！: ${response.status}`);
    }
    console.log("更新！！！！");
  } catch (err) {
    console.log("更新できません", err);
  }
}
</script>

<template>
  <!-- 島編集画面 -->
  <div class="mypage">
    <div class="mypage__container">
      <div class="edit__column">
        <label for="icon_file">
          <img :src="Islands.icon" alt="" class="mypage__profileiconImg" />
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
          <span
            ><input
              type="text"
              v-model="Islands.islandName"
              class="edit__input"
          /></span>
          <p>島詳細：</p>
          <span
            ><input
              type="text"
              v-model="Islands.islandDescription"
              class="edit__input"
          /></span>
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
          v-model="Islands.comment"
        ></textarea>
      </p>
    </div>
    <div class="edit__buttoncontainer">
      <button class="edit__button_cansel">戻る</button>
      <button class="edit__button" @click="updateIslands">更新</button>
    </div>
  </div>
</template>

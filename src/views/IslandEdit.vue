<script setup>
import { onMounted, ref } from "vue";
import "../css/main.css";

const img = {
  icon: "https://1.bp.blogspot.com/-4Ng1gNmOhAM/V2ucIdYoIAI/AAAAAAAA7vs/trvOgTP7V30aBo8mAV-d5xlcTyaQHCq3gCLcB/s800/mujintou_kojima.png",
  name: "アイコン",
};

//島情報取得
const IslandId = ref(1); //firebaseでログインしてる人のIDが入る
const Island = ref({
  icon: "",
  islandName: "",
  comment: "",
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
    console.log("User..valueの中身", Island.value.islandName);
  } catch (err) {
    err.value = err;
    console.log("エラー", err.value);
  }
});

async function iconEdit(event) {
  try {
    const file = event.target.files[0];
    if (!file) return; // ファイルが選択されていない場合は終了
    const base64String = await convertToBase64(file);
    Island.value.icon = base64String;
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

//Islands更新
async function updateIsland() {
  try {
    const response = await fetch(
      `http://localhost:8000/Islands/${IslandId.value}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Island.value),
      }
    );
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
  <div class="edit">
    <div class="edit__container">
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
      </div>
      <ul class="edit__column2">
        <li class="mypage__item_name">
          <p>島名：</p>
          <span
            ><input type="text" v-model="Island.islandName" class="edit__input"
          /></span>
        </li>

        <li class="mypage__item">
          <span>ひとこと：</span>
          <p>
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              class="edit__input"
              v-model="Island.comment"
            ></textarea>
          </p>
        </li>
      </ul>
    </div>
    <div class="edit__buttoncontainer">
      <router-link to="/show"
        ><button class="edit__button_cansel">戻る</button></router-link
      >
      <button class="edit__button" @click="updateIsland">更新</button>
    </div>
  </div>
</template>

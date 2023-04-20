<script setup>
// import { placeholder } from "@babel/types";
import { onMounted, ref } from "vue";
import "../css/main.css";

const img = {
  icon: "https://1.bp.blogspot.com/-ZOg0qAG4ewU/Xub_uw6q0DI/AAAAAAABZio/MshyuVBpHUgaOKJtL47LmVkCf5Vge6MQQCNcBGAsYHQ/s1600/pose_pien_uruuru_woman.png",
  name: "アイコン",
};

//会員情報取得
const userId = ref(2); //firebaseでログインしてる人のIDが入る
const err = ref();
const User = ref({
  name: "",
  job: "",
  comment: "",
});

//会員情報取得
onMounted(async () => {
  try {
    const response = await fetch(`http://localhost:8000/Users/${userId.value}`);
    if (!response.ok) {
      throw new Error(`HTTPエラーです！！！: ${response.status}`);
    }
    User.value = await response.json();
    console.log("User..valueの中身", User.value.name);
  } catch (err) {
    err.value = err;
    console.log("エラー", err.value);
  }
});

//User更新
async function updateUser() {
  try {
    const response = await fetch(`http://localhost:8000/Users/${userId.value}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(User.value),
    });
    if (!response.ok) {
      throw new Error(`HTTPエラーです！！！: ${response.status}`);
    }
    console.log('更新！！！！');
  } catch (err) {
    console.log("更新できません", err);
  }
}
</script>

<template>
  <div class="edit">
    <div class="edit__container">
      <div class="edit__column">
        <span>
          <img :src="img.icon" alt="" class="mypage__profileiconImg"
        /></span>
        <span>アイコン</span>
      </div>
      <ul class="edit__column2">
        <li class="mypage__item_name">
          <p>なまえ：</p>
          <span><input 
            type="text"
            v-model="User.name"
             class="edit__input" /></span>
        </li>
        <li class="mypage__item">
          <span>職種：</span>
          <label class="edit__label">
            <input type="radio" name="job" value="WEB" v-model="User.job"/>
            WEB
          </label>
          <label class="edit__label">
            <input type="radio" name="job" value="FR" v-model="User.job"/>
            FR
          </label>
          <label class="edit__label">
            <input type="radio" name="job" value="ML" v-model="User.job"/>
            ML
          </label>
          <label class="edit__label">
            <input type="radio" name="job" value="CL" v-model="User.job"/>
            CL
          </label>
          <label class="edit__label">
            <input type="radio" name="job" value="QA" v-model="User.job"/>
            QA
          </label>
          <label class="edit__label">
            <input type="radio" name="job" value="その他" />
            その他
          </label>
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

              v-model="User.comment"
            ></textarea>
          </p>
        </li>
      </ul>
    </div>
    <div class="edit__buttoncontainer">
      <button class="edit__button_cansel">戻る</button>
      <button class="edit__button" @click="updateUser">更新</button>
    </div>
  </div>
</template>

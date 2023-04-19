<script setup>
// import { onMounted } from "vue";
import { onMounted, ref } from "vue";
import "../css/main.css";

const img = {
  icon: "https://1.bp.blogspot.com/-ZOg0qAG4ewU/Xub_uw6q0DI/AAAAAAABZio/MshyuVBpHUgaOKJtL47LmVkCf5Vge6MQQCNcBGAsYHQ/s1600/pose_pien_uruuru_woman.png",
  name: "アイコン",
};

const islandimgs = [
  {
    icon: "https://1.bp.blogspot.com/-4Ng1gNmOhAM/V2ucIdYoIAI/AAAAAAAA7vs/trvOgTP7V30aBo8mAV-d5xlcTyaQHCq3gCLcB/s800/mujintou_kojima.png",
    name: "島の名前",
  },
  // {
  //   icon: "https://1.bp.blogspot.com/-4Ng1gNmOhAM/V2ucIdYoIAI/AAAAAAAA7vs/trvOgTP7V30aBo8mAV-d5xlcTyaQHCq3gCLcB/s800/mujintou_kojima.png",
  //   name: "島の名前",
  // },
  // {
  //   icon: "https://1.bp.blogspot.com/-4Ng1gNmOhAM/V2ucIdYoIAI/AAAAAAAA7vs/trvOgTP7V30aBo8mAV-d5xlcTyaQHCq3gCLcB/s800/mujintou_kojima.png",
  //   name: "島の名前",
  // },
  // {
  //   icon: "https://1.bp.blogspot.com/-4Ng1gNmOhAM/V2ucIdYoIAI/AAAAAAAA7vs/trvOgTP7V30aBo8mAV-d5xlcTyaQHCq3gCLcB/s800/mujintou_kojima.png",
  //   name: "島の名前",
  // },
];

const projectimgs = [
  {
    icon: "https://1.bp.blogspot.com/-EHBItm2ov28/X7zMLiDUlnI/AAAAAAABcZg/Hn1EagLhVecSENp47dA46nL8wXAP4iChQCNcBGAsYHQ/s608/sweets_tarte_strawberry.png",
    name: "プロジェクトの名前",
  },
  {
    icon: "https://1.bp.blogspot.com/-lo3ZURN60RE/Xhwqu1HEAqI/AAAAAAABXDk/RuSIKIMAJyU8EL7dMQ7pnwzlwPLKTLK0gCNcBGAsYHQ/s1600/sweets_cake_chocomint.png",
    name: "プロジェクトの名前",
  },
  // {
  //   icon: "https://1.bp.blogspot.com/-ckRQQXz6PjE/XQjuezvDalI/AAAAAAABTSk/NGgomBsGNMwk5leKd59gD7899JjDyTBiACLcBGAs/s800/sweets_chocolate_mousse.png",
  //   name: "プロジェクトの名前",
  // },
  // {
  //   icon: "https://4.bp.blogspot.com/-vNWAqceM3a4/XLAde7hE1_I/AAAAAAABSY0/x6xuysVAp-c6eyzZk5fDQ_tjgOdiccsiQCLcBGAs/s800/sweets_pafe_parfait_ichigo.png",
  //   name: "プロジェクトの名前",
  // },
];

const Islands = ref({
  id: 1,
  icon: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiLuW2xcJlrbLdQDiw-wTCsElgoQIvbaXRZ40pCZX9vxYuLh1W3njnzZ_SZddy3nVpXeTDZqdKX6rI-MQBECmDwL80RPHDA4d5_lBe89Z8YTbBw9LSlnkTYFbKFmLvObN6tMyyCx7kPVQiMVILHoqH-ze4DDH1n6tf6PIo06l_6w95xdmZ40m7X7Bzx9g/s400/rennai_kaeruka.png",
  islandName: "Vue島",
  islandDescription: "Vueできる人集まれ",
  comment: "Vueについて話しましょう",
  adminId: 1,
  createDate: "2023-04-17",
});

const User = ref({
  name: "",
  job: "",
  comment: "",
});
const userId = ref(2); //firebaseでログインしてる人のIDが入る
const err = ref();

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
</script>

<template>
  <div class="mypage">
    <button class="mypage__button">依頼一覧</button>
    <div class="mypage__container">
      <div class="mypage__column">
        <span
          ><img :src="img.icon" alt="" class="mypage__profileiconImg"
        /></span>
        <router-link to="/mypageedit"
          ><button class="mypage__button">マイページ編集</button></router-link
        >
      </div>
      <ul class="mypage__column2">
        <li class="mypage__item">
          <span>なまえ： </span>
          <span>{{ User.name }}</span>
        </li>
        <li class="mypage__item">
          <span>職種：</span>
          <span>{{ User.job }}</span>
        </li>
        <li class="mypage__item">
          <span>ひとこと：</span>
          <p>
            {{ User.comment }}
          </p>
        </li>
      </ul>
    </div>

    <!-- 島一覧 -->
    <div class="mypage__table">
      <div class="mypage__div">島一覧</div>
      <ul
        v-for="islandimg in islandimgs"
        :key="islandimg"
        class="mypage__lists"
      >
        <li>
          <div class="mypage__space">
            <img
              v-bind:src="Islands.icon"
              alt="islandig"
              class="mypage__iconImg"
            />
            <p>島名~~</p>
          </div>
        </li>
      </ul>
      <button class="mypage__morebutton">もっと見る</button>
    </div>

    <!-- プロジェクト一覧 -->
    <div class="mypage__table">
      <p>プロジェクト一覧</p>
      <ul
        v-for="projectimg in projectimgs"
        :key="projectimg"
        class="mypage__lists"
      >
        <li>
          <div class="mypage__spase">
            <img
              v-bind:src="projectimg.icon"
              alt="projecticon"
              class="mypage__iconImg"
            />
            <p>プロジェクト名</p>
          </div>
        </li>
      </ul>
      <button class="mypage__morebutton">もっと見る</button>
    </div>
  </div>
</template>

<script setup>
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
  {
    icon: "https://1.bp.blogspot.com/-4Ng1gNmOhAM/V2ucIdYoIAI/AAAAAAAA7vs/trvOgTP7V30aBo8mAV-d5xlcTyaQHCq3gCLcB/s800/mujintou_kojima.png",
    name: "島の名前",
  },
  {
    icon: "https://1.bp.blogspot.com/-4Ng1gNmOhAM/V2ucIdYoIAI/AAAAAAAA7vs/trvOgTP7V30aBo8mAV-d5xlcTyaQHCq3gCLcB/s800/mujintou_kojima.png",
    name: "島の名前",
  },
  {
    icon: "https://1.bp.blogspot.com/-4Ng1gNmOhAM/V2ucIdYoIAI/AAAAAAAA7vs/trvOgTP7V30aBo8mAV-d5xlcTyaQHCq3gCLcB/s800/mujintou_kojima.png",
    name: "島の名前",
  },
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
  {
    icon: "https://1.bp.blogspot.com/-ckRQQXz6PjE/XQjuezvDalI/AAAAAAABTSk/NGgomBsGNMwk5leKd59gD7899JjDyTBiACLcBGAs/s800/sweets_chocolate_mousse.png",
    name: "プロジェクトの名前",
  },
  {
    icon: "https://4.bp.blogspot.com/-vNWAqceM3a4/XLAde7hE1_I/AAAAAAABSY0/x6xuysVAp-c6eyzZk5fDQ_tjgOdiccsiQCLcBGAs/s800/sweets_pafe_parfait_ichigo.png",
    name: "プロジェクトの名前",
  },
];
</script>

<template>
  <h1>島編集画面</h1>
  <div class="mypage">
    <div class="mypage__container">
      <div class="edit__column">
        <span>
          <img :src="img.icon" alt="" class="mypage__profileiconImg"
        /></span>
      </div>
      <ul class="edit__column2 ">
        <li class="mypage__item_name">
          <p>島名： </p>
          <span><input type="text" class="edit__input" /></span>
        </li>
      </ul>
    </div>
    <div class="edit__item">
      <span>ひとこと：</span>
      <p>
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          class="edit__textarea"
        ></textarea>
      </p>
    </div>
    <div class="edit__buttoncontainer">
      <button class="edit__button">キャンセル</button>
      <button class="edit__button">更新</button>
    </div>
  </div>
</template>

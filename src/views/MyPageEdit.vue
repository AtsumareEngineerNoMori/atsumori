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
  <div class="mypage">
    <div class="mypage__container">
      <div class="mypage__column">
        <span>
          <img :src="img.icon" alt="" class="mypage__profileiconImg"
        /></span>
        <span>アイコン</span>
      </div>
      <ul class="mypage__column2">
        <li class="mypage__item_name">
          <span>なまえ： </span>
          <span><input type="text" class="edit__input" /></span>
        </li>
        <li class="mypage__item">
          <span>職種：</span>
          <label class="edit__label">
            <input type="checkbox" name="WEB" value="WEB" />
            WEB
          </label>
          <label class="edit__label">
            <input type="checkbox" name="FR" value="FR" />
            FR
          </label>
          <label class="edit__label">
            <input type="checkbox" name="ML" value="ML" />
            ML
          </label>
          <label class="edit__label">
            <input type="checkbox" name="CL" value="CL" />
            CL
          </label>
          <label class="edit__label">
            <input type="checkbox" name="QA" value="QA" />
            QA
          </label>
          <label class="edit__label">
            <input type="checkbox" name="その他" value="その他" />
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
            ></textarea>
          </p>
        </li>
      </ul>
    </div>
    <div class="edit__buttoncontainer">
      <button class="edit__button">戻る</button>
      <button class="edit__button">更新</button>
    </div>
  </div>
</template>

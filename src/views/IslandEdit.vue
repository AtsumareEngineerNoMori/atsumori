<script setup>
import "../css/main.css";

const img = {
  icon:  "https://1.bp.blogspot.com/-4Ng1gNmOhAM/V2ucIdYoIAI/AAAAAAAA7vs/trvOgTP7V30aBo8mAV-d5xlcTyaQHCq3gCLcB/s800/mujintou_kojima.png",
  name: "アイコン",
};

</script>

<template>
<!-- 島編集画面 -->
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
      <button class="edit__button_cansel">キャンセル</button>
      <button class="edit__button">更新</button>
    </div>
  </div>
</template>

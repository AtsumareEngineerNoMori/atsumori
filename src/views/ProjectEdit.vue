<script setup>
import "../css/main.css";

const img = {
  icon:  "https://1.bp.blogspot.com/-EHBItm2ov28/X7zMLiDUlnI/AAAAAAABcZg/Hn1EagLhVecSENp47dA46nL8wXAP4iChQCNcBGAsYHQ/s608/sweets_tarte_strawberry.png",
  name: "アイコン",
};
</script>

<template>
   <!-- プロジェクト編集画面 -->
  <div class="mypage">
    <div class="mypage__container">
      <div class="edit__column">
        <span>
          <img :src="img.icon" alt="" class="mypage__profileiconImg"
        /></span>
      </div>
      <ul class="edit__column2 ">
        <li class="mypage__item_name">
          <p>プロジェクト名： </p>
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

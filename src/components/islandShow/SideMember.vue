<script setup></script>

<template>
  <div class="member">
    <p class="member__title">メンバー</p>
    <div class="member__content">
      <img
        src="../../../public/beach-1824855_1920.jpg"
        class="member__content__icon"
      />
      <span class="member__content__name">田中太郎</span>
    </div>

    <!-- v-showで切り替え -->
    <div>
      <p class="member__title">許可待ちメンバー</p>
      <div class="member__content">
        <img
          src="../../../public/beach-1824855_1920.jpg"
          class="member__content__icon"
        />
        <span class="member__content__name">田中太郎</span>
        <div class="member__content__btn">
          <button class="member__content__btn__yes">許可</button>
          <a href="">
            <span class="material-symbols-outlined no"> cancel </span>
          </a>
        </div>
      </div>
    </div>

    <div class="member__btn">
      <button class="member__btn__scout">スカウト</button>
    </div>
    <!-- v-show -->
  </div>
</template>

<script setup>
import { signOut } from "@firebase/auth";
import { ref } from "vue";
import {  auth } from "../../../firebase";

const isShow = ref(false);
const toggleStatus  = () => {
    isShow.value = !isShow.value;
}

const logout = async () => {
  await signOut(auth);
};
</script>

<template>
  <div v-show="isShow" id="modal-1" aria-hidden="true">
    <div class="headerModal__overlay" tabindex="-1" data-micromodal-close
    >
      <div
        class="headerModal__container"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-1-title"
      >
        <!-- <header class="headerModal__header">
          <h2 class="headerModal__title" id="modal-1-title">MENU</h2>
        </header> -->
        <main class="headerModal__content" id="modal-1-content">
            <div class="headerModal__listdiv"><p class="headerModal__list">マイページ</p></div>
            <div class="headerModal__listdiv"><p class="headerModal__list">島登録</p></div>
            <div class="headerModal__listdiv"><p class="headerModal__list">プロジェクト登録</p></div>
            <RouterLink to="/login">
            <div @click="logout" class="headerModal__listdiv"><p class="headerModal__list">ログアウト</p></div>
            </RouterLink>
            <div class="headerModal__listdiv"><p @click="toggleStatus"
            data-micromodal-close
            aria-label="Close this dialog window"
            class="headerModal__tojiru">メニューを閉じる</p></div>
        </main>
      </div>
    </div>
  </div>
  <a
  v-on:click="toggleStatus"
    data-micromodal-trigger="modal-1"
    href="javascript:;"
    class="headerModal__a"
  >
    <img src="sozai_cman_jp_20230418144417.png"
    class="headerModal__menu" />
  </a>
</template>

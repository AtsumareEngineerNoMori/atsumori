<script setup>
import { ref } from "vue";
const isShow = ref(false);
const toggleStatus  = () => {
    isShow.value = !isShow.value;
}
</script>

<template>
  <div v-show="isShow" id="modal-1" aria-hidden="true">
    <div class="headerModal__overlay" tabindex="-1" data-micromodal-close>
      <div
        class="headerModal__container"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-1-title"
      >
        <header class="headerModal__header">
          <h2 class="headerModal__title" id="modal-1-title">MENU</h2>
        </header>
        <main class="headerModal__content" id="modal-1-content">
            <p class="headerModal__list">マイページ</p>
            <p class="headerModal__list">島登録</p>
            <p class="headerModal__list">プロジェクト登録</p>
            <p class="headerModal__list">ログアウト</p>
        </main>
        <footer class="headerModal__footer">
          <button
          @click="toggleStatus"
            class="headerModal__btn"
            data-micromodal-close
            aria-label="Close this dialog window"
          >
            Close
          </button>
        </footer>
      </div>
    </div>
  </div>
  <a
  v-on:click="toggleStatus"
    data-micromodal-trigger="modal-1"
    href="javascript:;"
    class="headerModal__a"
  >
    <img src="../../../public/sozai_cman_jp_20230418144417.png" class="headerModal__menu" />
    <!-- <span class="material-symbols-rounded set">モーダル</span> -->
  </a>
</template>

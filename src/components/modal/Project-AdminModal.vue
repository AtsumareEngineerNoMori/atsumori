<script setup>
import { ref } from "vue";

const isShow = ref(false);
const scout = ref(false);
const toggleStatus = () => {
  isShow.value = !isShow.value;
};
</script>
<template>
  <div v-show="isShow" id="modal-1" aria-hidden="true">
    <div class="modal__overlay" tabindex="-1" data-micromodal-close>
      <div
        class="modal__container"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-1-title"
      >
        <header class="modal__header">
          <h2 class="modal__title" id="modal-1-title">プロジェクト管理者専用</h2>
        </header>
        <main class="modal__content" id="modal-1-content">
          <div class="adminModal">
            <button class="adminModal__btn">編集</button>
            <button v-show="!scout" class="adminModal__btn scout">
              募集作成
            </button>
            <button v-show="scout" class="adminModal__btn stop">
              募集削除
            </button>
            <button class="adminModal__btn stop">解散</button>
          </div>
        </main>
        <footer class="modal__footer">
          <button
            @click="toggleStatus"
            class="modal__btn"
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
    @click="toggleStatus"
    data-micromodal-trigger="modal-1"
    href="javascript:;"
  >
    <span class="material-symbols-rounded set"> settings </span>
  </a>
</template>

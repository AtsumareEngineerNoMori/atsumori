<script setup>
import { ref } from "vue";

const isShow = ref(false);
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
          <h2 class="modal__title" id="modal-1-title">
            <label for="island-select">どの島から参加しますか？</label>
          </h2>
        </header>
        <main class="modal__content" id="modal-1-content">
          <select name="island" id="island-select" class="entryModal__select">
            <option value="">--Please select--</option>
            <option value="島">島</option>
          </select>
        </main>

        <footer class="modal__footer">
          <button class="entryModal__btn">申請</button>
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
    <button class="showBtn showEntry">プロジェクト申請</button>
  </a>
</template>

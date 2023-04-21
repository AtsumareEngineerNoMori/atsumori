<script setup>
import EntryModal from "../modal/EntryModal.vue";
// 1.管理者　2.参加者 3.未参加者
const user = 3;
</script>

<template>
  <div>
    <div v-show="user === 3">
      <EntryModal />
    </div>
    <button v-show="user === 1 || user === 2" class="showBtn showChat">
      チャット
    </button>
  </div>
</template>

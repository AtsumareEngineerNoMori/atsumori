<template>
  <div class="kotei">
    <div class="header">
      <RouterLink to="/top" class="header-logo">
        <img src="../../../public/atsumori.png" />
      </RouterLink>
      <HeaderModal />
    </div>
  </div>
</template>

<script setup lang="ts">
import HeaderModal from "./HeaderModal.vue";
</script>

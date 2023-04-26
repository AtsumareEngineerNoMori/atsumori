<template>
  <ScoutSearchResult :searchTitle="searchTitle" />
</template>

<script setup>
import { ref } from "vue";
import ScoutSearchResult from "../../components/Search/ScoutSearchResult.vue";

const searchTitle = ref("スカウトする難民を探す");
</script>

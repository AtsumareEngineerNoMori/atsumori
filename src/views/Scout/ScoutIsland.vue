<template>
  <ScoutSearchResult :searchTitle="searchTitle" />
</template>

<script setup>
import { ref } from "vue";
import ScoutSearchResult from "../../components/Search/ScoutSearchResult.vue";

const searchTitle = ref("スカウトする島を探す");
</script>

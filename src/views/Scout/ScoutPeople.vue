<template>
  <AllSearchResult :searchTitle="searchTitle" />
</template>

<script setup>
import { ref } from "vue";
import AllSearchResult from "../../components/Search/AllSearchResult.vue";

const searchTitle = ref("スカウトする難民を探す");
</script>

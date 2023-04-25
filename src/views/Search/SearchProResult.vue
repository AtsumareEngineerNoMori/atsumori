<!-- TOPからのプロジェクト検索結果 -->
<template>
    <TopSearchResult :searchTitle="searchTitle" :action="どこから取ってくるかURL" />
  </template>
  
  <script setup>
  import { ref } from "vue";
  import TopSearchResult from "../../components/Search/TopSearch/TopSearchResult.vue";
  
  const searchTitle = ref("プロジェクトの検索結果");
  </script>

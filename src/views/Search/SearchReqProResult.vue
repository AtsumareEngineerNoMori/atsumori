<template>
    TOPからの募集中のプロジェクト検索結果
      <TopSearchResult :searchTitle="searchTitle" :action="どこから取ってくるかURL" />
    </template>
    
    <script setup>
    import { ref } from "vue";
    import TopSearchResult from "../../components/Search/TopSearch/TopSearchResult.vue";
    
    const searchTitle = ref("検索結果");
    </script>

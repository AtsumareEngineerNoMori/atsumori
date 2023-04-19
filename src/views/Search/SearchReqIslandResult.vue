<template>
    TOPからの募集中の島検索結果
      <SwitchSearchResult :searchTitle="searchTitle" :action="どこから取ってくるかURL" />
    </template>
    
    <script setup>
    import { ref } from "vue";
    import SwitchSearchResult from "../../components/Search/SwitchSearchResult.vue";
    
    const searchTitle = ref("検索結果");
    </script>
  
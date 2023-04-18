<template>
    TOPからの募集中の島検索結果
      <SwitchSerchResult :serchTitle="serchTitle" :action="どこから取ってくるかURL" />
    </template>
    
    <script setup>
    import { ref } from "vue";
    import SwitchSerchResult from "../../components/Setch/SwitchSerchResult.vue";
    
    const serchTitle = ref("検索結果");
    </script>
  
<template>
  <AllSerchResult :serchTitle="serchTitle" />
</template>

<script setup>
import { ref } from "vue";
import AllSerchResult from "../../components/Setch/AllSerchResult.vue";

const serchTitle = ref("スカウトする島を探す");
</script>

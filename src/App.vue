<script setup>
import  {RouterLink, RouterView, useRoute} from "vue-router";
import Header from "../src/components/Header/Header.vue";

const route = useRoute();
console.log(route.path);
</script>

<template>
  <template v-if="route.path === '/login' || route.path ==='/userRegister'">
  </template>
  <template v-else>
    <Header />
  </template>
  <RouterView />
</template>

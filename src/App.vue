<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from "vue-router";
import Header from "@/components/Header/Header.vue";
import { computed, ref } from "vue";

const route = useRoute();
console.log(route.path);
</script>

<template>
  <template v-if="route.path === '/login' || route.path === '/userRegister'">
  </template>
  <template v-else>
    <Header />
  </template>
  <RouterView />
</template>

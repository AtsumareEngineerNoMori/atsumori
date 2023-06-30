<script setup lang="ts">
import "../css/main.css";
import { useRouter } from "vue-router";

const router = useRouter();

const topBtn = () => {
  router.push("/top")
}
</script>

<template>
  <div class="notFound">
    <p>お探しのページは存在しません</p>
    <button @click="topBtn">TOPへ戻る</button>
  </div>
</template>

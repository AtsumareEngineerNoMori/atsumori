<template>
  <div class="island_search">
    <!-- <form action="どこから取ってくるかURL" method="get"> -->
        <form @submit.prevent="searchIslands">
      <p>キーワードを入力してください。</p>
      <input
        type="text"
        placeholder="キーワードを入力"
        v-model="keyword"
        class="search_box"
      />
      <!-- <button type="submit">検索</button> -->
      <input type="submit" name="submit" value="検索" class="search_btn" />
    </form>
  </div>
</template>


<script setup>
import { ref } from 'vue';

const keyword = ref('');

const searchIslands = () => {
  // 入力したキーワードを取得
  console.log(keyword.value);
}
</script>

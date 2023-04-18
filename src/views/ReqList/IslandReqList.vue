<!-- 一覧を表示、検索は再検索用 -->
<template>
  <div class="serch">
    <section>
      <h3 class="serch_title">島 募集一覧</h3>
    </section>

    <div class="island_serch">
      <form action="どこから取ってくるかURL" method="get">
        <p>キーワードを入力してください。</p>
        <input
          type="search"
          name="search"
          placeholder="キーワードを入力"
          class="serch_box"
        />
        <input type="submit" name="submit" value="検索" class="serch_btn" />
      </form>
    </div>

    <!-- 結果 -->
    <section class="serch_list">
      <router-link to="/各島の詳細画面">
      <div v-for="island in islands" :key="island.id">
        <img :src="island.icon" alt="island" class="serch_iconImg" />
        <p>{{ island.islandName }}</p>
      </div>
      </router-link>
    </section>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

const islands = ref([]);
//島
const fetchIslands = async () => {
  const response = await fetch(`http://localhost:8000/islands`);
  const data = await response.json();
  islands.value = data;
  console.log(data);
};

onMounted(fetchIslands);
</script>

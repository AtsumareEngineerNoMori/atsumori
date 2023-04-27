<!-- スカウトする島を探す -->
<!-- 初期表示なし、未入力検索はランダムで20件表示 -->
<template>
  <div class="search">
    <section>
      <h3 class="search_title">スカウトする島を探す</h3>
    </section>

    <div class="island_search">
      <form @submit.prevent="searchIslands">
        <input
          type="search"
          name="search"
          placeholder="キーワードを入力"
          class="search_box"
          v-model="keyword"
        />
        <input type="submit" name="submit" value="検索" class="search_btn" />
      </form>
    </div>

    <section v-if="results" class="search_list">
      <div v-if="filteredIslands.length > 0">
        <router-link
          v-for="island in filteredIslands"
          :key="island.id"
          :to="`/mypageforscout/${$route.params.id}/${island.id}`"
        >
          <!-- <router-link
          v-for="(island, index) in filteredIslands.slice(0, 5)"
          :key="island.id"
          :to="`/mypageforscout/${$route.params.id}/${island.id}`"
        > -->
          <img :src="island.icon" alt="island" class="search_iconImg" />
          <div class="search_recinfo">
            <p>{{ island.islandName }}</p>
          </div>
        </router-link>
        <!-- <div v-if="filteredIslands.length > 5" class="search_no">
          <p>最新のおすすめ20件</p>
        </div> -->
      </div>
      <div v-else class="search_no">
        <p>検索結果はありません。</p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

const keyword = ref("");
const islands = ref([]);
const filteredIslands = ref([]);
const results = ref(false);

const fetchIslands = async () => {
  try {
    const responce = await fetch(`http://localhost:8000/Islands`);
    const data = await responce.json();
    islands.value = data;
    console.log("難民", data);
  } catch (error) {
    console.log("難民", error);
  }
};

const searchIslands = () => {
  console.log("検索:", keyword.value);

  const keywordIsland = keyword.value.toLowerCase();
  if (keywordIsland) {
    if (keyword.value.length > 20) {
      alert("20文字以内で入力してください");
      keyword.value = "";
    } else {
      filteredIslands.value = islands.value.filter((island) =>
        island.islandName.toLowerCase().includes(keywordIsland)
      );
      results.value = true;
      keyword.value = "";
    }
  } else {
    filteredIslands.value = islands.value;
    results.value = true;
    keyword.value = "";
  }
};

onMounted(() => {
  fetchIslands();
});
</script>

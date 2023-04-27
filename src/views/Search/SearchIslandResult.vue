<!-- TOPからの島検索結果 -->
<template>
  <div class="search">
    <TopSearchBox />
    <section class="search_list">
      <div v-if="islands.length > 0">
        <div class="search_list">
          <div v-for="island in islands" :key="island.id" class="search_result">
            <router-link :to="'/islands/' + island.id">
              <img :src="island.icon" alt="island" class="search_iconImg" />
              <div class="search_recinfo">
                {{ island.islandName }}
              </div>
            </router-link>
          </div>
        </div>
      </div>
      <div v-else class="search_no">
        <p>検索結果はありません。</p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, watchEffect } from "vue";
import { useRoute } from "vue-router";
import TopSearchBox from "../../components/Search/TopSearch/TopSearchBox.vue";

const islands = ref([]);
const route = useRoute();

// URLから検索キーワードを取得して、fetchでデータ取得
async function fetchData() {
  const searchKeyword = route.query.search;
  const url = `http://localhost:8000/Islands?islandName_like=${searchKeyword}`;
  const response = await fetch(url);
  islands.value = await response.json();
}

onMounted(() => {
  fetchData();
});

// クエリパラメータの変更を監視し、変更があった場合にfetchDataを実行する
watchEffect(() => {
  fetchData();
});
</script>

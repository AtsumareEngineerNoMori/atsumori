<!-- TOPからの島検索結果 -->
<template>
  <div class="search">
    <TopSearchBox />
    <section>
      <div v-if="islands.length > 0">
        <div class="search_list">
          <div v-for="island in islands" :key="island.id" class="search_result">
            <router-link :to="'/islandshow/' + island.id">
              <img :src="island.icon" alt="island" class="search_iconImg" />
              <div class="search_recinfo">
                {{ island.islandName }}
              </div>
            </router-link>
          </div>
        </div>
      </div>
      <div v-else class="search_no">
        <p>検索結果はありません</p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watchEffect, Ref } from "vue";
import { useRoute } from "vue-router";
import TopSearchBox from "@/components/Search/TopSearch/TopSearchBox.vue";

//型
type Island = {
  id: number;
  icon: string;
  islandName: string;
};

const islands: Ref<Island[]> = ref([]);
const route = useRoute();

// URLから検索キーワードを取得して、fetchでデータ取得
const fetchData = async () => {
  const searchKeyword = route.query.search;
  const url = `http://localhost:3000/searchIslands?islandName_like=${searchKeyword}`;

  const response = await fetch(url);
  islands.value = await response.json();

  console.log("検索内容", searchKeyword);
  console.log("レスポンス", response);
}

onMounted(() => {
  fetchData();
});

// クエリパラメータの変更を監視し、変更があった場合にfetchDataを実行する
watchEffect(() => {
  fetchData();
});
</script>

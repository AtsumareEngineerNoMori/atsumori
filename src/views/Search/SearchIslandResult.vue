<!-- TOPからの島検索結果 -->
<template>
  <div class="search">
    <TopSearchBox />
    <section class="search_list">
      <div v-if="islands.length > 0">
        <div class="search_list">
          <div v-for="island in islands" :key="island.id" class="search_result">
            <img :src="island.icon" alt="island" class="search_iconImg" />
            <div class="search_recinfo">
              {{ island.islandName }}
            </div>
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
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import TopSearchBox from "../../components/Search/TopSearch/TopSearchBox.vue"

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
</script>

<!-- <template>
  <div class="search">
    <TopSearchBox />
    <section class="search_list">
      <div v-if="filteredRecruitNewUsers.length === 0" class="search_no">
        検索結果がありません
      </div>
      <router-link
        v-for="recruitNewUser in filteredRecruitNewUsers"
        :key="recruitNewUser.id"
        :to="'/islands/' + recruitNewUser.island.id"
      >
        <img
          :src="recruitNewUser.island.icon"
          alt="island"
          class="search_iconImg"
        />
        <div class="search_recinfo">
          <p>{{ recruitNewUser.island.islandName }}</p>
        </div>
      </router-link>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";

// 検索結果を格納するためのリスト
const searchResults = ref([]);

// ページロード時に検索を実行
onMounted(() => {
  executeSearch();
});

// 検索パラメーターを取得する
const route = useRoute();
const searchParam = computed(() => route.query.search);

// 検索結果を取得する関数
async function executeSearch() {
  try {
    const response = await fetch(`http://localhost:8000/Islands?q=${searchParam.value}`);
    if (!response.ok) {
      console.error("検索取得成功", response.statusText);
      return;
    }
    const data = await response.json();
    // 検索結果の配列内の各オブジェクトに`island`プロパティが存在するか確認する
    const filteredData = data.filter(item => item.hasOwnProperty('island'));
    searchResults.value = filteredData;
  } catch (error) {
    console.error("検索取得失敗", error);
  }
}


//検索結果をフィルタリングするための算出プロパティ
const filteredRecruitNewUsers = computed(() => {
  return searchResults.value.filter((result) =>
    result.island.islandName.includes(searchParam.value)
  );
});
</script> -->

<!-- TOPからの募集中の島検索結果 -->
<!-- <template>
  <TopSearchResult :searchTitle="searchTitle" :action="どこから取ってくるかURL" />
    </template>
    
    <script setup>
    import { ref } from "vue";
    import TopSearchResult from "../../components/Search/TopSearch/TopSearchResult.vue";
    
    const searchTitle = ref("検索結果");
    </script> -->

<!-- <template>
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
import { ref, onMounted } from "vue";
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
</script> -->

<!-- <template>
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
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import TopSearchBox from "../../components/Search/TopSearch/TopSearchBox.vue";

const islands = ref([]);
const route = useRoute();

// URLから検索キーワードを取得して、fetchでデータ取得
async function fetchData() {
  const searchKeyword = route.query.search;
  console.log("キーワード取得確認",searchKeyword)
  const url = `http://localhost:8000/RecruitNewUser?_expand=Islands&Islands.islandName_like=${searchKeyword}`;
  const response = await fetch(url);
  const data = await response.json();
  console.log("fetchレスポンス",data)
  islands.value = data.map((item) => item.Islands);
  console.log("データ格納",islands.value)
}

onMounted(() => {
  fetchData();
});
</script> -->

<template>
  <div class="search">
    <section>
      <h3 class="search_title">島 募集一覧</h3>
    </section>

    <section class="search_list">
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
import { onMounted, ref } from "vue";
const originalRecruitNewUsers = ref([]); //データ配列
const filteredRecruitNewUsers = ref([]); //検索結果に基づくデータの配列

const fetchRecruitNewUsers = async () => {
  try {
    const response = await fetch(`http://localhost:8000/RecruitNewUser`);
    const data = await response.json();
    originalRecruitNewUsers.value = data.map((recruitNewUser) => ({
      ...recruitNewUser,
      island: {},
    }));
    await fetchIslands();
    filterRecruitNewUsers(""); // 初期表示時にすべてのデータを表示するように検索を実行
    console.log("募集中の島", data);
  } catch (error) {
    console.log("募集中の島", error);
  }
};

const fetchIslands = async () => {
  try {
    const response = await fetch(`http://localhost:8000/Islands`);
    const data = await response.json();
    originalRecruitNewUsers.value.forEach((recruitNewUser) => {
      recruitNewUser.island = data.find(
        (island) => island.id === recruitNewUser.islandId
      );
    });
    console.log("島", data);
  } catch (error) {
    console.log("島", error);
  }
};

const filterRecruitNewUsers = (query) => {
  filteredRecruitNewUsers.value = originalRecruitNewUsers.value.filter(
    (recruitNewUser) => {
      const islandName = recruitNewUser.island.islandName.toLowerCase();
      const searchQuery = query.toLowerCase();
      return islandName.includes(searchQuery);
    }
  );
};

onMounted(async () => {
  await Promise.all([fetchRecruitNewUsers(), fetchIslands()]);
  filteredRecruitNewUsers.value = originalRecruitNewUsers.value;
});
</script>

<!-- TOPからの募集中のプロジェクト検索結果 -->
<template>
  <div class="search">
    <TopSearchBox />
    <section class="search_list">
      <div v-if="filteredRecruitNewIslands.length > 0">
        <div class="search_list">
          <div
            v-for="recruitNewIsland in filteredRecruitNewIslands"
            :key="recruitNewIsland.id"
            class="search_result"
          >
            <router-link :to="'/projectshow/' + recruitNewIsland.project.id">
              <img
                :src="recruitNewIsland.project.icon"
                alt="project"
                class="search_iconImg"
              />
              <div class="search_recinfo">
                <p>{{ recruitNewIsland.project.projectName }}</p>
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
import { onMounted, ref, watchEffect } from "vue";
import TopSearchBox from "../../components/Search/TopSearch/TopSearchBox.vue";
import { useRoute } from "vue-router";

const route = useRoute();

const originalRecruitNewIslands = ref([]); //データ配列
const filteredRecruitNewIslands = ref([]); //検索結果に基づくデータの配列

const fetchRecruitNewIslands = async () => {
  try {
    const response = await fetch(`http://localhost:8000/RecruitNewIsland`);
    const data = await response.json();
    originalRecruitNewIslands.value = data.map((recruitNewIsland) => ({
      ...recruitNewIsland,
      project: {},
    }));
    console.log("募集中の島", data);
    await fetchIslands();
    filterRecruitNewIslands(""); // 初期表示時にすべてのデータを表示するように検索を実行
  } catch (error) {
    console.log("募集中の島", error);
  }
};

const fetchIslands = async () => {
  try {
    const response = await fetch(`http://localhost:8000/Projects`);
    const data = await response.json();
    originalRecruitNewIslands.value.forEach((recruitNewIsland) => {
      recruitNewIsland.project = data.find(
        (project) => project.id === recruitNewIsland.projectId
      );
    });
    console.log("島", data);
  } catch (error) {
    console.log("島", error);
  }
};

const filterRecruitNewIslands = (query) => {
  filteredRecruitNewIslands.value = originalRecruitNewIslands.value.filter(
    (recruitNewIsland) => {
      const projectName = recruitNewIsland.project.projectName.toLowerCase();
      const searchQuery = query.toLowerCase();
      return projectName.includes(searchQuery);
    }
  );
};

onMounted(async () => {
  await Promise.all([fetchRecruitNewIslands(), fetchIslands()]);
  const searchKeyword = route.query.search || "";
  filterRecruitNewIslands(searchKeyword);

  watchEffect(() => {
    filterRecruitNewIslands(route.query.search || "");
  });
});
</script>

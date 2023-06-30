<!-- TOPからの募集中のプロジェクト検索結果 -->
<template>
  <div class="search">
    <TopSearchBox />
    <section>
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
        <p>検索結果はありません</p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect, Ref } from "vue";
import TopSearchBox from "@/components/Search/TopSearch/TopSearchBox.vue";
import { useRoute, RouteLocationNormalizedLoaded } from "vue-router";
import axios from "axios";

//型
type RecruitNewIsland = {
  id: number;
  projectId: number;
  project: {
    id: number;
    projectName: string;
    icon: string;
  };
};

const route = useRoute();
// const route: RouteLocationNormalizedLoaded = useRoute();
const originalRecruitNewIslands: Ref<RecruitNewIsland[]> = ref([]); //データ配列
const filteredRecruitNewIslands: Ref<RecruitNewIsland[]> = ref([]); //検索結果に基づくデータの配列

const fetchRecruitNewIslands = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/searchReqProjects`);
    const data = await response.data;
    originalRecruitNewIslands.value = data.map((recruitNewIsland: any) => ({
      ...recruitNewIsland,
      project: recruitNewIsland.projects,
    }));
    console.log("募集中の島", data);
    filterRecruitNewIslands(""); // 初期表示時にすべてのデータを表示するように検索を実行
  } catch (error) {
    console.log("募集中の島", error);
  }
};

const filterRecruitNewIslands = (query: any) => {
  filteredRecruitNewIslands.value = originalRecruitNewIslands.value.filter(
    (recruitNewIsland) => {
      const projectName = recruitNewIsland.project.projectName.toLowerCase();
      const searchQuery = query.toLowerCase();
      return projectName.includes(searchQuery);
    }
  );
};

onMounted(async () => {
  await fetchRecruitNewIslands();
  const searchKeyword = route.query.search || "";
  filterRecruitNewIslands(searchKeyword);

  watchEffect(() => {
    filterRecruitNewIslands(route.query.search || "");
  });
});
</script>

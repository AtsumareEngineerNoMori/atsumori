<!-- TOPからの募集中の島検索結果 -->
<template>
  <div class="search">
    <TopSearchBox />
    <section>
      <div v-if="filteredRecruitNewUsers.length > 0">
        <div class="search_list">
          <div
            v-for="recruitNewUser in filteredRecruitNewUsers"
            :key="recruitNewUser.id"
            class="search_result"
          >
            <router-link :to="'/islandshow/' + recruitNewUser.island.id">
              <img
                :src="recruitNewUser.island.icon"
                alt="island"
                class="search_iconImg"
              />
              <div class="search_recinfo">
                <p>{{ recruitNewUser.island.islandName }}</p>
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
import { useRoute } from "vue-router";
import axios from "axios";

//型
type RecruitNewUser = {
  id: number;
  islandId: number;
  island: {
    id: number;
    islandName: string;
    icon: string;
  };
};

const route = useRoute();
const originalRecruitNewUsers: Ref<RecruitNewUser[]> = ref([]); //データ配列
const filteredRecruitNewUsers: Ref<RecruitNewUser[]> = ref([]); //検索結果に基づくデータの配列

// const fetchRecruitNewUsers = async () => {
//   try {
//     const response = await fetch(`http://localhost:3000/searchReqIslands`);
//     const data = await response.json();
//     originalRecruitNewUsers.value = data.map((recruitNewUser: any) => ({
//       ...recruitNewUser,
//       island: recruitNewUser.islands,
//     }));
//     console.log("募集中の島", data);
//     filterRecruitNewUsers(""); // 初期表示時にすべてのデータを表示するように検索を実行
//   } catch (error) {
//     console.log("募集中の島", error);
//   }
// };

const fetchRecruitNewUsers = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/searchReqIslands`);
    const data = await response.data;
    originalRecruitNewUsers.value = data.map((recruitNewUser: any) => ({
      ...recruitNewUser,
      island: recruitNewUser.islands,
    }));
    console.log("募集中の島", data);
    filterRecruitNewUsers(""); // 初期表示時にすべてのデータを表示するように検索を実行
  } catch (error) {
    console.log("募集中の島", error);
  }
};

const filterRecruitNewUsers = (query: any) => {
  filteredRecruitNewUsers.value = originalRecruitNewUsers.value.filter(
    (recruitNewUser) => {
      const islandName = recruitNewUser.island.islandName.toLowerCase();
      const searchQuery = query.toLowerCase();
      return islandName.includes(searchQuery);
    }
  );
};

onMounted(async () => {
  await fetchRecruitNewUsers();
  const searchKeyword = route.query.search || "";
  filterRecruitNewUsers(searchKeyword);

  watchEffect(() => {
    filterRecruitNewUsers(route.query.search || "");
  });
});
</script>

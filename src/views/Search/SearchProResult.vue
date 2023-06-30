<!-- TOPからのプロジェクト検索結果 -->
<template>
  <div class="search">
    <TopSearchBox />
    <section>
      <div v-if="projects.length > 0">
        <div class="search_list">
          <div
            v-for="project in projects"
            :key="project.id"
            class="search_result"
          >
            <router-link :to="'/projectshow/' + project.id">
              <img :src="project.icon" alt="project" class="search_iconImg" />
              <div class="search_recinfo">
                {{ project.projectName }}
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
import { ref, onMounted, watchEffect,Ref } from "vue";
import { useRoute } from "vue-router";
import TopSearchBox from "@/components/Search/TopSearch/TopSearchBox.vue";
import axios from "axios";

//型
type Project = {
  id: number;
  icon: string;
  projectName: string;
};

const projects: Ref<Project[]> = ref([]);
const route = useRoute();

// URLから検索キーワードを取得して、fetchでデータ取得
const fetchData = async () => {
  const searchKeyword = route?.query?.search;
  const url = `http://localhost:3000/searchProjects?projectName_like=${searchKeyword}`;

  try {
    const response = await axios.get(url);
    projects.value = response.data;
    console.log("検索内容", searchKeyword);
    console.log("レスポンス", response);
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  fetchData();
});

// クエリパラメータの変更を監視し、変更があった場合にfetchDataを実行する
watchEffect(() => {
  fetchData();
});
</script>

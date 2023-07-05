<!-- 一覧を表示、検索は再検索用 -->
<!-- コンポーネント用 -->
<template>
  <div>
    <SearchBox
      :fetchUrlRec="fetchUrlRec"
      :fetchUrlIs="fetchUrlIs"
      title="募集中のプロジェクト検索"
    />
  </div>
</template>

<script setup lang="ts">
import SearchBox from "@/components/Search/ReqList/ProjectReqSerch.vue"
import { ref, onMounted, Ref } from "vue";

//型
type Project = {
  id: number;
  projectIcon: string;
  projectName: string;
};

const fetchUrlRec = "http://localhost:3000/RecruitNewIsland";
const fetchUrlIs = "http://localhost:3000/Projects";
const islandsData:Ref<Project[]> = ref([]);

const fetchData = async () => {
  const response = await fetch(fetchUrlRec);
  islandsData.value = await response.json();
};

onMounted(async () => {
  await fetchData();
});
</script>

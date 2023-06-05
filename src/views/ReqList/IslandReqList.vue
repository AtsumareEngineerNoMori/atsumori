<!-- 一覧を表示、検索は再検索用 -->
<!-- コンポーネント用 -->
<template>
  <div>
    <SearchBox
      :fetchUrlRec="fetchUrlRec"
      :fetchUrlIs="fetchUrlIs"
      title="募集中の島検索"
    />
  </div>
</template>

<script setup lang="ts">
import SearchBox from "@/components/Search/ReqList/IslandReqSerch.vue"
// import * as SearchBox from "@/components/Search/ReqList/IslandReqSerch.vue";
import { ref, onMounted } from "vue";

const fetchUrlRec = "http://localhost:8000/RecruitNewUser";
const fetchUrlIs = "http://localhost:8000/Islands";

const islandsData = ref([]);

const fetchData = async () => {
  const response = await fetch(fetchUrlRec);
  islandsData.value = await response.json();
};

onMounted(async () => {
  await fetchData();
});
</script>

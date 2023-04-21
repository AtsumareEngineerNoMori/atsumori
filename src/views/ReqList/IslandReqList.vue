<!-- 一覧を表示、検索は再検索用 -->

<!-- コンポーネント用 -->
<template>
  <div>
    <SearchBox :fetchUrlRec="fetchUrlRec" :fetchUrlIs="fetchUrlIs" title="島の検索" />
  </div>
</template>

<script setup>
import SearchBox from '../../components/Search/SearchBox.vue';
import { ref, onMounted } from "vue";

const fetchUrlRec = "http://localhost:8000/RecruitNewUser";
const fetchUrlIs =  "http://localhost:8000/islands";

const islandsData = ref([]);

const fetchData = async () => {
  const response = await fetch(fetchUrlRec);
  islandsData.value = await response.json();
};

onMounted(async () => {
  await fetchData();
});
</script>

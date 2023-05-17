<!-- スカウトする島を探す -->
<!-- 初期表示なし、未入力検索はランダムで20件表示 -->
<template>
  <div class="search">
    <section>
      <h3 class="search_title">スカウトする島を探す</h3>
    </section>

    <div class="search_set">
      <form @submit.prevent="searchIslands">
        <input
          type="search"
          name="search"
          placeholder="キーワードを入力"
          class="search_box"
          v-model="keyword"
        />
        <input type="submit" name="submit" value="検索" class="search_btn" />
      </form>
      <p v-if="errorMessage" class="search_errmsg">{{ errorMessage }}</p>
    </div>

    <section v-if="results">
      <div v-if="filteredIslands.length > 0">
        <div v-if="filteredIslands.length > 20" class="search_no">
          <p class="search_recommend">おすすめの島</p>
        </div>

        <div class="search_list">
          <router-link
            v-for="island in randomIslands"
            :key="island.id"
            :to="`/scoutShow/${$route.params.projectId}/${island.id}`"
            class="search_result"
          >
            <div class="search_flex">
              <img :src="island.icon" alt="island" class="search_iconImg" />
              <div class="search_recinfo">
                <p>{{ island.islandName }}</p>
              </div>
            </div>
          </router-link>
        </div>
      </div>
      <div v-else class="search_no">
        <p>検索結果はありません</p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const keyword = ref("");
const islands = ref([]);
const filteredIslands = ref([]);
const joinProjects = ref([]);
const results = ref(false);
const errorMessage = ref("");

const fetchIslands = async () => {
  try {
    const responce = await fetch(`http://localhost:8000/Islands`);
    const data = await responce.json();
    islands.value = data;
    console.log("島", data);
  } catch (error) {
    console.log("島", error);
  }
};

//参加しているプロジェクト
const fetchJoinProjects = async () => {
  try {
    const responce = await fetch(`http://localhost:8000/JoinProjects`);
    const data = await responce.json();
    joinProjects.value = data;
    console.log("参加プロ", data);
  } catch (error) {
    console.log("参加プロ", error);
  }
};

//paramsのprojectId以外のデータを取得
const searchIslands = () => {
  console.log("検索:", keyword.value);

  const keywordIsland = keyword.value
    .toLowerCase()
    .replace(/[ぁ-ん]/g, (match) =>
      String.fromCharCode(match.charCodeAt(0) + 0x60)
    )
    .replace(/[ァ-ン]/g, (match) =>
      String.fromCharCode(match.charCodeAt(0) - 0x60)
    );
  if (keywordIsland) {
    if (keyword.value.length > 20) {
      errorMessage.value = "20文字以内で入力してください";
      // alert("20文字以内で入力してください");
      keyword.value = "";
    } else {
      filteredIslands.value = islands.value
        .filter((island) =>
          island.islandName
            .toLowerCase()
            .replace(/[ぁ-ん]/g, (match) =>
              String.fromCharCode(match.charCodeAt(0) + 0x60)
            )
            .replace(/[ァ-ン]/g, (match) =>
              String.fromCharCode(match.charCodeAt(0) - 0x60)
            )
            .includes(keywordIsland)
        )
        .filter(
          (island) =>
            !joinProjects.value.some(
              (join) =>
                join.islandId === island.id &&
                join.projectId === parseInt(route.params.projectId)
            )
        );
      results.value = true;
      keyword.value = "";
      errorMessage.value = "";
    }
  } else {
    filteredIslands.value = islands.value.filter(
      (island) =>
        !joinProjects.value.some(
          (join) =>
            join.islandId === island.id &&
            join.projectId === parseInt(route.params.projectId)
        )
    );
    results.value = true;
    keyword.value = "";
    errorMessage.value = "";
  }
};

//未入力で検索ボタンを押下した際ランダムで20件選出
const randomIslands = computed(() => {
  if (filteredIslands.value.length <= 20) {
    return filteredIslands.value;
  } else {
    const randomArray = [];
    while (randomArray.length < 20) {
      const random = Math.floor(Math.random() * filteredIslands.value.length);
      if (!randomArray.includes(random)) {
        randomArray.push(random);
      }
    }
    return randomArray.map((index) => filteredIslands.value[index]);
  }
});

onMounted(() => {
  fetchIslands();
  fetchJoinProjects();
});
</script>

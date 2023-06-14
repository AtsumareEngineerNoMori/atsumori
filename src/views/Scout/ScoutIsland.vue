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

<script setup lang="ts">
import { computed, onMounted, ref, Ref } from "vue";
import { useRoute } from "vue-router";

//型
type Island = {
  id: number;
  icon: string;
  islandName: string;
  JoinProjects: JoinProject[];
};
type JoinProject = {
  islandId: number;
  projectId: number;
  id: number;
};

const route = useRoute();
const keyword: Ref<string> = ref("");
const islands: Ref<Island[]> = ref([]);
const filteredIslands: Ref<Island[]> = ref([]);
const results: Ref<boolean> = ref(false);
const errorMessage: Ref<string> = ref("");

const fetchIslands = async () => {
  try {
    const response = await fetch(`http://localhost:3000/scoutIslandsSearch`);
    const data = await response.json();
    islands.value = data;
    console.log("島", data);
  } catch (error) {
    console.log("島", error);
  }
};

//paramsのprojectId以外のデータを取得
const searchIslands = (): void => {
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
      keyword.value = "";
    } else {
      filteredIslands.value = islands.value
        .filter((island) =>
          island.islandName
            .toLowerCase()
            .replace(/[ぁ-ん]/g, (match: string) =>
              String.fromCharCode(match.charCodeAt(0) + 0x60)
            )
            .replace(/[ァ-ン]/g, (match: string) =>
              String.fromCharCode(match.charCodeAt(0) - 0x60)
            )
            .includes(keywordIsland)
        )
        .filter(
          (island) =>
            !island.JoinProjects.some(
              (join) =>
                join.projectId === parseInt(route.params.projectId as string)
            )
        );
      results.value = true;
      keyword.value = "";
      errorMessage.value = "";
    }
  } else {
    filteredIslands.value = islands.value.filter(
      (island) =>
        !island.JoinProjects.some(
          (join) =>
            join.projectId === parseInt(route.params.projectId as string)
        )
    );
    results.value = true;
    keyword.value = "";
    errorMessage.value = "";
  }
  console.log("表示島", filteredIslands.value);
};

//未入力で検索ボタンを押下した際ランダムで20件選出
const randomIslands = computed(() => {
  if (filteredIslands.value.length <= 20) {
    return filteredIslands.value;
  } else {
    const randomArray: number[] = [];
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
});
</script>

<!-- 募集一覧の再検索 -->
<template>
  <div class="search">
    <section>
      <h3 class="search_title">{{ title }}</h3>
    </section>

    <div class="island_search">
      <form @submit.prevent="searchProjects">
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

    <section class="search_list">
      <div v-if="filteredRecruitNewIslands.length === 0" class="search_no">
        <p class="search_col">検索結果がありません</p>
        <input
          type="submit"
          name="submit"
          value="一覧に戻る"
          class="search_btn"
          @click="resetSearch"
        />
      </div>
      <router-link
        v-for="recruitNewIsland in filteredRecruitNewIslands"
        :key="recruitNewIsland.id"
        :to="'/projectshow/' + recruitNewIsland.project.id"
        class="search_result"
      >
        <img
          :src="recruitNewIsland.project.icon"
          alt="project"
          class="search_iconImg"
        />
        <div class="search_recinfo">
          <p>{{ recruitNewIsland.project.projectName }}</p>
        </div>
      </router-link>
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, defineProps, Ref } from "vue";

//型
type RecruitNewUser = {
  id: number;
  projectId: number;
  project: {
    id: number;
    projectName: string;
    icon: string;
  };
};

const props = defineProps({
  fetchUrlRec: {
    type: String,
    default: "",
  },
  fetchUrlIs: {
    type: String,
    default: "",
  },
  title: String,
});

console.log("募集一覧", props.fetchUrlRec);
console.log("登録されたプロ", props.fetchUrlIs);

const originalRecruitNewIslands: Ref<RecruitNewUser[]> = ref([]); //データ配列
const filteredRecruitNewIslands: Ref<RecruitNewUser[]> = ref([]); //検索結果に基づくデータの配列
const keyword: Ref<string> = ref("");
const errorMessage: Ref<string> = ref("");

//募集中のデータ
const fetchRecruitNewIslands = async () => {
  try {
    const response = await fetch(props.fetchUrlRec);

    console.log("レスポンス", response);

    const data = await response.json();
    originalRecruitNewIslands.value = data.map((recruitNewIsland:any) => ({
      ...recruitNewIsland,
      project: {},
    }));
    console.log("募集中", data);
  } catch (error) {
    console.log("募集中", error);
  }
};

//登録されているデータ
const fetchProjects = async () => {
  try {
    const response = await fetch(props.fetchUrlIs);
    const data = await response.json();
    originalRecruitNewIslands.value.forEach((recruitNewIsland) => {
      recruitNewIsland.project = data.find(
        (project:any) => project.id === recruitNewIsland.projectId
      );
    });
    console.log("登録", data);
  } catch (error) {
    console.log("登録", error);
  }
};

//検索して検索結果に合致するデータを返す
const filterRecruitNewIslands = (query:string) => {
  const textChange = query.toLowerCase(); // 入力されたキーワードを小文字に変換
  const hiragana = textChange.replace(/[\u30a1-\u30f6]/g, (match) =>
    String.fromCharCode(match.charCodeAt(0) - 0x60)
  ); // カタカナをひらがなに変換
  return originalRecruitNewIslands.value.filter((recruitNewIsland) =>
    recruitNewIsland.project.projectName
      .toLowerCase()
      .replace(/[\u30a1-\u30f6]/g, (match) =>
        String.fromCharCode(match.charCodeAt(0) - 0x60)
      )
      .includes(hiragana)
  );
};

//一覧に戻るボタン
const resetSearch = () => {
  filteredRecruitNewIslands.value = originalRecruitNewIslands.value;
};

onMounted(async () => {
  await Promise.all([fetchRecruitNewIslands(), fetchProjects()]);
  filteredRecruitNewIslands.value = originalRecruitNewIslands.value;
});

//検索されたものをfilterRecruitNewIslands配列生成後、filteredRecruitNewIslandsにセット
const searchProjects = () => {
  console.log(keyword.value);
  if (keyword.value.length > 20) {
    errorMessage.value = "20文字以内で入力してください";
    // alert("20文字以内で入力してください");
    keyword.value = "";
  } else {
    filteredRecruitNewIslands.value = filterRecruitNewIslands(keyword.value);
    keyword.value = "";
    errorMessage.value = "";
  }
};
</script>

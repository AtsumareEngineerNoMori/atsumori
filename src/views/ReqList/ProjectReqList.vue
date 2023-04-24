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

<script setup>
import SearchBox from "../../components/Search/ReqList/ProjectReqSerch.vue";
import { ref, onMounted } from "vue";

const fetchUrlRec = "http://localhost:8000/RecruitNewIsland";
const fetchUrlIs = "http://localhost:8000/Projects";

const islandsData = ref([]);

const fetchData = async () => {
  const response = await fetch(fetchUrlRec);
  islandsData.value = await response.json();
};

onMounted(async () => {
  await fetchData();
});
</script>


<!-- <template>
  <div class="search">
    <section>
      <h3 class="search_title">プロジェクト 募集一覧</h3>
    </section>

    <div class="island_search">
      <form @submit.prevent="searchProjects">
        <p>キーワードを入力してください。</p>
        <input
          type="search"
          name="search"
          placeholder="キーワードを入力"
          class="search_box"
          v-model="keyword"
        />
        <input type="submit" name="submit" value="検索" class="search_btn" />
      </form>
    </div>

    <section class="search_list">
      <div v-if="filteredRecruitNewIslands.length === 0" class="search_no">
        検索結果がありません
        <input
          type="submit"
          name="submit"
          value="一覧に戻る"
          class="search_btn"
          @click="resetSerch"
        />
      </div>
      <router-link
        v-for="recruitNewIsland in filteredRecruitNewIslands"
        :key="recruitNewIsland.id"
        :to="'/projects/' + recruitNewIsland.project.id"
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

<script setup>
import { onMounted, ref } from "vue";

const originalRecruitNewIslands = ref([]); //データ配列
const filteredRecruitNewIslands = ref([]); //検索結果に基づくデータの配列
const keyword = ref("");

//募集中のデータ
const fetchRecruitNewIslands = async () => {
  try {
    const response = await fetch(`http://localhost:8000/RecruitNewIsland`);
    const data = await response.json();
    originalRecruitNewIslands.value = data.map((recruitNewIsland) => ({
      ...recruitNewIsland,
      project: {},
    }));
    console.log("募集中",data);
  } catch (error) {
    console.log("募集中",error);
  }
};

//登録されているデータ
const fetchProjects = async () => {
  try {
    const response = await fetch(`http://localhost:8000/Projects`);
    const data = await response.json();
    originalRecruitNewIslands.value.forEach((recruitNewIsland) => {
      recruitNewIsland.project = data.find(
        (project) => project.id === recruitNewIsland.projectId
      );
    });
    console.log("登録",data);
  } catch (error) {
    console.log("登録",error);
  }
};

//検索して検索結果に合致するデータを返す
const filterRecruitNewIslands = (query) => {
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
const resetSerch = () => {
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
    alert("20文字以内で入力してください");
    keyword.value = "";
  } else {
    filteredRecruitNewIslands.value = filterRecruitNewIslands(keyword.value);
    keyword.value = "";
  }
};
</script> -->

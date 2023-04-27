<!-- スカウトする島・難民を検索する -->

<!-- 募集一覧の際検索 -->
<template>
  <div class="search">
    <section>
      <h3 class="search_title">{{ title }}</h3>
    </section>

    <div class="island_search">
      <form @submit.prevent="searchIslands">
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
      <div v-if="filteredRecruitNewUsers.length === 0" class="search_no">
        検索結果がありません
        <input
          type="submit"
          name="submit"
          value="一覧に戻る"
          class="search_btn"
          @click="resetSearch"
        />
      </div>
      <router-link
        v-for="recruitNewUser in filteredRecruitNewUsers"
        :key="recruitNewUser.id"
        :to="'/islands/' + recruitNewUser.island.id"
      >
        <img
          :src="recruitNewUser.island.icon"
          alt="island"
          class="search_iconImg"
        />
        <div class="search_recinfo">
          <p>{{ recruitNewUser.island.islandName }}</p>
        </div>
      </router-link>
    </section>
  </div>
</template>

<script setup>
import { onMounted, ref, defineProps } from "vue";

const props = defineProps({
  fetchUrlRec: String,
  fetchUrlIs: String,
  title: String,
});
console.log("募集一覧", props.fetchUrlRec);
console.log("登録された島", props.fetchUrlIs);

const originalRecruitNewUsers = ref([]); //データ配列
const filteredRecruitNewUsers = ref([]); //検索結果に基づくデータの配列
const keyword = ref("");

//募集中のデータ
const fetchRecruitNewUsers = async () => {
  try {
    const response = await fetch(props.fetchUrlRec);

    console.log("レスポンス", response);

    const data = await response.json();
    originalRecruitNewUsers.value = data.map((recruitNewUser) => ({
      ...recruitNewUser,
      island: {},
    }));
    console.log("募集中", data);
  } catch (error) {
    console.log("募集中", error);
  }
};

//登録されているデータ
const fetchIslands = async () => {
  try {
    const response = await fetch(props.fetchUrlIs);
    const data = await response.json();
    originalRecruitNewUsers.value.forEach((recruitNewUser) => {
      recruitNewUser.island = data.find(
        (island) => island.id === recruitNewUser.islandId
      );
    });
    console.log("登録", data);
  } catch (error) {
    console.log("登録", error);
  }
};

//検索して検索結果に合致するデータを返す
const filterRecruitNewUsers = (query) => {
  const textChange = query.toLowerCase(); // 入力されたキーワードを小文字に変換
  const hiragana = textChange.replace(/[\u30a1-\u30f6]/g, (match) =>
    String.fromCharCode(match.charCodeAt(0) - 0x60)
  ); // カタカナをひらがなに変換
  return originalRecruitNewUsers.value.filter((recruitNewUser) =>
    recruitNewUser.island.islandName
      .toLowerCase()
      .replace(/[\u30a1-\u30f6]/g, (match) =>
        String.fromCharCode(match.charCodeAt(0) - 0x60)
      )
      .includes(hiragana)
  );
};

//一覧に戻るボタン
const resetSearch = () => {
  filteredRecruitNewUsers.value = originalRecruitNewUsers.value;
};

onMounted(async () => {
  await Promise.all([fetchRecruitNewUsers(), fetchIslands()]);
  filteredRecruitNewUsers.value = originalRecruitNewUsers.value;
});

//検索されたものをfilterRecruitNewUsers配列生成後、filteredRecruitNewUsersにセット
const searchIslands = () => {
  console.log(keyword.value);
  if (keyword.value.length > 20) {
    alert("20文字以内で入力してください");
  } else {
    filteredRecruitNewUsers.value = filterRecruitNewUsers(keyword.value);
    keyword.value = "";
  }
};
</script>

<!-- <template>
  <div class="search">
    <section>
      <h3 class="search_title">{{ props.searchTitle }}</h3>
    </section>

    <div class="all_search">
      <form action="どこから取ってくるかURL" method="get">
        <p>キーワードを入力してください。</p>
        <input
          type="search"
          name="search"
          placeholder="キーワードを入力"
          class="search_box"
        />
        <input type="submit" name="submit" value="検索" class="search_btn" />
      </form>
    </div>

    <p>検索結果を表示する(初期表示なし)</p>

    <section class="search_list">
      <div v-for="searchImage in searchImages" :key="searchImage">
        <router-link to="島・プロジェクト詳細ページ">
          <img :src="searchImage.icon" alt="island" class="search_iconImg" />
          <p>{{ searchImage.name }}</p>
        </router-link>
      </div>
    </section>
  </div>
</template>

<script setup>
// import "../css/main.css";

const props = defineProps({
  searchTitle: String,
});

const searchImages = [
  {
    icon: "https://1.bp.blogspot.com/-4Ng1gNmOhAM/V2ucIdYoIAI/AAAAAAAA7vs/trvOgTP7V30aBo8mAV-d5xlcTyaQHCq3gCLcB/s800/mujintou_kojima.png",
    name: "名前",
  },
  {
    icon: "https://1.bp.blogspot.com/-4Ng1gNmOhAM/V2ucIdYoIAI/AAAAAAAA7vs/trvOgTP7V30aBo8mAV-d5xlcTyaQHCq3gCLcB/s800/mujintou_kojima.png",
    name: "名前",
  },
  {
    icon: "https://1.bp.blogspot.com/-4Ng1gNmOhAM/V2ucIdYoIAI/AAAAAAAA7vs/trvOgTP7V30aBo8mAV-d5xlcTyaQHCq3gCLcB/s800/mujintou_kojima.png",
    name: "名前",
  },
  {
    icon: "https://1.bp.blogspot.com/-4Ng1gNmOhAM/V2ucIdYoIAI/AAAAAAAA7vs/trvOgTP7V30aBo8mAV-d5xlcTyaQHCq3gCLcB/s800/mujintou_kojima.png",
    name: "名前",
  },
  {
    icon: "https://1.bp.blogspot.com/-4Ng1gNmOhAM/V2ucIdYoIAI/AAAAAAAA7vs/trvOgTP7V30aBo8mAV-d5xlcTyaQHCq3gCLcB/s800/mujintou_kojima.png",
    name: "名前",
  },
  {
    icon: "https://1.bp.blogspot.com/-4Ng1gNmOhAM/V2ucIdYoIAI/AAAAAAAA7vs/trvOgTP7V30aBo8mAV-d5xlcTyaQHCq3gCLcB/s800/mujintou_kojima.png",
    name: "名前",
  },
];
</script> -->

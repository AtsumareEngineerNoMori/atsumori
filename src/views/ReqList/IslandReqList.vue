<!-- 一覧を表示、検索は再検索用 -->

<template>
  <div class="search">
    <section>
      <h3 class="search_title">島 募集一覧</h3>
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
import { onMounted, ref } from "vue";

const originalRecruitNewUsers = ref([]);
const filteredRecruitNewUsers = ref([]);
const keyword = ref("");

const fetchRecruitNewUsers = async () => {
  try {
    const response = await fetch(`http://localhost:8000/RecruitNewUser`);
    const data = await response.json();
    originalRecruitNewUsers.value = data.map((recruitNewUser) => ({
      ...recruitNewUser,
      island: {},
    }));
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

const fetchIslands = async () => {
  try {
    const response = await fetch(`http://localhost:8000/Islands`);
    const data = await response.json();
    originalRecruitNewUsers.value.forEach((recruitNewUser) => {
      recruitNewUser.island = data.find(
        (island) => island.id === recruitNewUser.IslandId
      );
    });
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

const filterRecruitNewUsers = (query) => {
  return originalRecruitNewUsers.value.filter((recruitNewUser) =>
    recruitNewUser.island.islandName.includes(query)
  );
};

onMounted(async () => {
  await Promise.all([fetchRecruitNewUsers(), fetchIslands()]);
  filteredRecruitNewUsers.value = originalRecruitNewUsers.value;
});

const searchIslands = () => {
  console.log(keyword.value);
  if (keyword.value.length > 20) {
    alert("20文字以内で入力してください");
  } else {
    filteredRecruitNewUsers.value = filterRecruitNewUsers(keyword.value);
  }
};
</script>

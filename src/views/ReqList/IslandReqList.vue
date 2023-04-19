<!-- 一覧を表示、検索は再検索用 -->
<template>
  <div class="serch">
    <section>
      <h3 class="serch_title">島 募集一覧</h3>
    </section>

    <div class="island_serch">
      <form action="どこから取ってくるかURL" method="get">
        <p>キーワードを入力してください。</p>
        <input
          type="search"
          name="search"
          placeholder="キーワードを入力"
          class="serch_box"
        />
        <input type="submit" name="submit" value="検索" class="serch_btn" />
      </form>
    </div>

    <section class="serch_list">
      <router-link
        v-for="recruitNewUser in recruitNewUsers"
        :key="recruitNewUser.id"
        :to="'/islands/' + recruitNewUser.island.id"
      >
        <img
          :src="recruitNewUser.island.icon"
          alt="island"
          class="serch_iconImg"
        />
        <div class="serch_recinfo">
          <p>{{ recruitNewUser.island.islandName }}</p>
          <!-- <p>{{ recruitNewUser.recruitPoint }}</p> -->
        </div>
      </router-link>
    </section>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

const recruitNewUsers = ref([]);

const fetchRecruitNewUsers = async () => {
  try {
    const response = await fetch(`http://localhost:8000/RecruitNewUser`);
    const data = await response.json();
    recruitNewUsers.value = data.map((recruitNewUser) => ({
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
    recruitNewUsers.value.forEach((recruitNewUser) => {
      recruitNewUser.island = data.find(
        (island) => island.id === recruitNewUser.IslandId
      );
    });
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

onMounted(async () => {
  await Promise.all([fetchRecruitNewUsers(), fetchIslands()]);
});
</script>

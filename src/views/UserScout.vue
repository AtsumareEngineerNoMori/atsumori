<script setup>
import { ref } from "vue";
import "../css/main.css";
import UserScoutApproveButton from "../components/UserScoutApproveButton.vue";
import Loading from "../components/Loading.vue";

const array = [
  {
    icon: "https://1.bp.blogspot.com/-4Ng1gNmOhAM/V2ucIdYoIAI/AAAAAAAA7vs/trvOgTP7V30aBo8mAV-d5xlcTyaQHCq3gCLcB/s800/mujintou_kojima.png",
    name: "島の名前",
  },
  {
    icon: "https://1.bp.blogspot.com/-4Ng1gNmOhAM/V2ucIdYoIAI/AAAAAAAA7vs/trvOgTP7V30aBo8mAV-d5xlcTyaQHCq3gCLcB/s800/mujintou_kojima.png",
    name: "島の名前",
  },
  {
    icon: "https://1.bp.blogspot.com/-4Ng1gNmOhAM/V2ucIdYoIAI/AAAAAAAA7vs/trvOgTP7V30aBo8mAV-d5xlcTyaQHCq3gCLcB/s800/mujintou_kojima.png",
    name: "島の名前",
  },
  {
    icon: "https://1.bp.blogspot.com/-4Ng1gNmOhAM/V2ucIdYoIAI/AAAAAAAA7vs/trvOgTP7V30aBo8mAV-d5xlcTyaQHCq3gCLcB/s800/mujintou_kojima.png",
    name: "島の名前",
  },
  {
    icon: "https://1.bp.blogspot.com/-4Ng1gNmOhAM/V2ucIdYoIAI/AAAAAAAA7vs/trvOgTP7V30aBo8mAV-d5xlcTyaQHCq3gCLcB/s800/mujintou_kojima.png",
    name: "島の名前",
  },
  {
    icon: "https://1.bp.blogspot.com/-4Ng1gNmOhAM/V2ucIdYoIAI/AAAAAAAA7vs/trvOgTP7V30aBo8mAV-d5xlcTyaQHCq3gCLcB/s800/mujintou_kojima.png",
    name: "島の名前",
  },
];

const scoutList = ref([]);
const islandData = ref([]);
const loading = ref(true);
const getScoutUser = async () => {
  const response = await fetch(
    `http://localhost:8000/userScout/?userId=${3}`
  );
  const data = await response.json();
  scoutList.value = data;
  console.log(data);
};
getScoutUser().then(() => {
  console.log(scoutList.value);
  scoutList.value.map(async (island) => {
    const response = await fetch(
      `http://localhost:8000/Islands/?id=${island.islandId}`
    );
    const data = await response.json();
    islandData.value.push(data);
    loading.value = false;
    console.log(data);
  });
  console.log(islandData.value);
});
</script>

<template>
  <div v-if="loading" class="list">
    <Loading />
  </div>
  <template v-else>
  <div class="list">
    <section>
      <p class="list__title">スカウト承認待ちの島</p>
    </section>
    <section class="list__list">
      <div v-for="island in islandData" :key="island" class="list__item">
        <!-- リンク先変える -->
        <RouterLink v-bind:to="{ name: 'userScout' }">
          <img v-bind:src="island[0].icon" alt="island" class="list__iconImg" />
          <p class="list__name">{{ island[0].islandName }}</p>
        </RouterLink>
        <div class="scout__buttons">
          <!-- <button class="scout__buttons-approveButton">許可</button> -->
          <UserScoutApproveButton :userId="3" :islandId="island[0].id"/>
          <button class="scout__buttons-deleteButton">削除</button>
        </div>
      </div>
    </section>
  </div>
  </template>
</template>

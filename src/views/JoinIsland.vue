<script setup>
import { onMounted, ref } from "vue";
import "../css/main.css";
import Loading from "../components/Loading.vue";
import DeleteMemberButton from "../components/DeleteMemberButton.vue";

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
const joinList = ref([]);
const islandData = ref([]);
const loading = ref(true);
const getJoinIsland = async () => {
  const response = await fetch(
    `http://localhost:8000/joinIslands/?userId=${2}`
  );
  const data = await response.json();
  joinList.value = data;
  console.log(data);
};
getJoinIsland().then(() => {
  console.log(joinList.value);
  joinList.value.map(async (island) => {
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
        <p class="list__title">参加している島</p>
      </section>
      <section class="list__list">
        <div v-for="island in islandData" :key="island" class="list__item">
          <!-- リンク先変える -->
          <RouterLink v-bind:to="{ name: 'joinIsland' }">
            <img
              v-bind:src="island[0].icon"
              alt="island"
              class="list__iconImg"
            />
            <p class="list__name">{{ island[0].islandName }}</p>
          </RouterLink>
          <DeleteMemberButton :userId="2" :islandId="island[0].id"/>
          <!-- <button class="list__button">退会</button> -->
        </div>
      </section>
    </div>
  </template>
</template>

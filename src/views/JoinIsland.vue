<script setup>
import { ref } from "vue";
import "../css/main.css";
import Loading from "../components/Loading.vue";
import DeleteMemberButton from "../components/button/DeleteMemberButton.vue";
import { useRouter } from "vue-router";


const router = useRouter();
const joinList = ref([]);
// islandsから取得したislandIdが等しいデータを保管
const islandData = ref([]);
const loading = ref(true);

// joinIslandsテーブルからログインユーザーのidに等しいデータを取得
const getJoinIsland = async () => {
  const response = await fetch(
    `http://localhost:8000/joinIslands/?userId=${2}`
  );
  const data = await response.json();
  joinList.value = data;
};
getJoinIsland().then(() => {
  console.log(joinList.value);
  // 上で取得した島idと等しいデータをIslandsテーブルから取得
  if (joinList.value.length > 0) {
    joinList.value.map(async (island) => {
      const response = await fetch(
        `http://localhost:8000/Islands/?id=${island.islandId}`
      );
      const data = await response.json();
      islandData.value.push(data);
      loading.value = false;
      console.log(data);
    });
  } else {
    console.log("データがありません");
    loading.value = false;
  }
  console.log(islandData.value);
});

// データがない場合に表示するボタン
const noDataBtn = () => {
  return router.push("/top");
};
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
      <section v-if="islandData.length <= 0">
        <div class="list__noDataTitle">
          <button @click="noDataBtn" class="list__noDataTitle-text">
            島に移住しよう
          </button>
          <img
            src="https://1.bp.blogspot.com/-4Ng1gNmOhAM/V2ucIdYoIAI/AAAAAAAA7vs/trvOgTP7V30aBo8mAV-d5xlcTyaQHCq3gCLcB/s800/mujintou_kojima.png"
            alt="titleLogo"
            class="list__noDataTitle-img"
          />
        </div>
      </section>
      <section class="list__list" v-else>
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
          <DeleteMemberButton :userId="3" :islandId="island[0].id" />
        </div>
      </section>
    </div>
  </template>
</template>

<script setup>
import { onMounted, ref } from "vue";
import "../css/main.css";
import Loading from "../components/Loading.vue";
import DeleteMemberButton from "../components/button/DeleteMemberButton.vue";
import { useRouter } from "vue-router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";

const router = useRouter();

const uid = ref("");
// joinIslandsから取得したuserIdが等しいデータを保管
const joinList = ref([]);
// islandsから取得したislandIdが等しいデータを保管
const islandData = ref([]);
const loading = ref(true);

// ログイン認証
onMounted(() => {
  onAuthStateChanged(auth, (currentUser) => {
    if (!currentUser) {
      console.log("ログアウト状態");
    } else {
      console.log(`ログイン状態 uid:${currentUser.uid}`);
      uid.value = currentUser.uid;
      // joinIslandsテーブルからログインユーザーのidに等しいデータを取得
      // idが一致するか(元と新しいもの)
      // 差分だけ取得できるようにする
      const getJoinIsland = async () => {
        const response = await fetch(
          `http://localhost:8000/joinIslands/?userId=${currentUser.uid}`
        );
        const data = await response.json();
        joinList.value = data;
      };
      getJoinIsland().then(() => {
        console.log(joinList.value);
        // 上で取得したデータのislandIdと等しいデータをIslandsテーブルから取得
        // 上の情報に差分がないならここの処理やらなくていい
        if (joinList.value.length > 0) {
          joinList.value.map(async (island) => {
            const response = await fetch(
              `http://localhost:8000/Islands/?id=${island.islandId}`
            );
            const data = await response.json();
            islandData.value.push(data);
            // データ取得後反転
            loading.value = false;
          });
        } else {
          console.log("データがありません");
          loading.value = false;
        }
        console.log(islandData.value);
      });
    }
  });
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
      <section class="list__sectionTitle">
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
          <RouterLink v-bind:to="{ name: 'islandShow',params: { id: island[0].id } }">
            <img
              v-bind:src="island[0].icon"
              alt="island"
              class="list__iconImg"
            />
            <p class="list__name">{{ island[0].islandName }}</p>
          </RouterLink>
          <DeleteMemberButton :userId="uid" :islandId="island[0].id" />
        </div>
      </section>
    </div>
  </template>
</template>

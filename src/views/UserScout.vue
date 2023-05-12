<script setup>
import { onMounted, ref } from "vue";
import "../css/main.css";
import UserScoutApproveButton from "../components/button/UserScoutApproveButton.vue";
import Loading from "../components/Loading.vue";
import DeleteUserScoutButton from "../components/button/DeleteUserScoutButton.vue";
import { useRouter } from "vue-router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";

const router = useRouter();

const uid = ref("");
// userScoutから取得したuserIdが等しいデータを保管
const scoutList = ref([]);
// islandsから取得したislandIdが等しいデータを保管
const islandData = ref([]);
const loading = ref(true);

onMounted(() => {
  onAuthStateChanged(auth, (currentUser) => {
    if (!currentUser) {
      console.log("ログアウト状態");
    } else {
      console.log(`ログイン状態 uid:${currentUser.uid}`);
      uid.value = currentUser.uid;

      // userScoutからuserIdが一致するデータを取得
      const getScoutUser = async () => {
        const response = await fetch(
          `http://localhost:8000/userScout/?userId=${currentUser.uid}`
        );
        const data = await response.json();
        scoutList.value = data;
      };
      getScoutUser().then(() => {
        console.log(scoutList.value);
        // 上で取得した島idと等しいデータをislandsテーブルから取得
        if (scoutList.value.length > 0) {
          scoutList.value.map(async (island) => {
            const response = await fetch(
              `http://localhost:8000/Islands/?id=${island.islandId}`
            );
            const data = await response.json();
            islandData.value.push(data);
            // データ取得後に反転させる
            loading.value = false;
          });
        } else {
          console.log("データがありません");
          loading.value = false;
        }
      });
    }
  });
});
const noDataBtn = () => {
  return router.push("/mypage");
};
</script>

<template>
  <div v-if="loading" class="list">
    <Loading />
  </div>
  <template v-else>
    <div class="list">
      <section>
        <p class="list__title">承認待ちの島</p>
      </section>
      <section v-if="islandData.length <= 0">
        <div class="list__noDataTitle">
          <button @click="noDataBtn" class="list__noDataTitle-text">
            招待はありません<br /><span class="list__noDataTitle-text-back"
              >前の画面に戻る</span
            >
          </button>
          <img
            src="https://4.bp.blogspot.com/-zu1CzzyU5xQ/Wi4fyOY-XZI/AAAAAAABIqo/FWnBBlidbfweXPjfzcgIzZTRy6TxrUMqQCLcBGAs/s180-c/animal_chara_yagi_yuubin.png"
            alt="titleLogo"
            class="list__noDataTitle-scoutImg"
          />
        </div>
      </section>
      <section class="list__list" v-else>
        <div v-for="island in islandData" :key="island" class="list__item">
          <RouterLink v-bind:to="{ name: 'islandShow', params: { id: island[0].id } }">
            <img
              v-bind:src="island[0].icon"
              alt="island"
              class="list__iconImg"
            />
            <p class="list__name">{{ island[0].islandName }}</p>
          </RouterLink>
          <div class="scout__buttons">
            <UserScoutApproveButton :userId="uid" :islandId="island[0].id" />
            <DeleteUserScoutButton :userId="uid" :islandId="island[0].id" />
          </div>
        </div>
      </section>
    </div>
  </template>
</template>

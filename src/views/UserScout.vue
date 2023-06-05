<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { Ref } from "vue";
import "../css/main.css";
import UserScoutApproveButton from "../components/button/UserScoutApproveButton.vue";
import Loading from "../components/Loading.vue";
import DeleteUserScoutButton from "../components/button/DeleteUserScoutButton.vue";
import { useRouter } from "vue-router";
import type { NavigationFailure } from "vue-router";
import { app } from "../main";

interface UserScout {
  id: number;
  userId: string;
  islandId: number;
}
interface Islands {
  id: number;
  icon: string;
  islandName: string;
  islandDescription: string;
  adminId: string;
  createDate: Date;
}

const router = useRouter();

const uid: Ref<string> = ref("");
// userScoutから取得したuserIdが等しいデータを保管
const scoutList: Ref<UserScout[]> = ref([]);
// islandsから取得したislandIdが等しいデータを保管
const islandData: Ref<Islands[]> = ref([]);
const loading: Ref<boolean> = ref(true);

onMounted(() => {
  const currentUserId: string = app.$cookies.get("myId");
  uid.value = currentUserId;
  if (!uid.value) {
    console.log("ログアウト状態");
  } else {
    console.log(`ログイン状態 uid:${uid.value}`);
    // userScoutからuserIdが一致するデータを取得
    const getScoutUser: () => Promise<void> = async () => {
      const response: Response = await fetch(
        `http://localhost:8000/userScout/?userId=${uid.value}`
      );
      const data: UserScout[] = await response.json();
      scoutList.value = data;
    };
    getScoutUser().then(() => {
      console.log(scoutList.value);
      // 上で取得した島idと等しいデータをislandsテーブルから取得
      if (scoutList.value.length > 0) {
        scoutList.value.map(async (island: UserScout) => {
          const response: Response = await fetch(
            `http://localhost:8000/Islands/?id=${island.islandId}`
          );
          const data: Islands[] = await response.json();
          islandData.value.push(...data);
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
const noDataBtn: () => Promise<void | NavigationFailure | undefined> = () => {
  return router.push("/mypage");
};
</script>

<template>
  <div v-if="loading" class="list">
    <Loading />
  </div>
  <template v-else>
    <div class="list">
      <section class="list__sectionTitle">
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
        <div v-for="island in islandData" :key="island.id" class="list__item">
          <RouterLink
            v-bind:to="{ name: 'islandShow', params: { id: island.id } }"
          >
            <img v-bind:src="island.icon" alt="island" class="list__iconImg" />
            <p class="list__name">{{ island.islandName }}</p>
          </RouterLink>
          <div class="scout__buttons">
            <UserScoutApproveButton :userId="uid" :islandId="island.id" />
            <DeleteUserScoutButton :userId="uid" :islandId="island.id" />
          </div>
        </div>
      </section>
    </div>
  </template>
</template>

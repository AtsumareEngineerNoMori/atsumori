<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { Ref } from "vue";
import "../css/main.css";
import UserScoutApproveButton from "../components/button/UserScoutApproveButton.vue";
import Loading from "../components/Loading.vue";
import DeleteButton from "../components/button/DeleteButton.vue";
import { useRouter } from "vue-router";
import type { NavigationFailure } from "vue-router";
import { app } from "../main";
import { getListData } from "../getData";

interface UserScout {
  id: number;
  userId: string;
  islandId: number;
  islands: {
    id: number;
    icon: string;
    islandName: string;
    islandDescription: string;
    adminId: string;
    createDate: Date;
  };
}

const router = useRouter();

const uid: Ref<string> = ref("");
// userScoutから取得したuserIdが等しいデータを保管
const scoutList: Ref<UserScout[]> = ref([]);
// データ有無
const scoutListLength = ref(false);
// データ取得判定
const loading: Ref<boolean> = ref(true);

onMounted(() => {
  const currentUserId: string = app.$cookies.get("myId");
  uid.value = currentUserId;
  if (!uid.value) {
    console.log("ログアウト状態");
  } else {
    console.log(`ログイン状態 uid:${uid.value}`);
    getListData("myScout", "userId", uid.value).then((res) => {
      console.log(res);
      scoutList.value = res;
      if(scoutList.value.length <= 0){
        scoutListLength.value = false
      }else {
        scoutListLength.value = true;
      }
      loading.value = false;
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
      <section v-if="!scoutListLength">
        <div class="list__noDataTitle">
          <button @click="noDataBtn" class="list__noDataTitle-text" data-testid="noDataBtn">
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
        <div v-for="island in scoutList" :key="island.id" class="list__item">
          <RouterLink
            v-bind:to="{ name: 'islandShow', params: { id: island.islandId } }"
          >
            <img
              v-bind:src="island.islands.icon"
              alt="island"
              class="list__iconImg"
            />
            <p class="list__name">{{ island.islands.islandName }}</p>
          </RouterLink>
          <div class="scout__buttons">
            <UserScoutApproveButton :userId="uid" :islandId="island.islandId" />
            <DeleteButton
              :userId="uid"
              :islandId="island.islandId"
              url="deleteUserScout"
            />
          </div>
        </div>
      </section>
    </div>
  </template>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { Ref } from "vue";
import "../css/main.css";
import Loading from "../components/Loading.vue";
import DeleteButton from "../components/button/DeleteButton.vue";
import { useRouter } from "vue-router";
import { app } from "../main";
import type { NavigationFailure } from "vue-router";
import { getListData } from "../getData";

interface JoinIslands {
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
  admin?: boolean;
}

const router = useRouter();

// ログインユーザーのid保管
const uid: Ref<string> = ref("");
// joinIslandsから取得したuserIdが等しいデータを保管
const joinList: Ref<JoinIslands[]> = ref([]);
// データの有無
const joinListLength: Ref<boolean> = ref(false);
// データ取得判別
const loading: Ref<boolean> = ref(true);

// ログイン認証
onMounted(() => {
  // クッキーからログインユーザーのid取得
  const currentUserId: string = app.$cookies.get("myId");
  uid.value = currentUserId;

  if (!uid.value) {
    console.log("ログアウト状態");
  } else {
    console.log("ログイン状態");
    getListData("myIslands", "userId", uid.value).then((res) => {
      console.log(res);
      if (res.length <= 0) {
        joinListLength.value = false;
      } else {
        joinListLength.value = true;
      }
      res.map((data: JoinIslands) => {
        if (uid.value !== data.islands.adminId) {
          // 管理していない島
          const admin = {
            admin: false,
          };
          // adminと取得したデータをくっつける
          const joinData = Object.assign(data, admin);
          joinList.value.push(joinData);
        } else {
          // 管理している島
          const admin = {
            admin: true,
          };
          const joinData = Object.assign(data, admin);
          joinList.value.push(joinData);
        }
      });
      loading.value = false;
    });
  }
});

// データがない場合に表示するボタン
const noDataBtn: () => Promise<void | NavigationFailure | undefined> = () => {
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
      <section v-if="!joinListLength">
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
        <div v-for="island in joinList" :key="island.id" class="list__item">
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
          <!-- <template v-if="island.islands.adminId !== uid" -->
          <template v-if="!island.admin">
            <DeleteButton
              :userId="uid"
              :islandId="island.islandId"
              :admin="island.admin"
              url="deleteJoinIslands"
            />
          </template>
        </div>
      </section>
    </div>
  </template>
</template>

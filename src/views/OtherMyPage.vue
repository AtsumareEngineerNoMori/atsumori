<script setup lang="ts">

import { onMounted, ref } from "vue";
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import {
  onAuthStateChanged,
  // createUserWithEmailAndPassword,
  // getAuth,
} from "@firebase/auth";
import { storage, auth, db } from "../firebase";


import "../css/main.css";

const User = ref({
  name: "",
  icon: "",
  job: "",
  comment: "",
});

// joinIslandsから取得したuserIdが等しいデータを保管
const joinList = ref<Join[]>([]);
type Join = {
  userId :string;
  islandId:number;
  id:number;
}

// Islandsから取得したislandIdが等しいデータを保管
const islandData = ref<Island[]>([]);
type Island = {
  islandName: string,
  islandDescription: string,
  adminId:string,
  createDate:Date,
  icon:string,
  id:number
}
const route = useRoute();
const router = useRouter();

//パラメーターからuserId取得
const userId = route.params.id;
//パラメーターからislandId取得
const islandId = route.params.islandId;

onMounted(async () => {
  console.log("prame-ta---", userId);
  console.log("prame-ta---", islandId);

    // ログイン状態のチェック
    onAuthStateChanged(auth, async (currentUser) :Promise<void> => {
    if (currentUser) {
      console.log("ログインしています");
      try {
        const response = await fetch(`http://localhost:8000/Users/${userId}`);
        await getIsland();
        if (!response.ok) {
          throw new Error(`HTTPエラーです！！！: ${response.status}`);
        }
        User.value = await response.json();
        console.log("User.valueの中身", User.value.name);
      } catch (err:any) {
        err.value = err;
        console.log("エラー", err.value);
      }
    } else {
      router.push("/login");
    }
  });
});




// joinIslandsテーブルからログインユーザーのidに等しいデータを取得
const getIsland = async () :Promise<void> => {
  const response = await fetch(
    `http://localhost:8000/joinIslands/?userId=${userId}`
  );
  const data = await response.json();
  joinList.value = data;
  console.log("１つめ", joinList.value);
  await getJoinIsland();

};

//ログインユーザーが参加している島IDと同じ島IDの島をIslandsテーブルから取得
const getJoinIsland = async () :Promise<void>=> {
  console.log("２つめ", joinList.value);
  await Promise.all(
    joinList.value.map(async (element:any) => {
      const response = await fetch(
        `http://localhost:8000/Islands/?id=${element.islandId}`
      );
      const data = await response.json();
      islandData.value.push(...data);
    })
  );
  console.log("islandDATA~~~~", islandData.value);
};

//もっと見る
const moreIslands = () => {
  router.push("/joinIsland");
}

</script>

<template>
  <div class="mypage">
    <div class="mypage__container">
      <div class="mypage__column">
        <span
          ><img :src="User.icon" alt="" class="mypage__profileiconImg"
        /></span>
      </div>
      <ul class="mypage__column2">
        <li class="mypage__item">
          <span>なまえ： </span>
          <span>{{ User.name }}</span>
        </li>
        <li class="mypage__item">
          <span>職種：</span>
          <span>{{ User.job }}</span>
        </li>
        <li class="mypage__item">
          <span>ひとこと：</span>
          <p>
            {{ User.comment }}
          </p>
        </li>
      </ul>
    </div>

    <!-- 島一覧 -->
    <div class="mypage__table">
      <div class="mypage__div">島一覧</div>
      <div v-for="island in islandData.slice(0, 4)" :key="island.id" class="mypage__lists">
        <li>
          <div class="mypage__space">
            <router-link :to="`/islandShow/${island.id}`">
              <img
                v-bind:src="island.icon"
                alt="islandig"
                class="mypage__iconImg"
              />
            </router-link>
            <p class="mypage__islandtitle">{{ island.islandName }}</p>
          </div>
        </li>
      </div>
      <div v-if="islandData.length === 0" class="mypage__NOisland">まだ島に入会していません！</div>
      <!-- <button v-if="islandData.length >= 1" class="mypage__morebutton" @click="moreIslands">
        島一覧へ
      </button> -->
    </div>
  </div>
</template>

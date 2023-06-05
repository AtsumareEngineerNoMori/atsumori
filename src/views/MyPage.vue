<script setup lang="ts">
// import { onMounted } from "vue";
// import { promiseImpl } from "ejs";
import { onMounted, ref } from "vue";
import "../css/main.css";
import { auth } from "../../firebase";
import { useRouter } from 'vue-router';

const router = useRouter();


const User = ref({
  name: "",
  icon: "",
  job: "",
  comment: "",
});
const userId = ref(); //firebaseでログインしてる人のIDが入る
// joinIslandsから取得したuserIdが等しいデータを保管
const joinList = ref<Join[]>([]);
type Join = {
  userId :string;
  islandId:number;
  id:number;
}

// islandsから取得したislandIdが等しいデータを保管
const islandData = ref<Island[]>([]);
type Island = {
  islandName: string,
  islandDescription: string,
  adminId:string,
  createDate:Date,
  icon:string,
  id:number
}
onMounted(async () => {

console.log("ユーザーID", userId);
  //onAuthStateChanged★Firebaseの認証状態が変更されたときに呼び出され、現在の認証状態を示すユーザーオブジェクトを返す
  auth.onAuthStateChanged(async (loggedInUser:any) => {
    if (loggedInUser) {
      userId.value = loggedInUser.uid; // ログインしているユーザーのUIDをセット
      await getIsland();
      await getJoinIsland();
      try {
        const response = await fetch(
          `http://localhost:8000/Users/${userId.value}`
        );
        if (!response.ok) {
          throw new Error(`HTTPエラーです！！！: ${response.status}`);
        }
        User.value = await response.json();
        console.log("User.valueの中身", User.value);
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
const getIsland = async () => {
  const response = await fetch(
    `http://localhost:8000/joinIslands/?userId=${userId.value}`
  );
  const data = await response.json();
  joinList.value = data;
  console.log("１つめ", joinList.value);
};

//ログインユーザーが参加している島IDと同じ島IDの島をIslandsテーブルから取得
const getJoinIsland = async () => {
  console.log("２つめ", joinList.value);
  await Promise.all(
    joinList.value.map(async (element) => {
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

const userScout  = () => {
  router.push("/userscout")
}
</script>

<template>
  <div class="mypage">
    <button class="mypage__button" @click="userScout">依頼一覧</button>
    <div class="mypage__container">
      <div class="mypage__column">
        <span
          ><img :src="User.icon" alt="" class="mypage__mypageprofileiconImg"
        /></span>
        <router-link to="/mypageedit"
          ><button class="mypage__editbutton">
            マイページ編集
          </button></router-link
        >
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
            <p  class="mypage__islandtitle">{{ island.islandName }}</p>
          </div>
        </li>
      </div>
      <div v-if="islandData.length === 0" class="mypage__NOisland">まだ島に入会していません！</div>
      <!-- <button v-if="islandData.length >= 4" class="mypage__morebutton" @click="moreIslands"> -->
      <button v-if="islandData.length >= 1" class="mypage__morebutton" @click="moreIslands">
        島一覧へ
      </button>
    </div>
  </div>
</template>

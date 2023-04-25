<script setup>
// import { onMounted } from "vue";
import { promiseImpl } from "ejs";
import { onMounted, ref } from "vue";
import "../css/main.css";


const User = ref({
  name: "",
  icon:"",
  job: "",
  comment: "",
});
const userId = ref(2); //firebaseでログインしてる人のIDが入る
// joinIslandsから取得したuserIdが等しいデータを保管
const joinList = ref([]);
// islandsから取得したislandIdが等しいデータを保管
const islandData = ref([]);


onMounted(async () => {
  try {
    const response = await fetch(`http://localhost:8000/Users/${userId.value}`);
    if (!response.ok) {
      throw new Error(`HTTPエラーです！！！: ${response.status}`);
    }
    User.value = await response.json();
    console.log("User..valueの中身", User.value.name);
  } catch (err) {
    err.value = err;
    console.log("エラー", err.value);
  }
  await getIsland();
  await getJoinIsland();
  await getProject();
  await getJoinProject();

});

// joinIslandsテーブルからログインユーザーのidに等しいデータを取得
const getIsland = async () => {
  const response = await fetch(
    `http://localhost:8000/joinIslands/?userId=${3}`
  );
  const data = await response.json();
  joinList.value = data;
  console.log("１つめ",joinList.value);
};

//ログインユーザーが参加している島IDと同じ島IDの島をIslandsテーブルから取得
const getJoinIsland = async(island) => {
 console.log("２つめ",joinList.value);
await Promise.all(
  joinList.value.map(async (element) => {
    const response = await fetch(
      `http://localhost:8000/Islands/?id=${element.islandId}`
    );
     const data = await response.json();
     islandData.value.push(...data)
    })
    )
    console.log("islandDATA~~~~",islandData.value);
}


// joinIslandsから取得したuserIdが等しいデータを保管
const PJjoinList = ref([]);
// islandsから取得したislandIdが等しいデータを保管
const PJData = ref([]);


// JoinProjectsテーブルからログインユーザーのidに等しいデータを取得
const getProject = async () => {
  const response = await fetch(
    `http://localhost:8000/JoinProjects/?userId=${3}`
  );
  const data = await response.json();
  PJjoinList.value = data;
  console.log("１つめ",PJjoinList.value);
};

//ログインユーザーが参加しているPJIDと同じPJIDの島をJoinProjectsテーブルから取得
const getJoinProject = async(island) => {
 console.log("２つめ",PJjoinList.value);
await Promise.all(
  PJjoinList.value.map(async (element) => {
    const response = await fetch(
      `http://localhost:8000/projects/?id=${element.projectId}`
    );
     const data = await response.json();
     PJData.value.push(...data)
    })
    )
    console.log("PROJECTDATA~~~~",PJData.value);
}


</script>

<template>
  <div class="mypage">
    <button class="mypage__button">スカウトする</button>
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
      <div
        v-for="island in islandData"
        :key="island.id"
        class="mypage__lists"
      >
        <li>
          <div class="mypage__space">
            <router-link to="/">
              <img
                v-bind:src="island.icon"
                alt="islandig"
                class="mypage__iconImg"
              />
            </router-link>
            <p>{{ island.islandName }}</p>
          </div>
        </li>
      </div>
      <button class="mypage__morebutton">もっと見る</button>
    </div>

    <!-- プロジェクト一覧 -->
    <!-- <div class="mypage__table">
      <p>プロジェクト一覧</p>
      <div
        v-for="project in PJData"
        :key="project"
        class="mypage__lists"
      >
        <li>
          <div class="mypage__spase">
            <img
              v-bind:src="project.icon"
              alt="projecticon"
              class="mypage__iconImg"
            />
            <p>{{ project.projectName }}</p>
          </div>
        </li>
      </div>
      <button class="mypage__morebutton">もっと見る</button>
    </div> -->
  </div>
</template>

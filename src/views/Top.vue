<template>
  <div class="top">
    <div class="top-search">
    <TopSearchBox />
  </div>
    <div class="top-new">
      <div class="top-new-set">
        <p class="top-new-set-title">新着島</p>
        <section class="top-new-set-list">
          <div
            v-for="infomation in newIslandArray"
            :key="infomation"
            class="top-new-set-item"
          >
            <router-link
              :to="{ name: 'islandShow', params: { id: infomation.id } }"
            >
              <img
                v-bind:src="infomation.icon"
                alt="ifomation"
                class="top-new-set-img"
              />
              <p class="top-new-set-name">{{ infomation.islandName }}</p>
            </router-link>
          </div>
        </section>
      </div>

      <div class="top-new-set">
        <p class="top-new-set-title">新プロジェクト</p>
        <section class="top-new-set-list">
          <div
            v-for="infomation in newProjectArray"
            :key="infomation"
            class="top-new-set-item"
          >
            <router-link
              class="top-new-set-imgdiv"
              :to="{ name: 'projectShow', params: { id: infomation.id } }"
            >
              <img
                v-bind:src="infomation.icon"
                alt="ifomation"
                class="top-new-set-img"
              />
              <p class="top-new-set-name">{{ infomation.projectName }}</p>
            </router-link>
          </div>
        </section>
      </div>
    </div>

    <div class="top-new">
      <div class="top-new-set">
        <p class="top-new-set-title">新募集島</p>
        <section class="top-new-set-list">
          <div
            v-for="infomation in newRecruitIslandArray"
            :key="infomation"
            class="top-new-set-item"
          >
            <router-link
              :to="{ name: 'islandShow', params: { id: infomation.islandId } }"
            >
              <img
                v-bind:src="infomation.islandIcon"
                alt="ifomation"
                class="top-new-set-img"
              />
              <p class="top-new-set-name">
                {{ infomation.islandName }}
              </p>
            </router-link>
          </div>
        </section>
      </div>

      <div class="top-new-set">
        <p class="top-new-set-title">新募集プロジェクト</p>
        <section class="top-new-set-list">
          <div
            v-for="infomation in newRecruitProjectArray"
            :key="infomation"
            class="top-new-set-item"
          >
            <router-link
              :to="{ name: 'projectShow', params: { id: infomation.projectId } }"
            >
              <img
                v-bind:src="infomation.projectIcon"
                alt="ifomation"
                class="top-new-set-img"
              />
              <p class="top-new-set-name">{{ infomation.projectName }}</p>
            </router-link>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import TopSearchBox from "../components/Search/TopSearch/TopSearchBox.vue";
import {  ref } from "vue";
import { onAuthStateChanged } from "@firebase/auth";
import { auth } from "../../firebase";
import { useRouter } from "vue-router";


const newIslandArray = ref();
const newProjectArray = ref();
const newRecruitIslandArray = ref();
const newRecruitProjectArray = ref();
const router = useRouter();


// ログイン状態の場合の処理
  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
   console.log("ログインしています")
    } else {
      router.push("/login");
    }
  });



// 島
const getIslands = async () => {
  const response = await fetch(
    `http://localhost:8000/Islands/?_limit=6&_sort=createDate&_order=desc`
  );
  const data = await response.json();
  console.log(data);
  newIslandArray.value = data;
};
getIslands();

// プロジェクト
const getProjects = async () => {
  const response = await fetch(
    `http://localhost:8000/Projects/?_limit=6&_sort=createDate&_order=desc`
  );
  const data = await response.json();
  console.log(data);
  newProjectArray.value = data;
};
getProjects();

// 募集人
const getRecruitIslands = async () => {
  const response = await fetch(
    `http://localhost:8000/RecruitNewUser/?_limit=6&_sort=createDate&_order=desc`
  );
  const data = await response.json();
  console.log(data);
  newRecruitIslandArray.value = data;
};
getRecruitIslands();

// 募集島
const getRecruitProjects = async () => {
  const response = await fetch(
    `http://localhost:8000/RecruitNewIsland/?_limit=6&_sort=createDate&_order=desc`
  );
  const data = await response.json();
  console.log(data);
  newRecruitProjectArray.value = data;
};
getRecruitProjects();
</script>

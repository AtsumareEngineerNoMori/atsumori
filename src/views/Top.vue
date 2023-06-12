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
            :key="infomation.id"
            class="top-new-set-item"
          >
            <RouterLink
              :to="{ name: 'islandShow', params: { id: infomation.id } }"
            >
              <img
                :src="infomation.icon"
                alt="ifomation"
                class="top-new-set-img"
              />
              <p class="top-new-set-name">{{ infomation.islandName }}</p>
            </RouterLink>
          </div>
        </section>
      </div>

      <div class="top-new-set">
        <p class="top-new-set-title">新プロジェクト</p>
        <section class="top-new-set-list">
          <div
            v-for="infomation in newProjectArray"
            :key="infomation.id"
            class="top-new-set-item"
          >
            <RouterLink
              class="top-new-set-imgdiv"
              :to="{ name: 'projectShow', params: { id: infomation.id } }"
            >
              <img
                :src="infomation.icon"
                alt="ifomation"
                class="top-new-set-img"
              />
              <p class="top-new-set-name">{{ infomation.projectName }}</p>
            </RouterLink>
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
            :key="infomation.id"
            class="top-new-set-item"
          >
            <RouterLink
              :to="{ name: 'islandShow', params: { id: infomation.id } }"
            >
              <img
                :src="infomation.icon"
                alt="ifomation"
                class="top-new-set-img"
              />
              <p class="top-new-set-name">
                {{ infomation.islandName }}
              </p>
            </RouterLink>
          </div>
        </section>
      </div>

      <div class="top-new-set">
        <p class="top-new-set-title">新募集プロジェクト</p>
        <section class="top-new-set-list">
          <div
            v-for="infomation in newRecruitProjectArray"
            :key="infomation.id"
            class="top-new-set-item"
          >
            <RouterLink
              :to="{
                name: 'projectShow',
                params: { id: infomation.id },
              }"
            >
              <img
                :src="infomation.icon"
                alt="ifomation"
                class="top-new-set-img"
              />
              <p class="top-new-set-name">{{ infomation.projectName }}</p>
            </RouterLink>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TopSearchBox from "../components/Search/TopSearch/TopSearchBox.vue";
import { ref } from "vue";
import { onAuthStateChanged } from "@firebase/auth";
import { auth } from "../firebase";
import { useRouter } from "vue-router";
import type { Ref } from "vue";

const newIslandArray: Ref<{ id: number; icon: string; islandName: string }[]> =
  ref([]);
const newProjectArray: Ref<
  { id: number; icon: string; projectName: string }[]
> = ref([]);
const newRecruitIslandArray: Ref<
  { id: number; icon: string; islandName: string }[]
> = ref([]);
const newRecruitProjectArray: Ref<
  { id: number; icon: string; projectName: string }[]
> = ref([]);
const router = useRouter();

// ログイン状態の場合の処理
onAuthStateChanged(auth, (currentUser) => {
  if (currentUser) {
    console.log("ログインしています");
  } else {
    // router.push("/login");
    // ログインページへの遷移後に戻ることができない
    router.replace("/login");
  }
});

// 島
// const getIslands = async () => {
//   const response = await fetch(
//     `http://localhost:3000/Islands`
//   );
//   const data = await response.json();
//   newIslandArray.value = data;
// };

const getIslands = async () => {
  const response = await fetch(`http://localhost:3000/islands/?_limit=6&_sort=createDate&_order=desc`);
  const data = await response.json();
  newIslandArray.value = data;
};

getIslands();

// プロジェクト
const getProjects = async () => {
  const response = await fetch(
    `http://localhost:3000/projects/?_limit=6&_sort=createDate&_order=desc`
  );
  const data = await response.json();
  newProjectArray.value = data;
};
getProjects();

// 募集人
const getRecruitIslands: () => Promise<void> = async () => {
  const response = await fetch(
    `http://localhost:3000/recruitIslands/?_limit=6&_sort=createDate&_order=desc`
  );
  const data = await response.json();
  console.log(data)
  // const islandsArray = await data.islands;
  const islandsArray = await data.map((item: any) => item.islands);
  console.log(islandsArray)
  newRecruitIslandArray.value = await islandsArray;
};
getRecruitIslands();

// 募集島
const getRecruitProjects: () => Promise<void> = async () => {
  const response = await fetch(
    `http://localhost:3000/recruitProjects/?_limit=6&_sort=createDate&_order=desc`
  );
  const data = await response.json();
  const projectsArray = await data.map((item: any) => item.projects);
  newRecruitProjectArray.value = await  projectsArray;
};
getRecruitProjects();
</script>

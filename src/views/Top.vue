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
            :key="infomation.islandId"
            class="top-new-set-item"
          >
            <RouterLink
              :to="{ name: 'islandShow', params: { id: infomation.islandId } }"
            >
              <img
                :src="infomation.islandIcon"
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
            :key="infomation.projectId"
            class="top-new-set-item"
          >
            <RouterLink
              :to="{
                name: 'projectShow',
                params: { id: infomation.projectId },
              }"
            >
              <img
                :src="infomation.projectIcon"
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
  { islandId: number; islandIcon: string; islandName: string }[]
> = ref([]);
const newRecruitProjectArray: Ref<
  { projectId: number; projectIcon: string; projectName: string }[]
> = ref([]);
const router = useRouter();

// ログイン状態の場合の処理
onAuthStateChanged(auth , (currentUser) => {
  if (currentUser) {
    console.log("ログインしています");
  } else {
    // router.push("/login");
    // ログインページへの遷移後に戻ることができない
    router.replace("/login");
  }
});

// 島
const getIslands = async () => {
  const response = await fetch(
    `http://localhost:8000/Islands/?_limit=6&_sort=createDate&_order=desc`
  );
  const data = await response.json();
  newIslandArray.value = data;
};
getIslands();

// プロジェクト
const getProjects = async () => {
  const response = await fetch(
    `http://localhost:8000/Projects/?_limit=6&_sort=createDate&_order=desc`
  );
  const data = await response.json();
  newProjectArray.value = data;
};
getProjects();

// 募集人
const getRecruitIslands : () => Promise<void>= async () => {
  const response = await fetch(
    `http://localhost:8000/RecruitNewUser/?_limit=6&_sort=createDate&_order=desc`
  );
  const data = await response.json();
  newRecruitIslandArray.value = data;
};
getRecruitIslands();

// 募集島
const getRecruitProjects : () => Promise<void>= async () => {
  const response = await fetch(
    `http://localhost:8000/RecruitNewIsland/?_limit=6&_sort=createDate&_order=desc`
  );
  const data = await response.json();
  newRecruitProjectArray.value = data;
};
getRecruitProjects();
</script>

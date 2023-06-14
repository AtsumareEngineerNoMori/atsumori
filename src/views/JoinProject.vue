<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { Ref } from "vue";
import "../css/main.css";
import Loading from "../components/Loading.vue";
import { useRoute, useRouter } from "vue-router";
import type { NavigationFailure } from "vue-router";
import { getListData } from "../getData";

interface JoinProjects {
  id: number;
  islandId: number;
  projectId: number;
  projects: {
    id: number;
    icon: string;
    projectName: string;
    projectDescription: string;
    adminId: string;
    createDate: Date;
    adminIslandId: number;
  };
}

const router = useRouter();
// 島詳細画面からislandIdを受け取る
const route = useRoute();
const islandId: number = Number(route.params.id);

console.log(islandId);

// joinProjectsから取得したislandIdが等しいデータを保管
const joinList: Ref<JoinProjects[]> = ref([]);
// データ取得判定
const loading: Ref<boolean> = ref(true);

onMounted(() => {
  getListData("ourProjects", "islandId", islandId).then((res) => {
    console.log(res);
    joinList.value = res;
    loading.value = false;
  });
});

// データない時に表示するボタン
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
        <p class="list__title">参加しているプロジェクト</p>
      </section>
      <section v-if="joinList.length <= 0">
        <div class="list__noDataTitle">
          <button @click="noDataBtn" class="list__noDataTitle-text">
            プロジェクトに参加してみよう
          </button>
          <img
            src="https://1.bp.blogspot.com/-SgT2G_vDGwE/XQjt4RWH1TI/AAAAAAABTNc/0He0eUi8-7QAd0RDvxWGA1MBzphu9hvsgCLcBGAs/s800/animal_chara_computer_penguin.png"
            alt="titleLogo"
            class="list__noDataTitle-pjImg"
          />
        </div>
      </section>
      <section class="list__list" v-else>
        <div v-for="project in joinList" :key="project.id" class="list__item">
          <RouterLink
            v-bind:to="{
              name: 'projectShow',
              params: { id: project.projectId },
            }"
          >
            <img
              v-bind:src="project.projects.icon"
              alt="project"
              class="list__iconImg"
            />
            <p class="list__name">{{ project.projects.projectName }}</p>
          </RouterLink>
        </div>
      </section>
    </div>
  </template>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { Ref } from "vue";
import "../css/main.css";
import Loading from "../components/Loading.vue";
import { useRoute, useRouter } from "vue-router";

interface joinProjects {
  id: number;
  islandId: number;
  projectId: number;
}
interface Projects {
  id: number;
  icon: string;
  projectName: string;
  projectDescription: string;
  adminId: string;
  createDate: Date;
}

const router = useRouter();
// 島詳細画面からislandIdを受け取る
const route = useRoute();
const islandId = route.params.id;
console.log(islandId);

// joinProjectsから取得したislandIdが等しいデータを保管
const joinList: Ref<joinProjects[]> = ref([]);
// projectsから取得したprojectIdが等しいデータを保管
const projectData: Ref<Projects[]> = ref([]);
const loading: Ref<boolean> = ref(true);

onMounted(() => {
  const getJoinProject = async () => {
    //joinProjectsからuserIdが等しいデータを取得
    const response = await fetch(
      `http://localhost:8000/joinProjects/?islandId=${islandId}`
    );
    const data = await response.json();
    joinList.value = data;
  };
  getJoinProject().then(() => {
    console.log(joinList.value);
    // 上で取得したprojectIdと等しいデータをprojectsテーブルから取得
    if (joinList.value.length > 0) {
      joinList.value.map(async (pj) => {
        const response = await fetch(
          `http://localhost:8000/Projects/?id=${pj.projectId}`
        );
        const data = await response.json();
        projectData.value.push(...data);
        loading.value = false;
      });
    } else {
      console.log("データがありません");
      loading.value = false;
    }
    console.log(projectData.value);
  });
});

// データない時に表示するボタン
const noDataBtn = () => {
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
      <section v-if="projectData.length <= 0">
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
        <div
          v-for="project in projectData"
          :key="project.id"
          class="list__item"
        >
          <RouterLink
            v-bind:to="{ name: 'projectShow', params: { id: project.id } }"
          >
            <img
              v-bind:src="project.icon"
              alt="project"
              class="list__iconImg"
            />
            <p class="list__name">{{ project.projectName }}</p>
          </RouterLink>
        </div>
      </section>
    </div>
  </template>
</template>

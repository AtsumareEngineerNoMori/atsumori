<script setup>
import { watch, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const projects = ref([]);
const scoutProjects = ref();

const props = defineProps({
  islandId: Number,
  userJudge: Number,
});

watch(props, async () => {
  const islandId = props.islandId;
  const userJudge = props.userJudge;

  if (userJudge === 1) {
    // スカウトされたプロジェクト取得
    scoutProjects.value = await fetch(
      `http://localhost:8000/IslandScout?islandId=${islandId}`
    ).then((res) => res.json());

    //スカウトプロジェクトID取得
    const projectIds = [];
    scoutProjects.value.forEach((scoutProject) => {
      projectIds.push(scoutProject.projectId);
    });

    // IDからプロジェクト情報取得
    projectIds.forEach(async (projectId) => {
      const projectData = await fetch(
        `http://localhost:8000/Projects/${projectId}`
      ).then((res) => res.json());
      projects.value.push(projectData);
    });
  }
});

//　スカウト削除
const deleteScout = (projectId) => {
  scoutProjects.value.forEach((scoutProject) => {
    if (projectId === scoutProject.projectId) {
      fetch(`http://localhost:8000/IslandScout/${scoutProject.id}`, {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
        },
      });

      router.go(0);
    }
  });
};

// スカウト許可
const scout = async (projectId) => {
  await fetch("http://localhost:8000/JoinProjects", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      projectId: projectId,
      islandId: props.islandId,
    }),
  });
  deleteScout(projectId);
  router.go(0);
};
</script>

<template>
  <!-- 管理者のみ表示 -->
  <div v-show="props.userJudge === 1" class="scout">
    <p class="scout__title" v-if="projects.length >= 1">
      スカウトが来ています！
    </p>
    <p class="scout__title" v-if="projects.length === 0">
      スカウトは来ていません
    </p>
    <div v-for="project in projects">
      <div class="scout__content">
        <router-link to="/top">
          <img
            src="../../../public/beach-1824855_1920.jpg"
            class="scout__content__icon"
        /></router-link>
        <span class="scout__content__name">{{ project.projectName }}</span>
      </div>
      <div class="scout__btn">
        <button @click="scout(project.id)" class="scout__btn__yes">許可</button>
        <a @click="deleteScout(project.id)">
          <span class="material-symbols-outlined no"> cancel </span>
        </a>
      </div>
    </div>
  </div>
</template>

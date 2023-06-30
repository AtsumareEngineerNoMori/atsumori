<script setup lang="ts">
import { watch, ref } from "vue";
import { useRouter } from "vue-router";

type IslandScout = {
  id: number;
  islandId: number;
  projectId: number;
  projects: Projects;
};

type Projects = {
  projectName: string;
  projectDescription: string;
  adminId: string;
  createDate: Date;
  icon: string;
  adminIslandId: number;
  id: number;
};

const router = useRouter();
const scoutProjects = ref<IslandScout[]>([]);
const scoutIsShow = ref(false);

const props = defineProps<{
  islandId?: number;
}>();

watch(props, async () => {
  const islandId = props.islandId;

  // スカウトされたプロジェクト取得
  const data = await fetch(
    `http://localhost:3000/islands/${islandId}/islandScout`
  ).then((res) => res.json());

  if (data.projectData.length >= 1) {
    scoutProjects.value = data.projectData;
    scoutIsShow.value = true;
  }
});

//　スカウト削除
const deleteScout = (scoutId: number) => {
  fetch(`http://localhost:3000/islands/${scoutId}/islandScout`, {
    method: "delete",
    headers: {
      "Content-Type": "application/json",
    },
  });
  router.go(0);
};

// スカウト許可
const scout = async (projectId: number, scoutId: number) => {
  await fetch("http://localhost:3000/islands/islandScout", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      projectId: projectId,
      islandId: props.islandId,
      scoutId: scoutId,
    }),
  });
  router.go(0);
};
</script>

<template>
  <!-- 管理者のみ表示 -->
  <div class="scout">
    <p class="scout__title" v-if="scoutIsShow">スカウトが来ています！</p>
    <p class="scout__title" v-else>スカウトは来ていません</p>
    <div v-for="scoutProject in scoutProjects">
      <div class="scout__content">
        <router-link
          :to="{
            name: 'projectShow',
            params: { id: scoutProject.projects.id },
          }"
        >
          <img :src="scoutProject.projects.icon" class="scout__content__icon"
        /></router-link>
        <span class="scout__content__name">
          {{ scoutProject.projects.projectName }}
        </span>
      </div>
      <div class="scout__btn">
        <button
          @click="scout(scoutProject.projects.id, scoutProject.id)"
          class="scout__btn__yes"
        >
          許可
        </button>
        <a @click="deleteScout(scoutProject.id)">
          <span class="material-symbols-outlined no"> cancel </span>
        </a>
      </div>
    </div>
  </div>
</template>

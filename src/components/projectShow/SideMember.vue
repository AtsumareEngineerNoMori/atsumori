<script setup lang="ts">
import { watch, ref } from "vue";
import { useRouter } from "vue-router";
import { Islands, RequestProject } from "@/@types/db";

const router = useRouter();
const requestProjects = ref<RequestProject[]>([]);

const props = defineProps<{
  projectId?: number;
  userJudges?: number;
  islandData: Array<Islands>;
}>();

watch(props, async () => {
  const projectId = props.projectId;

  // 管理者画面の表示
  if (props.userJudges === 1) {
    const data = await fetch(
      `http://localhost:3000/projects/${projectId}/requestProjects`
    ).then((res) => res.json());

    requestProjects.value = data.requestProjects;
  }
});

//　参加申請の却下
const deleteAsign = (requestId: number) => {
  fetch(`http://localhost:3000/projects/${requestId}/requestProjects`, {
    method: "delete",
    headers: {
      "Content-Type": "application/json",
    },
  });
  router.go(0);
};

// 参加申請許可
const Asign = async (islandId: number, requestId: number) => {
  await fetch("http://localhost:3000/projects/requestProjects", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      islandId: islandId,
      projectId: props.projectId,
      requestId: requestId,
    }),
  });
  router.go(0);
};

//遷移
const scoutRouter = () => {
  router.push({
    name: "scoutIsland",
    params: { projectId: props.projectId },
  });
};
</script>

<template>
  <div class="member">
    <p class="member__title">参加している島</p>
    <div v-for="island in props.islandData" class="member__content">
      <router-link :to="{ name: 'islandShow', params: { id: island.id } }">
        <img :src="island.icon" class="member__content__icon" />
      </router-link>
      <span class="member__content__name">{{ island.islandName }}</span>
    </div>

    <!-- 管理者のみ -->
    <div v-show="props.userJudges === 1 && requestProjects.length >= 1">
      <p class="member__title">参加希望の島</p>
      <div v-for="requestProject in requestProjects" class="member__content">
        <router-link
          :to="{
            name: 'islandShow',
            params: { id: requestProject.islands.id },
          }"
        >
          <img
            :src="requestProject.islands.icon"
            class="member__content__icon asign"
          />
        </router-link>
        <span class="member__content__name requestProject">
          {{ requestProject.islands.islandName }}
        </span>
        <div class="member__content__btn">
          <button
            id="asign"
            @click="Asign(requestProject.islands.id, requestProject.id)"
            class="member__content__btn__yes"
          >
            許可
          </button>
          <a id="cacel" @click="deleteAsign(requestProject.id)">
            <span class="material-symbols-outlined no"> cancel </span>
          </a>
        </div>
      </div>
    </div>

    <!-- v-showで切り替え -->
    <div
      v-show="props.userJudges === 1 || props.userJudges === 2"
      class="member__btn"
    >
      <button id="scout" @click="scoutRouter" class="member__btn__scout">
        スカウト
      </button>
    </div>
  </div>
</template>

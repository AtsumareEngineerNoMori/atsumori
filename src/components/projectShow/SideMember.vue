<script setup lang="ts">
import { watch, ref } from "vue";
import { userJudge } from "../../userJudge";
import { useRouter } from "vue-router";
import { PropType } from "vue";

type RequestProject = {
  projectId: number;
  islandId: number;
  id: number;
};

type Islands = {
  islandName: string;
  islandDescription: string;
  adminId: string;
  createDate: Date;
  icon: string;
  id: number;
};

const router = useRouter();

const userJudges = ref();
const islands = ref<Islands[]>([]);
const requestProjects = ref<RequestProject[]>([]);
const requestIslands = ref<Islands[]>([]);

const props = defineProps<{
  projectId?: number;
  adminId?: string;
  userIds: Array<string>;
  islandId: Array<number>;
  myId?: string;
}>();

watch(props, async () => {
  const projectId = props.projectId;
  const adminId = props.adminId;

  // 管理者、参加者、未参加者の判別
  userJudges.value = userJudge(adminId, props.userIds, props.myId);

  // 島idから島データ取得
  for (let islandId of props.islandId) {
    const islandData = await fetch(
      `http://localhost:8000/Islands/${islandId}`
    ).then((res) => res.json());

    // 既に追加されているかの判別
    let isIsland = false;
    for (let i = 0; i < islands.value.length; i++) {
      if (islands.value[i].id === islandData.id) {
        isIsland = true;
        break;
      }
    }
    if (!isIsland) {
      islands.value.push(islandData);
    }
  }

  // 管理者画面の表示
  if (userJudges.value === 1) {
    requestProjects.value = await fetch(
      `http://localhost:8000/RequestProject?projectId=${projectId}`
    ).then((res) => res.json());

    // 参加希望データから島id取得
    const requestIslandIds = requestProjects.value.map(
      (requestProject: RequestProject) => requestProject.islandId
    );

    // 島idから島データ取得
    for (let requestIslandId of requestIslandIds) {
      const requestIslandData = await fetch(
        `http://localhost:8000/Islands/${requestIslandId}`
      ).then((res) => res.json());

      // 既に追加されているかの判別
      let isRequest = false;
      for (let i = 0; i < requestIslands.value.length; i++) {
        if (requestIslands.value[i].id === requestIslandData.id) {
          isRequest = true;
          break;
        }
      }
      if (!isRequest) {
        requestIslands.value.push(requestIslandData);
      }
    }
  }
});

//　参加申請の却下
const deleteAsign = (islandId: number) => {
  requestProjects.value.forEach((requestProject: RequestProject) => {
    if (islandId === requestProject.islandId) {
      fetch(`http://localhost:8000/RequestProject/${requestProject.id}`, {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
        },
      });

      router.go(0);
    }
  });
};

// // 参加申請許可
const Asign = async (islandId: number) => {
  await fetch("http://localhost:8000/JoinProjects", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      islandId: islandId,
      projectId: props.projectId,
    }),
  });
  deleteAsign(islandId);
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
    <div v-for="island in islands" class="member__content">
      <router-link :to="{ name: 'islandShow', params: { id: island.id } }">
        <img :src="island.icon" class="member__content__icon" />
      </router-link>
      <span class="member__content__name">{{ island.islandName }}</span>
    </div>

    <!-- 管理者のみ -->
    <div v-show="userJudges === 1 && requestIslands.length >= 1">
      <p class="member__title">参加希望の島</p>
      <div v-for="requestIsland in requestIslands" class="member__content">
        <router-link
          :to="{ name: 'islandShow', params: { id: requestIsland.id } }"
        >
          <img :src="requestIsland.icon" class="member__content__icon asign" />
        </router-link>
        <span class="member__content__name">
          {{ requestIsland.islandName }}
        </span>
        <div class="member__content__btn">
          <button
            @click="Asign(requestIsland.id)"
            class="member__content__btn__yes"
          >
            許可
          </button>
          <a @click="deleteAsign(requestIsland.id)">
            <span class="material-symbols-outlined no"> cancel </span>
          </a>
        </div>
      </div>
    </div>

    <!-- v-showで切り替え -->
    <div v-show="userJudges === 1 || userJudges === 2" class="member__btn">
      <button @click="scoutRouter" class="member__btn__scout">スカウト</button>
    </div>
  </div>
</template>

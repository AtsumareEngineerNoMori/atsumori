<script setup lang="ts">
import { watch, ref } from "vue";
import { useRouter } from "vue-router";

type userData = {
  id: string;
  icon: string;
  name: string;
  job: string;
  comment: string;
  email: string;
};

type RequestIsland = {
  userId: string;
  islandId: number;
  comment: string;
  id: number;
  users: userData;
};

const router = useRouter();
const requestIslands = ref<RequestIsland[]>([]);

const props = defineProps<{
  islandId?: number;
  userJudges?: number;
  userData: Array<userData>;
}>();

watch(props, async () => {
  const islandId = props.islandId;

  // 管理者画面の表示
  if (props.userJudges === 1) {
    const data = await fetch(
      `http://localhost:3000/islands/${islandId}/requestIslands`
    ).then((res) => res.json());

    requestIslands.value = data.userData;
  }
});

//　参加申請の却下
const deleteAsign = (requestId: number) => {
  fetch(`http://localhost:3000/islands/${requestId}/requestIslands`, {
    method: "delete",
    headers: {
      "Content-Type": "application/json",
    },
  });
  router.go(0);
};

// 参加申請許可
const Asign = async (userId: string, requestId: number) => {
  await fetch("http://localhost:3000/islands/requestIslands", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: userId,
      islandId: props.islandId,
      requestId: requestId,
    }),
  });
  router.go(0);
};

//遷移
const scoutRouter = () => {
  router.push({
    name: "scoutPeople",
    params: { islandId: props.islandId },
  });
};
</script>

<template>
  <div class="member">
    <p class="member__title">メンバー</p>
    <div v-for="user in props.userData" class="member__content">
      <router-link :to="{ name: 'othermypage', params: { id: user.id } }">
        <img :src="user.icon" class="member__content__icon" />
      </router-link>
      <span class="member__content__name"> {{ user.name }} </span>
    </div>

    <!-- 管理者のみ -->
    <div v-show="props.userJudges === 1 && requestIslands.length >= 1">
      <p class="member__title">許可待ちメンバー</p>
      <div v-for="requestIsland in requestIslands" class="member__content">
        <router-link
          :to="{ name: 'othermypage', params: { id: requestIsland.users.id } }"
        >
          <img
            :src="requestIsland.users.icon"
            class="member__content__icon asign"
          />
        </router-link>
        <span class="member__content__name requestIsland">
          {{ requestIsland.users.name }}
        </span>
        <div class="member__content__btn">
          <button
            id="asign"
            @click="Asign(requestIsland.users.id, requestIsland.id)"
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

    <!-- 参加者のみ -->
    <div
      v-show="props.userJudges === 1 || props.userJudges === 2"
      class="member__btn"
    >
      <button @click="scoutRouter" class="member__btn__scout">スカウト</button>
    </div>
  </div>
</template>

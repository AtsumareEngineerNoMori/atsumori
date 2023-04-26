<script setup>
import { watch, ref } from "vue";
import { userJudge } from "../../userJudge";
import { useRouter } from "vue-router";

const router = useRouter();

const userJudges = ref(null);
const users = ref([]);
const requestIslands = ref([]);
const requestUsers = ref([]);

const props = defineProps({
  islandId: Number,
  adminId: Number,
});

watch(props, async () => {
  const islandId = props.islandId;
  const adminId = props.adminId;

  // 参加している島のデータからユーザーid取得
  const joinDatas = await fetch(
    `http://localhost:8000/JoinIslands?islandId=${islandId}`
  ).then((res) => res.json());

  const userIds = joinDatas.map((joinData) => joinData.userId);

  // ユーザーidからユーザーデータ取得
  userIds.forEach(async (userId) => {
    const userData = await fetch(`http://localhost:8000/Users/${userId}`).then(
      (res) => res.json()
    );
    users.value.push(userData);
  });

  // 管理者、参加者、未参加者の判別
  userJudges.value = userJudge(adminId, userIds);

  // ユーザー毎に表示内容の変更
  if (userJudges.value === 1) {
    requestIslands.value = await fetch(
      `http://localhost:8000/RequestIsland?islandId=${islandId}`
    ).then((res) => res.json());

    // リクエストデータからユーザーid取得
    const requestUserIds = [];
    requestIslands.value.forEach((requestIsland) => {
      requestUserIds.push(requestIsland.userId);
    });

    // ユーザーidからユーザーデータ取得
    requestUserIds.forEach(async (requestUserId) => {
      const requestUserData = await fetch(
        `http://localhost:8000/Users/${requestUserId}`
      ).then((res) => res.json());
      requestUsers.value.push(requestUserData);
    });
  }
});

//　参加申請の却下
const deleteAsign = (userId) => {
  requestIslands.value.forEach((requestIsland) => {
    if (userId === requestIsland.userId) {
      fetch(`http://localhost:8000/RequestIsland/${requestIsland.id}`, {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
        },
      });

      router.go(0);
    }
  });
};

// 参加申請許可
const Asign = async (userId) => {
  await fetch("http://localhost:8000/JoinIslands", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: userId,
      islandId: props.islandId,
    }),
  });
  deleteAsign(userId);
  router.go(0);
};
</script>

<template>
  <div class="member">
    <p class="member__title">メンバー</p>
    <div v-for="user in users" class="member__content">
      <router-link :to="{ name: 'othermypage', params: { id: user.id } }">
        <img
          src="../../../public/beach-1824855_1920.jpg"
          class="member__content__icon"
        />
      </router-link>
      <span class="member__content__name">{{ user.name }}</span>
    </div>

    <!-- v-showで切り替え -->
    <div v-show="userJudges === 1">
      <p class="member__title">許可待ちメンバー</p>
      <div v-for="requestUser in requestUsers" class="member__content">
        <router-link
          :to="{ name: 'othermypage', params: { id: requestUser.id } }"
        >
          <img
            src="../../../public/beach-1824855_1920.jpg"
            class="member__content__icon asign"
          />
        </router-link>
        <span class="member__content__name">{{ requestUser.name }}</span>
        <div class="member__content__btn">
          <button
            @click="Asign(requestUser.id)"
            class="member__content__btn__yes"
          >
            許可
          </button>
          <a @click="deleteAsign(requestUser.id)">
            <span class="material-symbols-outlined no"> cancel </span>
          </a>
        </div>
      </div>
    </div>

    <!-- v-showで切り替え -->
    <div v-show="userJudges === 1 || userJudges === 2" class="member__btn">
      <router-link to="/top">
        <button type="button" class="member__btn__scout">スカウト</button>
      </router-link>
    </div>
  </div>
</template>

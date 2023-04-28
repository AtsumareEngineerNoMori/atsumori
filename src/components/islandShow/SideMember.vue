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
  adminId: String,
  myId: String,
});

watch(props, async () => {
  const islandId = props.islandId;
  const adminId = props.adminId;

  // 参加している島のデータからユーザーid取得
  const joinDatas = await fetch(
    `http://localhost:8000/JoinIslands?islandId=${islandId}`
  ).then((res) => res.json());

  const userIds = joinDatas.map((joinData) => joinData.userId);
  // 管理者、参加者、未参加者の判別
  userJudges.value = userJudge(adminId, userIds, props.myId);

  // ユーザーidからユーザーデータ取得
  for (let userId of userIds) {
    const userData = await fetch(`http://localhost:8000/Users/${userId}`).then(
      (res) => res.json()
    );

    // 既に追加されているかの判別
    let user = false;
    for (let i = 0; i < users.value.length; i++) {
      if (users.value[i].id === userData.id) {
        user = true;
        break;
      }
    }
    if (!user) {
      users.value.push(userData);
    }
  }

  // 管理者画面の表示
  if (userJudges.value === 1) {
    requestIslands.value = await fetch(
      `http://localhost:8000/RequestIsland?islandId=${islandId}`
    ).then((res) => res.json());

    // リクエストデータからユーザーid取得
    const requestUserIds = requestIslands.value.map(
      (requestIsland) => requestIsland.userId
    );

    for (let requestUserId of requestUserIds) {
      const requestUserData = await fetch(
        `http://localhost:8000/Users/${requestUserId}`
      ).then((res) => res.json());

      // 既に追加されているかの判別
      let requestUser = false;
      for (let i = 0; i < requestUsers.value.length; i++) {
        if (requestUsers.value[i].id === requestUserData.id) {
          requestUser = true;
          break;
        }
      }
      if (!requestUser) {
        requestUsers.value.push(requestUserData);
      }
    }
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
  }).then((res) => {
    console.log(res);
  });
  deleteAsign(userId);
  router.go(0);
};

//遷移
const userRouter = (userId) => {
  router.push({ name: "othermypage", params: { id: userId } });
};
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
    <div v-for="user in users" class="member__content">
      <a @click="userRouter(user.id)">
        <img :src="user.icon" class="member__content__icon" />
      </a>

      <span class="member__content__name">{{ user.name }}</span>
    </div>

    <!-- v-showで切り替え -->
    <div v-show="userJudges === 1 && requestUsers.length >= 1">
      <p class="member__title">許可待ちメンバー</p>
      <div v-for="requestUser in requestUsers" class="member__content">
        <a @click="userRouter(requestUser.id)">
          <img :src="requestUser.icon" class="member__content__icon asign" />
        </a>

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
      <button @click="scoutRouter" class="member__btn__scout">スカウト</button>
    </div>
  </div>
</template>

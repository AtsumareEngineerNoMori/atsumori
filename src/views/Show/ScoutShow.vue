<script setup>
import AdminModal from "../../components/modal/Island-AdminModal.vue";
import SideMember from "../../components/islandShow/SideMember.vue";
import SideScout from "../../components/islandShow/SideScout.vue";
import ShowBtn from "../../components/islandShow/ShowBtn.vue";
import Loading from "../../components/Loading.vue";
import { adminJudge } from "../../userJudge";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { onAuthStateChanged, getAuth } from "@firebase/auth";

const route = useRoute();
const router = useRouter();

const island = ref([]);
const adminId = ref("X");
const myId = ref();
const adminName = ref();
const Recruits = ref([]);
const RecruitIshow = ref(false);

const loading = ref(false);

onMounted(async () => {
  const id = route.params.islandId;
  const islandData = await fetch(`http://localhost:8000/Islands/${id}`).then(
    (res) => res.json()
  );
  island.value = islandData;

  // ログインID取得
  function auth() {
    return new Promise((resolve) => {
      const auth = getAuth();
      onAuthStateChanged(auth, (currentUser) => {
        myId.value = currentUser?.uid;

        resolve();
      });
    });
  }
  await auth().then(() => {
    loading.value = true;
  });

  const adminData = await fetch(
    `http://localhost:8000/Users/${islandData.adminId}`
  ).then((res) => res.json());
  adminName.value = adminData.name;

  // 募集要項取得
  const Recruit = await fetch(
    `http://localhost:8000/RecruitNewUser?islandId=${id}`
  ).then((res) => res.json());

  if (Recruit.length >= 1) {
    RecruitIshow.value = true;
    Recruits.value = Recruit[0];
  }
});

// スカウト申請
const scoutRouter = async () => {
  const islandId = route.params.islandId;
  const projectId = route.params.projectId;

  await fetch("http://localhost:8000/IslandScout", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      islandId: Number(islandId),
      projectId: Number(projectId),
    }),
  }).then((res) => res.json());
  router.push({ name: "projectShow", params: { id: projectId } });
};

// 遷移
const joinProject = () => {
  router.push({ name: "joinProject", params: { id: island.value.id } });
};
</script>

<template>
  <div v-show="!loading">
    <Loading />
  </div>
  <div v-show="loading" class="detail">
    <div class="detail__user">
      <img
        src="../../../public/beach-1824855_1920.jpg"
        class="detail__user__header"
      />
      <div class="detail__user__icon">
        <img :src="island.icon" class="icon" alt="icon" />
        <div class="detail__user__icon__text">
          <p class="detail__user__icon__text__name">{{ island.islandName }}</p>
          <div>
            <span class="detail__user__icon__text__admin">管理者</span>
            <span>{{ adminName }}</span>
          </div>
          <div class="detail__user__icon__text__asign">
            <a @click="joinProject" class="detail__user__icon__text__asign__a"
              >参加プロジェクト一覧へ
            </a>
          </div>
        </div>
      </div>
    </div>

    <div class="detail__btn">
      <button @click="scoutRouter" class="showBtn showScout">スカウト</button>
    </div>

    <div class="detail__desc">
      <p class="detail__desc__title">島情報</p>
      <div class="detail__desc__text">
        <p class="detail__desc__text__title">【詳細情報】</p>
        {{ island.islandDescription }}

        <div v-show="RecruitIshow">
          <p class="detail__desc__text__title">【募集内容】</p>
          <p>{{ Recruits.recruitTitle }}</p>
          <p>{{ Recruits.recruitPoint }}</p>
        </div>
      </div>
    </div>

    <div class="detail__member">
      <SideMember :islandId="island.id" :adminId="adminId" :myId="myId" />
    </div>
  </div>
</template>

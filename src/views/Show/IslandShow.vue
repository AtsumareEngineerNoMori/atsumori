<script setup lang="ts">
import AdminModal from "@/components/modal/Island-AdminModal.vue";
import SideMember from "@/components/islandShow/SideMember.vue";
import SideScout from "@/components/islandShow/SideScout.vue";
import ShowBtn from "@/components/islandShow/ShowBtn.vue";
import Loading from "@/components/Loading.vue";
import { userJudge } from "../../userJudge";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { app } from "@/main";
import { Islands, RecruitNewUser } from "@/@types/db";

const route = useRoute();
const router = useRouter();

const island = ref<Islands>({
  islandName: "",
  islandDescription: "",
  adminId: "",
  createDate: undefined,
  icon: "",
  id: 0,
});
const Recruits = ref<RecruitNewUser>({
  projectId: 0,
  recruitTitle: "",
  recruitJob: "",
  recruitPoint: "",
  createDate: undefined,
  projectName: "",
  projectIcon: "",
  id: 0,
});
const myId = ref<string>();
const adminId = ref<string>();
const adminName = ref<string>();
const users = ref<any>([]);
const userIds = ref<string[]>([]);
const userJudges = ref<number>();
const RecruitIshow = ref(false);
const loading = ref(false);

onMounted(async () => {
  // ログインID取得
  const userId: string = app.$cookies.get("myId");
  if (userId == null) {
    router.push("/login");
  }
  myId.value = userId;

  const id = route.params.id;
  const data = await fetch(`http://localhost:3000/islands/${id}`).then((res) =>
    res.json()
  );
  const islandData = data.island;

  if (Object.keys(islandData).length === 0) {
    router.push("/top");
  } else {
    island.value = islandData;
    adminId.value = islandData.adminId;
    adminName.value = islandData.adminUsers.name;

    const data = await fetch(
      `http://localhost:3000/islands/${island.value.id}/joinIslands`
    ).then((res) => res.json());
    const joinUsers = data.member;
    users.value = joinUsers.map((joinUser: any) => joinUser.users);
    userIds.value = joinUsers.map((joinUser: any) => joinUser.users.id);

    // 管理者、参加者、未参加者の判別
    userJudges.value = userJudge(
      island.value.adminId,
      userIds.value,
      myId.value
    );

    // 募集要項取得
    const Recruit = islandData.RecruitNewUsers;
    if (Recruit.length >= 1) {
      RecruitIshow.value = true;
      Recruits.value = Recruit[0];
    }
  }
  loading.value = true;
});

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
            <a @click="joinProject" class="detail__user__icon__text__asign__a">
              参加プロジェクト一覧へ
            </a>
          </div>
        </div>
      </div>

      <div v-show="userJudges === 1" class="detail__user__setting">
        <AdminModal
          :recruitIshow="RecruitIshow"
          :recruitId="Recruits.id"
          :islandId="island.id"
        />
      </div>
    </div>

    <div class="detail__btn">
      <ShowBtn :islandId="island.id" :myId="myId" :userJudges="userJudges" />
    </div>

    <div class="detail__underContent">
      <div class="detail__scout">
        <SideScout :islandId="island.id" v-show="userJudges === 1" />
      </div>

      <div class="detail__desc">
        <p class="detail__desc__title">【詳細情報】</p>
        <p>{{ island.islandDescription }}</p>
        <div v-show="RecruitIshow">
          <p class="detail__desc__title">【募集内容】</p>
          <p>{{ Recruits.recruitTitle }}</p>
          <p>{{ Recruits.recruitPoint }}</p>
        </div>
      </div>

      <div class="detail__member">
        <SideMember
          :islandId="island.id"
          :userJudges="userJudges"
          :userData="users"
        />
      </div>
    </div>
  </div>
</template>

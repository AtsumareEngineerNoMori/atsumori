<script setup lang="ts">
import AdminModal from "@/components/modal/Project-AdminModal.vue";
import SideMember from "@/components/projectShow/SideMember.vue";
import ShowBtn from "@/components/projectShow/ShowBtn.vue";
import Loading from "@/components/Loading.vue";
import { userJudge } from "../../userJudge";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { app } from "@/main";
import { Projects, RecruitNewIsland, JoinProjects, Islands } from "@/@types/db";

const route = useRoute();
const router = useRouter();

const project = ref<Projects>({
  projectName: "",
  projectDescription: "",
  adminId: "",
  createDate: undefined,
  icon: "",
  adminIslandId: 0,
  id: 0,
});
const Recruits = ref<RecruitNewIsland>({
  projectId: 0,
  recruitTitle: "",
  recruitJob: "",
  recruitPoint: "",
  createDate: undefined,
  projectName: "",
  projectIcon: "",
  id: 0,
});
const adminName = ref<string>();
const userJudges = ref<number>();
const userIds = ref<string[]>([]);
const islands = ref<Islands[]>([]);
const myId = ref<string>();
const loading = ref(false);
const RecruitIshow = ref(false);

onMounted(async () => {
  // ログインID取得
  const userId = app.$cookies.get("myId");
  if (userId == null) {
    router.push("/login");
  }
  myId.value = userId;

  // プロジェクトデータの取得
  const id = route.params.id;
  const data = await fetch(`http://localhost:3000/projects/${id}`).then((res) =>
    res.json()
  );
  const projectData = data.project;

  if (Object.keys(projectData).length === 0) {
    router.push("/top");
  } else {
    project.value = projectData;
    adminName.value = projectData.adminUsers.name;

    const data = await fetch(
      `http://localhost:3000/projects/${project.value.id}/joinProjects`
    ).then((res) => res.json());

    const joinProjects = data.member;
    const islandIds = joinProjects.map(
      (joinProject: JoinProjects) => joinProject.islands.id
    );
    const island = joinProjects.map(
      (joinProject: JoinProjects) => joinProject.islands
    );
    islands.value = island;

    // 島idからユーザーデータを取得
    for (let islandId of islandIds) {
      const joinIslands = await fetch(
        `http://localhost:3000/islands/${islandId}/joinIslands`
      ).then((res) => res.json());
      for (let joinIsland of joinIslands.member) {
        userIds.value.push(joinIsland.userId);
      }

      // 管理者、参加者、未参加者の判別
      userJudges.value = userJudge(
        project.value.adminId,
        userIds.value,
        myId.value
      );
    }

    // 募集要項取得
    const Recruit = projectData.RecruitNewIslands;
    if (Recruit.length >= 1) {
      RecruitIshow.value = true;
      Recruits.value = Recruit[0];
    }
  }
  loading.value = true;
});
</script>

<template>
  <div v-show="!loading">
    <Loading />
  </div>
  <div v-show="loading" class="projectDetail">
    <div class="projectDetail__user">
      <img
        src="../../../public/projectHeader.jpg"
        class="projectDetail__user__header"
      />
      <div class="projectDetail__user__icon">
        <img :src="project.icon" class="icon" />
        <div class="projectDetail__user__icon__text">
          <p class="projectDetail__user__icon__text__name">
            {{ project.projectName }}
          </p>
          <div>
            <span class="projectDetail__user__icon__text__admin">管理者</span>
            <span>{{ adminName }}</span>
          </div>
        </div>
      </div>

      <div v-show="userJudges === 1" class="detail__user__setting">
        <AdminModal
          :recruitIshow="RecruitIshow"
          :recruitId="Recruits.id"
          :projectId="project.id"
        />
      </div>
    </div>

    <div class="projectDetail__btn">
      <ShowBtn :projectId="project.id" :myId="myId" :userJudges="userJudges" />
    </div>

    <div class="projectDetail__underContent">
      <div class="projectDetail__desc">
        <p class="projectDetail__desc__title">【詳細情報】</p>
        <p>{{ project.projectDescription }}</p>
        <div v-show="RecruitIshow">
          <p class="projectDetail__desc__title">【募集内容】</p>
          <p>{{ Recruits.recruitTitle }}</p>
          <p>{{ Recruits.recruitPoint }}</p>
        </div>
      </div>

      <div class="projectDetail__member">
        <SideMember
          :userJudges="userJudges"
          :projectId="project.id"
          :myId="myId"
          :islandData="islands"
        />
      </div>
    </div>
  </div>
</template>

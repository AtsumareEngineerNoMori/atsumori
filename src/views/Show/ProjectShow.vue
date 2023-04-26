<script setup>
import AdminModal from "../../components/modal/Project-AdminModal.vue";
import SideMember from "../../components/projectShow/SideMember.vue";
import ShowBtn from "../../components/projectShow/ShowBtn.vue";
import { adminJudge } from "../../userJudge";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const project = ref([]);
const adminName = ref();
const userJudges = ref(null);
const userIds = ref([]);
const islandId = ref([]);

onMounted(async () => {
  const id = route.params.id;

  // プロジェクトデータの取得
  const projectDatas = await fetch(`http://localhost:8000/Projects/${id}`).then(
    (res) => res.json()
  );
  project.value = projectDatas;

  // 管理者かの判別
  userJudges.value = adminJudge(project.value.adminId);
  // 管理者の名前取得
  const adminData = await fetch(
    `http://localhost:8000/Users/${project.value.adminId}`
  ).then((res) => res.json());
  adminName.value = adminData.name;

  // 参加者か未参加者かの判別
  const joinProjects = await fetch(
    `http://localhost:8000/JoinProjects?projectId=${id}`
  ).then((res) => res.json());

  const islandIds = joinProjects.map((joinProject) => joinProject.islandId);
  islandId.value = islandIds;

  // 島idから島の参加者データを取得
  for (let islandId of islandIds) {
    const joinIslands = await fetch(
      `http://localhost:8000/JoinIslands?islandId=${islandId}`
    ).then((res) => res.json());
    for (let joinIsland of joinIslands) {
      userIds.value.push(joinIsland.userId);
    }
  }
});
</script>

<template>
  <div class="projectDetail">
    <div class="projectDetail__user">
      <img
        src="../../../public/projectHeader.jpg"
        class="projectDetail__user__header"
      />
      <div class="projectDetail__user__icon">
        <img src="../../../public/atsumare engimeer no Mori.png" class="icon" />
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
        <AdminModal :projectId="project.id" />
      </div>
    </div>

    <div class="projectDetail__btn">
      <ShowBtn :userIds="userIds" :projectId="project.id"/>
    </div>

    <div class="projectDetail__desc">
      <p class="projectDetail__desc__title">プロジェクト情報</p>
      <p class="projectDetail__desc__text">
        {{ project.projectDescription }}
      </p>
    </div>

    <div class="projectDetail__member">
      <SideMember
        :projectId="project.id"
        :adminId="project.adminId"
        :userIds="userIds"
        :islandId="islandId"
      />
    </div>
  </div>
</template>

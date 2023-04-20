<script setup>
import { ref } from "vue";
import "../css/main.css";
import Loading from "../components/Loading.vue";

const joinList = ref([]);
const projectData = ref([]);
const loading = ref(true);
const getJoinProject = async () => {
  const response = await fetch(
    `http://localhost:8000/joinProjects/?userId=${2}`
  );
  const data = await response.json();
  joinList.value = data;
  console.log(data);
};
getJoinProject()
  .then(() => {
    console.log(joinList.value);
    joinList.value.map(async (pj) => {
      const response = await fetch(
        `http://localhost:8000/Projects/?id=${pj.projectId}`
      );
      const data = await response.json();
      projectData.value.push(data);
      loading.value = false;
      console.log(data);
    });
    console.log(projectData.value);
  })
  .then(() => {
    console.log(joinList.value);
    console.log(projectData.value);
  });
</script>

<template>
  <div v-if="loading" class="list">
    <Loading />
  </div>
  <template v-else>
    <div class="list">
      <section>
        <p class="list__title">参加しているプロジェクト</p>
      </section>
      <section class="list__list">
        <!-- リンク先かえる -->
        <div v-for="project in projectData" :key="project" class="list__item">
          <RouterLink v-bind:to="{ name: 'joinProject' }">
            <img
              v-bind:src="project[0].icon"
              alt="project"
              class="list__iconImg"
            />
            <p class="list__name">{{ project[0].projectName }}</p>
          </RouterLink>
        </div>
      </section>
    </div>
  </template>
</template>

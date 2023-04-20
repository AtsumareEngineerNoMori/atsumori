<script setup>
import { ref } from "vue";
import "../css/main.css";
import Loading from "../components/Loading.vue";
import { useRouter } from "vue-router";

const router = useRouter();
// joinProjectsから取得したuserIdが等しいデータを保管
const joinList = ref([]);
// projectsから取得したprojectIdが等しいデータを保管
const projectData = ref([]);
const loading = ref(true);

const getJoinProject = async () => {
  //joinProjectsからuserIdが等しいデータを取得
  const response = await fetch(
    `http://localhost:8000/joinProjects/?userId=${3}`
  );
  const data = await response.json();
  joinList.value = data;
};
getJoinProject().then(() => {
  console.log(joinList.value);
  // 上で取得したprojectIdと等しいデータをprojectsテーブルから取得
  if (joinList.value.length > 0) {
    joinList.value.map(async (pj) => {
      const response = await fetch(
        `http://localhost:8000/Projects/?id=${pj.projectId}`
      );
      const data = await response.json();
      projectData.value.push(data);
      loading.value = false;
    });
  } else {
    console.log("データがありません");
    loading.value = false;
  }
  console.log(projectData.value);
});

// データない時に表示するボタン
const noDataBtn = () => {
  return router.push("/top")
}
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
      <section v-if="projectData.length <= 0">
        <div class="list__noDataTitle">
          <button @click="noDataBtn" class="list__noDataTitle-text">
            島からプロジェクトに参加してみよう
          </button>
          <img
            src="https://1.bp.blogspot.com/-SgT2G_vDGwE/XQjt4RWH1TI/AAAAAAABTNc/0He0eUi8-7QAd0RDvxWGA1MBzphu9hvsgCLcBGAs/s800/animal_chara_computer_penguin.png"
            alt="titleLogo"
            class="list__noDataTitle-pjImg"
          />
        </div>
      </section>
      <section class="list__list" v-else>
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

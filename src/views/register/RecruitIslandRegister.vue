<template>
  <div class="RecruitIslandRegister">
    <div class="RecruitIslandRegister-title">募集登録</div>

    <form @submit.prevent="registerRecruitIsland">
      <div class="RecruitIslandRegister-details">
        <div v-if="loading">
          <p class="RecruitIslandRegister-details-name">
            {{ projects.projectName }}
          </p>
        </div>
        <div v-else>loading</div>
        <div class="RecruitIslandRegister-details-recruitTitleSet">
          <p class="RecruitIslandRegister-details-recruitTitleSet-title">
            募集タイトル
          </p>
          <input
            class="RecruitIslandRegister-details-recruitTitleSet-input"
            type="text"
            v-model="recruitIsland.recruitTitle"
          />
        </div>
        <div class="RecruitIslandRegister-details-jobSet-job">
          <p>募集職種</p>
          <input
            type="radio"
            name="job"
            value="WEB"
            v-model="recruitIsland.recruitJob"
          />
          WEB
          <input
            type="radio"
            name="job"
            value="FR"
            v-model="recruitIsland.recruitJob"
          />
          FR
          <input
            type="radio"
            name="job"
            value="ML"
            v-model="recruitIsland.recruitJob"
          />
          ML
          <input
            type="radio"
            name="job"
            value="CL"
            v-model="recruitIsland.recruitJob"
          />
          CL
          <input
            type="radio"
            name="job"
            value="QA"
            v-model="recruitIsland.recruitJob"
          />
          QA
          <input
            type="radio"
            name="job"
            value="その他"
            v-model="recruitIsland.recruitJob"
          />
          その他
        </div>
        <div>
          <p class="RecruitIslandRegister-details-infomationSet-infomation">
            募集要項
          </p>
          <textarea
            class="RecruitIslandRegister-details-infomationSet-text"
            v-model="recruitIsland.recruitPoint"
          ></textarea>
        </div>
        <div class="RecruitIslandRegister-buttonset">
          <button class="RecruitIslandRegister-button">登録する</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { reactive, ref as vueref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const loading = vueref(false);

const projectId = route.params.id;
// const projectId = 4;

const router = useRouter();
const recruitIsland = reactive({
  recruitTitle: "",
  recruitJob: "",
  recruitPoint: "",
  createDate: "",
});
const projects = vueref();

const getFlight = async () => {
  const response = await fetch(`http://localhost:8000/Projects/4`);
  const data = await response.json();
  console.log(data);
  projects.value = data;
  loading.value = true;
};
getFlight();

const recruitIslandRegisterButton = () => {
  fetch("http://localhost:8000/RecruitNewIsland", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      projectId: projectId,
      recruitTitle: recruitIsland.recruitTitle,
      recruitJob: recruitIsland.recruitJob,
      recruitPoint: recruitIsland.recruitPoint,
      createDate: new Date(),
      projectName: projects.value.projectName,
      projectIcon: projects.value.icon,
    }),
  });
};

const registerRecruitIsland = () => {
  if (recruitIsland.recruitTitle === "") {
    window.alert("募集タイトルを登録してください");
  } else if (recruitIsland.recruitJob === "") {
    window.alert("募集職種を登録してください");
  } else if (recruitIsland.recruitPoint === "") {
    window.alert("募集要項を登録してください");
  } else if (
    recruitIsland.recruitTitle.length < 1 ||
    recruitIsland.recruitTitle.length > 20
  ) {
    window.alert("募集タイトルは1文字以上20文字以下で入力してください");
  } else if (
    recruitIsland.recruitPoint.length < 1 ||
    recruitIsland.recruitPoint.length > 255
  ) {
    window.alert("募集要項は1文字以上255文字以下で入力してください");
  } else {
    recruitIslandRegisterButton();
    router.push("/top");
  }
};
</script>

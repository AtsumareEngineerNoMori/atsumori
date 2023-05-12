<template>
  <div class="RecruitUserRegister">
    <div class="RecruitUserRegister-title">募集登録</div>

    <form @submit.prevent="registerRecruitUser">
      <div class="RecruitUserRegister-details">
        <div v-if="loading">
          <p class="RecruitUserRegister-details-name">
            {{ islands.islandName }}
          </p>
        </div>
        <div v-else>loading</div>
        <div class="RecruitUserRegister-details-recruitTitleSet">
          <p class="RecruitUserRegister-details-recruitTitleSet-title">
            募集タイトル
          </p>
          <input
            class="RecruitUserRegister-details-recruitTitleSet-input"
            type="text"
            v-model="recruitUser.recruitTitle"
            @change="changeTitle"
          />
          <p class="recruitVal" v-if="titleLength">
            募集タイトルを入力してください
          </p>
          <p class="recruitVal" v-if="recruitUser.recruitTitle.length > 20">
            20文字以下で入力してください
          </p>
        </div>
        <div class="RecruitUserRegister-details-jobSet-job">
          <p>募集職種</p>
          <input
            type="radio"
            name="job"
            value="WEB"
            v-model="recruitUser.recruitJob"
            @change="changeSelect"
          />
          WEB
          <input
            type="radio"
            name="job"
            value="FR"
            v-model="recruitUser.recruitJob"
            @change="changeSelect"
          />
          FR
          <input
            type="radio"
            name="job"
            value="ML"
            v-model="recruitUser.recruitJob"
            @change="changeSelect"
          />
          ML
          <input
            type="radio"
            name="job"
            value="CL"
            v-model="recruitUser.recruitJob"
            @change="changeSelect"
          />
          CL
          <input
            type="radio"
            name="job"
            value="QA"
            v-model="recruitUser.recruitJob"
            @change="changeSelect"
          />
          QA
          <input
            type="radio"
            name="job"
            value="その他"
            v-model="recruitUser.recruitJob"
            @change="changeSelect"
          />
          その他
          <p class="recruitVal" v-if="selectLength">
            募集職種を選択してください
          </p>
        </div>
        <div>
          <p class="RecruitUserRegister-details-infomationSet-infomation">
            募集要項
          </p>
          <textarea
            class="RecruitUserRegister-details-infomationSet-text"
            v-model="recruitUser.recruitPoint"
            @change="changeInfomation"
          ></textarea>
          <p class="recruitVal" v-if="infomationLength">
            募集要項を入力してください
          </p>
          <p class="recruitVal" v-if="recruitUser.recruitPoint.length > 255">
            255文字以下で入力してください
          </p>
        </div>
        <div class="RecruitUserRegister-buttonset">
          <button class="RecruitUserRegister-button">登録する</button>
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

const titleLength = vueref(false);
const selectLength = vueref(false);
const infomationLength = vueref(false);

// 前野ページからislandIdを取得
const islandId = route.params.id;

const router = useRouter();
const recruitUser = reactive({
  recruitTitle: "",
  recruitJob: "",
  recruitPoint: "",
  createDate: "",
});
const islands = vueref();

const changeTitle = (e) => {
  titleLength.value = false;
};
const changeSelect = (e) => {
  selectLength.value = false;
};
const changeInfomation = (e) => {
  infomationLength.value = false;
};

const getFlight = async () => {
  const response = await fetch(`http://localhost:8000/Islands/${islandId}`);
  const data = await response.json();
  console.log(data);
  islands.value = data;
  loading.value = true;
  console.log(islands.value.islandName);
  console.log(islands.value.icon);
};
getFlight();

const recruitUserRegisterButton = () => {
  fetch("http://localhost:8000/RecruitNewUser", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      islandId: Number(islandId),
      recruitTitle: recruitUser.recruitTitle,
      recruitJob: recruitUser.recruitJob,
      recruitPoint: recruitUser.recruitPoint,
      createDate: new Date(),
      islandName: islands.value.islandName,
      islandIcon: islands.value.icon,
    }),
  });
};

const registerRecruitUser = () => {
  if (recruitUser.recruitTitle === "") {
    titleLength.value = true;
  }
  if (recruitUser.recruitJob === "") {
    selectLength.value = true;
  }
  if (recruitUser.recruitPoint === "") {
    infomationLength.value = true;
  }

  if (
    recruitUser.recruitTitle === "" ||
    recruitUser.recruitJob === "" ||
    recruitUser.recruitPoint === "" ||
    recruitUser.recruitTitle.length > 20 ||
    recruitUser.recruitPoint.length > 255
  ) {
    window.alert("入力が間違っているところがあります");
    console.log("エラーあります");
  } else {
    recruitUserRegisterButton();
    router.push("/top");
  }
};
</script>

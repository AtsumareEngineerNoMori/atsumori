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
          />
        </div>
        <div class="RecruitUserRegister-details-jobSet-job">
          <p>募集職種</p>
          <input
            type="radio"
            name="job"
            value="WEB"
            v-model="recruitUser.recruitJob"
          />
          WEB
          <input
            type="radio"
            name="job"
            value="FR"
            v-model="recruitUser.recruitJob"
          />
          FR
          <input
            type="radio"
            name="job"
            value="ML"
            v-model="recruitUser.recruitJob"
          />
          ML
          <input
            type="radio"
            name="job"
            value="CL"
            v-model="recruitUser.recruitJob"
          />
          CL
          <input
            type="radio"
            name="job"
            value="QA"
            v-model="recruitUser.recruitJob"
          />
          QA
          <input
            type="radio"
            name="job"
            value="その他"
            v-model="recruitUser.recruitJob"
          />
          その他
        </div>
        <div>
          <p class="RecruitUserRegister-details-infomationSet-infomation">
            募集要項
          </p>
          <textarea
            class="RecruitUserRegister-details-infomationSet-text"
            v-model="recruitUser.recruitPoint"
          ></textarea>
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
const loading = vueref(false);

// 前野ページからislandIdを取得
const islandId = 12;

const router = useRouter();
const recruitUser = reactive({
  recruitTitle: "",
  recruitJob: "",
  recruitPoint: "",
  createDate: "",
});
const islands = vueref();

const getFlight = async () => {
  const response = await fetch(`http://localhost:8000/Islands/12`);
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
      islandId: islandId,
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
    window.alert("募集タイトルを登録してください");
  } else if (recruitUser.recruitJob === "") {
    window.alert("募集職種を登録してください");
  } else if (recruitUser.recruitPoint === "") {
    window.alert("募集要項を登録してください");
  } else if (
    !recruitUser.recruitTitle.match(
      /^([ぁ-んーァ-ンヴーｧ-ﾝﾞﾟ\-0-9a-zA-Z^\x20-\x7e一-龠]{1,20})$/
    )
  ) {
    window.alert("募集タイトルは1文字以上20文字以下で入力してください");
  } else if (
    !recruitUser.recruitPoint.match(
      /^([ぁ-んーァ-ンヴーｧ-ﾝﾞﾟ\-0-9a-zA-Z^\x20-\x7e一-龠]{1,255})$/
    )
  ) {
    window.alert("募集要項は1文字以上255文字以下で入力してください");
  } else {
    recruitUserRegisterButton();
    router.push("/top");
  }
};
</script>

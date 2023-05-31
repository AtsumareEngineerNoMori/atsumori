<template>
  <div class="RecruitIslandRegister">
    <div class="RecruitIslandRegister-title">募集登録</div>
    <form @submit.prevent="recruitRegister">
      <div class="RecruitIslandRegister-details">
        <div v-if="loading">
          <p class="RecruitIslandRegister-details-name">
            <span v-if="props.witch === `Projects`">
              {{ Data.projectName }}
            </span>
            <span v-if="props.witch === `Islands`">
              {{ Data.islandName }}
            </span>
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
            v-model="recruit.recruitTitle"
            @change="changeTitle"
          />
          <p class="recruitVal" v-if="titleLength">
            募集タイトルを入力してください
          </p>
          <p class="recruitVal" v-if="recruit.recruitTitle.length > 20">
            20文字以下で入力してください
          </p>
        </div>
        <div class="RecruitIslandRegister-details-jobSet-job">
          <p>募集職種</p>
          <!-- <JobSelect :vmodel="`recruit.recruitJob`" /> -->
          <input
            type="radio"
            name="job"
            value="WEB"
            v-model="recruit.recruitJob"
            @change="changeSelect"
          />
          WEB
          <input
            type="radio"
            name="job"
            value="FR"
            v-model="recruit.recruitJob"
            @change="changeSelect"
          />
          FR
          <input
            type="radio"
            name="job"
            value="ML"
            v-model="recruit.recruitJob"
            @change="changeSelect"
          />
          ML
          <input
            type="radio"
            name="job"
            value="CL"
            v-model="recruit.recruitJob"
            @change="changeSelect"
          />
          CL
          <input
            type="radio"
            name="job"
            value="QA"
            v-model="recruit.recruitJob"
            @change="changeSelect"
          />
          QA
          <input
            type="radio"
            name="job"
            value="その他"
            v-model="recruit.recruitJob"
            @change="changeSelect"
          />
          その他
          <p class="recruitVal" v-if="selectLength">
            募集職種を選択してください
          </p>
        </div>
        <div>
          <p class="RecruitIslandRegister-details-infomationSet-infomation">
            募集要項
          </p>
          <textarea
            class="RecruitIslandRegister-details-infomationSet-text"
            v-model="recruit.recruitPoint"
            @change="changeInfomation"
          ></textarea>
          <p class="recruitVal" v-if="infomationLength">
            募集要項を入力してください
          </p>
          <p class="recruitVal" v-if="recruit.recruitPoint.length > 255">
            255文字以下で入力してください
          </p>
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
import JobSelect from "./JobSelect.vue";

const props = defineProps({
  kansu: String,
  witch: String,
});

const route = useRoute();
const loading = vueref(false);

const Id = route.params.id;

const router = useRouter();
const recruit = reactive({
  recruitTitle: "",
  recruitJob: "",
  recruitPoint: "",
  createDate: "",
});
const Data = vueref();

const titleLength = vueref(false);
const selectLength = vueref(false);
const infomationLength = vueref(false);

const changeTitle = (e) => {
  titleLength.value = false;
};
const changeSelect = (e) => {
  selectLength.value = false;
};
const changeInfomation = (e) => {
  infomationLength.value = false;
};

// // ログイン状態の場合の処理
// onAuthStateChanged(auth, (currentUser) => {
//     if (currentUser) {
//    console.log("ログインしています")
//     } else {
//       console.log("ログインしてないです")
//       router.push("/login");
//     }
//   });

const getFlight = async () => {
  const response = await fetch(`http://localhost:8000/${props.witch}/${Id}`);
  const data = await response.json();
  console.log(data);
  Data.value = data;
  loading.value = true;
};
getFlight();

const recruitRegister = () => {
  if (recruit.recruitTitle === "") {
    titleLength.value = true;
  }
  if (recruit.recruitJob === "") {
    selectLength.value = true;
  }
  if (recruit.recruitPoint === "") {
    infomationLength.value = true;
  }

  if (
    recruit.recruitTitle === "" ||
    recruit.recruitJob === "" ||
    recruit.recruitPoint === "" ||
    recruit.recruitTitle.length > 20 ||
    recruit.recruitPoint.length > 255
  ) {
    console.log("エラーあります");
  } else {
    // propsでどっちか表示
    if (props.kansu === `island`) {
      fetch("http://localhost:8000/RecruitNewIsland", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectId: Id,
          recruitTitle: recruit.recruitTitle,
          recruitJob: recruit.recruitJob,
          recruitPoint: recruit.recruitPoint,
          createDate: new Date(),
          projectName: Data.value.projectName,
          projectIcon: Data.value.icon,
        }),
      });
    } else if (props.kansu === `user`) {
      fetch("http://localhost:8000/RecruitNewUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          islandId: Id,
          recruitTitle: recruit.recruitTitle,
          recruitJob: recruit.recruitJob,
          recruitPoint: recruit.recruitPoint,
          createDate: new Date(),
          islandName: Data.value.islandName,
          islandIcon: Data.value.icon,
        }),
      });
    }
    router.push("/top");
  }
};
</script>

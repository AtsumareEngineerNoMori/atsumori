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

<script setup lang="ts">
import { RouteLocationNormalizedLoaded, Router, useRouter } from "vue-router";
import { reactive, ref} from "vue";
import { useRoute } from "vue-router";
import type { Ref } from "vue";
import { defineProps } from "vue";

const props = defineProps({
  kansu: String ,
  witch: String,
});

const route : RouteLocationNormalizedLoaded= useRoute();
const router: Router = useRouter();
const loading: Ref<boolean> = ref(false);

const Id: Number | Number[]= route.params.id;

const recruit: {
  recruitTitle: string,
  recruitJob: string,
  recruitPoint: string,
  createDate: Date,
} = reactive({
  recruitTitle: "",
  recruitJob: "",
  recruitPoint: "",
  createDate: new Date(),
});
const Data : Ref<any>= ref();

const titleLength :Ref<boolean>= ref(false);
const selectLength:Ref<boolean> = ref(false);
const infomationLength:Ref<boolean> = ref(false);

const changeTitle = (e:  Event) => {
  titleLength.value = false;
};
const changeSelect = (e:  Event) => {
  selectLength.value = false;
};
const changeInfomation = (e:  Event) => {
  infomationLength.value = false;
};

const getFlight : () => Promise<void>= async () => {
  const response : Response= await fetch(`http://localhost:8000/${props.witch}/${Id}`);
  const data = await response.json();
  Data.value = data;
  loading.value = true;
};
getFlight();

const recruitRegister: () => void = () => {
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
    projectId: Number(Id),
    recruitTitle: recruit.recruitTitle,
    recruitJob: recruit.recruitJob,
    recruitPoint: recruit.recruitPoint,
    createDate: new Date(),
    projectName: Data.value.projectName,
    projectIcon: Data.value.icon,
  }),
})
  .then(response => {
    if (response.ok) {
      // データの送信が成功した場合の処理
      router.push("/top");
    } else {
      // データの送信が失敗した場合の処理
      console.log("データの送信に失敗しました");
    }
  })
  .catch(error => {
    // エラーハンドリング
    console.log("エラーが発生しました", error);
  });
    } else if (props.kansu === `user`) {
      fetch("http://localhost:8000/RecruitNewUser", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    islandId: Number(Id),
    recruitTitle: recruit.recruitTitle,
    recruitJob: recruit.recruitJob,
    recruitPoint: recruit.recruitPoint,
    createDate: new Date(),
    islandName: Data.value.islandName,
    islandIcon: Data.value.icon,
  }),
})
  .then(response => {
    if (response.ok) {
      // データの送信が成功した場合の処理
      router.push("/top");
    } else {
      // データの送信が失敗した場合の処理
      console.log("データの送信に失敗しました");
    }
  })
  .catch(error => {
    // エラーハンドリング
    console.log("エラーが発生しました", error);
  });
  
  }
}
};
</script>

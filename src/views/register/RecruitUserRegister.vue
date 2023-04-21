<template>
  <div class="RecruitUserRegister">
    <div class="RecruitUserRegister-title">募集登録</div>

    <div class="RecruitUserRegister-details">
      <div  v-if="loading">
        <p class="RecruitUserRegister-details-name">{{ islands.islandName }}</p>
      </div>
      <div v-else>loading</div>
      <div class="RecruitUserRegister-details-recruitTitleSet">
        <p class="RecruitUserRegister-details-recruitTitleSet-title"
        >募集タイトル</p>
        <input class="RecruitUserRegister-details-recruitTitleSet-input"
        type="text" v-model="recruitUser.recruitTitle"/>
      </div>
      <div class="RecruitUserRegister-details-jobSet-job">
        <p>募集職種</p>
        <input type="radio" name="job" value="WEB" v-model="recruitUser.recruitJob"/> WEB
        <input type="radio" name="job" value="FR" v-model="recruitUser.recruitJob"/> FR
        <input type="radio" name="job" value="ML" v-model="recruitUser.recruitJob"/> ML
        <input type="radio" name="job" value="CL" v-model="recruitUser.recruitJob"/> CL
        <input type="radio" name="job" value="QA" v-model="recruitUser.recruitJob"/> QA
        <input type="radio" name="job" value="その他" v-model="recruitUser.recruitJob"/> その他
      </div>
      <div>
        <p class="RecruitUserRegister-details-infomationSet-infomation">募集要項</p>
        <textarea class="RecruitUserRegister-details-infomationSet-text" v-model="recruitUser.recruitPoint"
        ></textarea>
      </div>
      <div class="RecruitUserRegister-buttonset">
        <RouterLink to="/top">
        <button @click="recruitUserRegisterButton" class="RecruitUserRegister-button">登録する</button>
        </RouterLink>
      </div>
    </div>
  </div>


</template>

<script setup>
import { reactive, ref as vueref } from "vue" ;
const loading = vueref(false)
const today = vueref(new Date());

// 前野ページからislandIdを取得
const islandId = 12

const recruitUser = reactive({
  recruitTitle:"",
  recruitJob:"",
  recruitPoint:"",
  createDate:"",
});
const islands = vueref();


const getFlight = async() => {
const response = await fetch(
        `http://localhost:8000/Islands/12`
      );
      const data = await response.json();
      console.log(data)
      islands.value = data
      loading.value = true
console.log(islands.value.islandName)
console.log(islands.value.icon)
}
getFlight();



const recruitUserRegisterButton = () =>{
  fetch("http://localhost:8000/RecruitNewUser", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      islandId:islandId ,
      recruitTitle:recruitUser.recruitTitle,
      recruitJob:recruitUser.recruitJob,
      recruitPoint:recruitUser.recruitPoint,
      createDate:today.value,
      islandName:islands.value.islandName,
      islandIcon:islands.value.icon
    }),
})
}

</script>

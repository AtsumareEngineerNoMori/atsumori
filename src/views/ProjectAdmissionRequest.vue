<script setup>
import { onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";

const checked = ref(false);
const route = useRoute();
const router = useRouter();
const userId = route.params.userId;
const projectId = route.params.projectId;
const projectData = ref({});
const comment = ref();
const overComment = ref("");


onMounted(async () => {
  try {
    const response = await fetch(`http://localhost:8000/Projects/${projectId}`);
    if (!response.ok) {
      throw new Error(`HTTMPエラーです:${response.status}`);
    }
    projectData.value = await response.json();
    console.log("projectDataの中見", projectData.value);
  } catch(err) {
    console.log("エラーーーーー",err);
  }
});
//申請ボタン
async function Request() {
  if(!check()){
    return;
  }
  try {
    const response = await fetch(`http://localhost:8000/RequestProject`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        projectId: projectId,
        comment: comment.value,
      }),
    });
    if (!response.ok) {
      console.log(`HTTPエラーです！！！: ${response.status}`);
    }
    console.log("申請しました");
    router.push(`/projectShow/${projectId}`);

  } catch(err) {
    console.log("更新できませんでした",err);
  }
}


// バリデーションチェック
function check() {
  let isValid = true;

  const maxComment = 255;
  if (comment.value.length > maxComment) {
    overComment.value = "ひとことは255文字以内で入力してください";
    isValid = false;
  } else {
    overComment.value = "";
  }

  return isValid;
}

</script>
<template>
  <div class="request">
    <h1 class="request__title">{{ projectData.projectName }} プロジェクト申請画面</h1>
    <div class="request__container">
      <h1 class="request__item">プロジェクトの情報</h1>
      <p class="request__detail">
        {{ projectData.projectDescription }}
      </p>
    </div>
    <div>
      <h1 class="request__item">ひとこと</h1>
      <div v-if="overComment"  class="mypage__check">{{ overComment }}</div>

      <input type="text" class="request__input" v-model="comment
      " />
    </div>
    <div>
      <h1>注意事項</h1>
      <p>一度行った申請は取り消しできません</p>
    </div>

    <div class="request__agree">
      <!-- <input type="checkbox" id="agree" v-model="checked.value"/> -->
      <label for="agree">上記に同意しました　</label>
      <input type="checkbox" id="agree" v-model="checked"/>

      <div>
        <button :class="{ 'request__button': true, 'request__disabled': !checked }" @click="Request">送信</button>


      </div>
    </div>

  </div>
</template>
<!-- class="request__button " -->

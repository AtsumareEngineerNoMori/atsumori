<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import {
  onAuthStateChanged,
  // createUserWithEmailAndPassword,
  // getAuth,
} from "@firebase/auth";
import { storage, auth, db } from "../../firebase";


const checked = ref(false);
const route = useRoute();
const router = useRouter();
const userId = route.params.userId;
const islandId = route.params.islandId;
const islandData = ref<islandData | null>(null);
type islandData = {
  islandName: string,
  islandDescription: string,
  adminId:string,
  createDate:Date,
  icon:string,
  id:number
}
const comment = ref("");
const overComment = ref("");

onMounted(async () => {
      // ログイン状態のチェック
      onAuthStateChanged(auth, async (currentUser) => {
    if (currentUser) {
      console.log("ログインしています");
  try {
    const response = await fetch(`http://localhost:8000/Islands/${islandId}`);
    if (!response.ok) {
      throw new Error(`HTTMPエラーです:${response.status}`);
    }
    islandData.value = await response.json();
    console.log("islandDataの中見", islandData.value);
  } catch {
    console.log("エラーーーーー");
  }
} else {
      router.push("/login");
    }
  });
});

//申請ボタン
async function Request() {
  if (!check()) {
    return;
  }
  try {
    const response = await fetch(`http://localhost:8000/RequestIsland`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        islandId: islandId,
        comment: comment.value,
      }),
    });
    if (!response.ok) {
      console.log(`HTTPエラーです！！！: ${response.status}`);
    }
    console.log("申請しました");
    router.push("/show");
  } catch {
    console.log("更新できませんでした");
  }
  router.push(`/islandShow/${islandId}`);
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
    <div v-if="islandData">

      <h1 class="request__title">{{ islandData.islandName }} 移住申請</h1>
      <div class="request__container">
        <h1 class="request__item">島の情報</h1>
        <p class="request__detail">
          {{ islandData.islandDescription }}
        </p>
      </div>
    </div>
    <div v-else>
      Loading...
    </div>
    <div>
      <h1 class="request__item">ひとこと</h1>

      <input type="text" class="request__input" v-model="comment" />
      <div style="height: 30px;">
        <div v-if="overComment" class="mypage__check">{{ overComment }}</div>
      </div>
    </div>
    <div>
      <h1>注意事項</h1>
      <p>一度行った申請は取り消しができません</p>
    </div>

    <div class="request__agree">
      <!-- <input type="checkbox" id="agree" v-model="checked.value"/> -->
      <label for="agree">上記に同意しました　</label>
      <input type="checkbox" id="agree" v-model="checked" />

      <div>
        <button
          :class="{ request__button: true, request__disabled: !checked }"
          @click="Request"
        >
          送信
        </button>
      </div>
    </div>
  </div>
</template>
<!-- class="request__button " -->

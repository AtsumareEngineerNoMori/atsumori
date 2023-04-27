<script setup>
import { onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";

const checked = ref(false);
const route = useRoute();
const router = useRouter();
const userId = route.params.userId;
const islandId = route.params.islandId;
const islandData = ref({});
const comment = ref();

onMounted(async () => {
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
});

//申請ボタン
async function Request() {
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
    router.push("/show")
  } catch {
    console.log("更新できませんでした");
  }
}
</script>
<template>
  <div class="request">
    <h1 class="request__title">{{ islandData.islandName }} 移住申請</h1>
    <div class="request__container">
      <h1 class="request__item">島の情報</h1>
      <p class="request__detail">
        {{ islandData.islandDescription }}
      </p>
    </div>
    <!-- <div>
      <h1 class="request__item">募集要項</h1>
      <p class="request__detail">
        情報情報情報情報情報情報情報情報情報情報情報情報情報情報情報情報情報情報情報情報情報情報情報情報情報情報情報情報情報情報情報情報情報情報情報情報
      </p>
    </div> -->

    <div>
      <h1 class="request__item">ひとこと</h1>
      <input type="text" class="request__input" v-model="comment" />
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

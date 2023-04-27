<script setup>
import { watch, ref } from "vue";
import { joinJudge } from "../../userJudge";
import { useRouter } from "vue-router";

// 1.参加者　2.未参加者　3.スカウト
const props = defineProps({
  islandId: Number,
  myId: String,
});

const userJudge = ref(null);

const router = useRouter();

// 表示切り替え
watch(props, async () => {
  // 遷移元のURL
  let url = router.referrer;
  // スカウト検索結果画面のURL
  const scoutUrl = "http://localhost:5173/";

  if (url === scoutUrl) {
    userJudge.value = 3;
  } else {
    const id = props.islandId;
    const joinDatas = await fetch(
      `http://localhost:8000/JoinIslands?islandId=${id}`
    ).then((res) => res.json());

    const joinIds = joinDatas.map((joinData) => joinData.userId);

    userJudge.value = joinJudge(joinIds, props.myId);
  }
});

// 遷移
const islandChatRouter = () => {
  router.push({ name: "islandChat", params: { id: props.islandId } });
};

const recruitRouter = () => {
  router.push({
    name: "islandadmissionrequest",
    params: { islandId: props.islandId, userId: props.myId },
  });
};

const scoutRouter = () => {

};
</script>

<template>
  <div>
    <button
      v-show="userJudge === 1"
      @click="islandChatRouter"
      class="showBtn showChat"
    >
      チャット
    </button>

    <button
      v-show="userJudge === 2"
      @click="recruitRouter"
      class="showBtn showEntry"
    >
      移住申請
    </button>

    <button
      v-show="userJudge === 3"
      @click="scoutRouter"
      class="showBtn showScout"
    >
      スカウト
    </button>
  </div>
</template>

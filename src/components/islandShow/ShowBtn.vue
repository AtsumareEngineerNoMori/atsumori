<script setup>
import { watch, ref } from "vue";
import { joinJudge } from "../../userJudge";
import { useRouter } from "vue-router";

// 1.参加者　2.未参加者　3.スカウト
const props = defineProps({
  islandId: Number,
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
    console.log(joinDatas);

    const joinIds = [];
    joinDatas.forEach((joinData) => {
      joinIds.push(joinData.userId);
    });
    console.log(joinIds);

    userJudge.value = joinJudge(joinIds);
  }
});
</script>

<template>
  <div>
    <router-link to="/">
      <button v-show="userJudge === 1" class="showBtn showChat">
        チャット
      </button>
    </router-link>
    <router-link to="/">
      <button v-show="userJudge === 2" class="showBtn showEntry">
        移住申請
      </button>
    </router-link>

    <button v-show="userJudge === 3" class="showBtn showScout">スカウト</button>
  </div>
</template>

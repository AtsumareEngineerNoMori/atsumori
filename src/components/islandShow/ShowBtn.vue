<script setup lang="ts">
import { watch, ref } from "vue";
import { joinJudge } from "../../userJudge";
import { useRouter } from "vue-router";

const props = defineProps<{
  islandId?: number;
  myId?: string;
}>();

const userJudge = ref();

const router = useRouter();

// 表示切り替え
watch(props, async () => {
  const id = props.islandId;
  const joinDatas = await fetch(
    `http://localhost:8000/JoinIslands?islandId=${id}`
  ).then((res) => res.json());

  const joinIds = joinDatas.map((joinData: any) => joinData.userId);

  userJudge.value = joinJudge(joinIds, props.myId);
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
  </div>
</template>

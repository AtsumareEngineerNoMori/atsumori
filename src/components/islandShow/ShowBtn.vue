<script setup lang="ts">
import { useRouter } from "vue-router";

const props = defineProps<{
  islandId?: number;
  myId?: string;
  userJudges?: number;
}>();

const router = useRouter();

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
      id="chat"
      v-show="props.userJudges === 1 || props.userJudges === 2"
      @click="islandChatRouter"
      class="showBtn showChat"
    >
      チャット
    </button>

    <button
      id="request"
      v-show="props.userJudges === 3"
      @click="recruitRouter"
      class="showBtn showEntry"
    >
      移住申請
    </button>
  </div>
</template>

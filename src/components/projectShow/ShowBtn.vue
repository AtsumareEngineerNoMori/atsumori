<script setup lang="ts">
import EntryModal from "../modal/EntryModal.vue";
import { watch, ref } from "vue";
import { useRouter } from "vue-router";

// 1.参加者　2.未参加者
const props = defineProps<{
  projectId?: number;
  myId?: string;
  userJudges?: number;
}>();

const router = useRouter();

// 遷移
const projectChatRouter = () => {
  router.push({ name: "projectChat", params: { id: props.projectId } });
};
</script>

<template>
  <div>
    <div v-show="props.userJudges === 3">
      <EntryModal :projectId="props.projectId" :myId="props.myId" />
    </div>

    <button
      id="chat"
      v-show="props.userJudges === 1 || props.userJudges === 2"
      @click="projectChatRouter"
      class="showBtn showChat"
    >
      チャット
    </button>
  </div>
</template>

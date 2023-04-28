<script setup>
import EntryModal from "../modal/EntryModal.vue";
import { joinJudge } from "../../userJudge";
import { watch, ref } from "vue";
import { useRouter } from "vue-router";

// 1.参加者　2.未参加者
const props = defineProps({
  userIds: Array,
  projectId: Number,
  myId: String,
});

const userJudge = ref(null);
const router = useRouter();

watch(props, () => {
  userJudge.value = joinJudge(props.userIds, props.myId);
});

// 遷移
const projectChatRouter = () => {
  router.push({ name: "projectChat", params: { id: props.projectId } });
};
</script>

<template>
  <div>
    <div v-show="userJudge === 2">
      <EntryModal :projectId="props.projectId" :myId="props.myId" />
    </div>

    <button
      v-show="userJudge === 1"
      @click="projectChatRouter"
      class="showBtn showChat"
    >
      チャット
    </button>
  </div>
</template>

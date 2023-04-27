<script setup>
import EntryModal from "../modal/EntryModal.vue";
import { joinJudge } from "../../userJudge";
import { watch, ref } from "vue";

const userJudge = ref(null);

// 1.参加者　2.未参加者
const props = defineProps({
  userIds: Array,
  projectId: Number,
  myId: String,
});

watch(props, () => {
  userJudge.value = joinJudge(props.userIds, props.myId);
});
</script>

<template>
  <div>
    <div v-show="userJudge === 2">
      <EntryModal :projectId="props.projectId" :myId="props.myId" />
    </div>
    <router-link :to="{ name: 'projectChat', params: { id: 5 } }">
      <button v-show="userJudge === 1" class="showBtn showChat">
        チャット
      </button>
    </router-link>
  </div>
</template>

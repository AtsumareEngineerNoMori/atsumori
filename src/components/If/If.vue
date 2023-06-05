<template>
  <div class="list__noDataTitle">
    <button @click="noDataBtn" class="list__noDataTitle-text">
      {{ props.moji }}
    </button>
    <img
      src="https://1.bp.blogspot.com/-4Ng1gNmOhAM/V2ucIdYoIAI/AAAAAAAA7vs/trvOgTP7V30aBo8mAV-d5xlcTyaQHCq3gCLcB/s800/mujintou_kojima.png"
      alt="titleLogo"
      class="list__noDataTitle-img"
    />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();

const props = defineProps({
  moji: String,
  pageLink: String,
});

// データがない場合に表示するボタン
const noDataBtn = () => {
  return router.push(props.pageLink);
};
</script>

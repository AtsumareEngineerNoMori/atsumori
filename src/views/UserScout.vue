<script setup>
import "../css/main.css";

const array = [
  {
    icon: "https://1.bp.blogspot.com/-4Ng1gNmOhAM/V2ucIdYoIAI/AAAAAAAA7vs/trvOgTP7V30aBo8mAV-d5xlcTyaQHCq3gCLcB/s800/mujintou_kojima.png",
    name: "島の名前",
  },
  {
    icon: "https://1.bp.blogspot.com/-4Ng1gNmOhAM/V2ucIdYoIAI/AAAAAAAA7vs/trvOgTP7V30aBo8mAV-d5xlcTyaQHCq3gCLcB/s800/mujintou_kojima.png",
    name: "島の名前",
  },
  {
    icon: "https://1.bp.blogspot.com/-4Ng1gNmOhAM/V2ucIdYoIAI/AAAAAAAA7vs/trvOgTP7V30aBo8mAV-d5xlcTyaQHCq3gCLcB/s800/mujintou_kojima.png",
    name: "島の名前",
  },
  {
    icon: "https://1.bp.blogspot.com/-4Ng1gNmOhAM/V2ucIdYoIAI/AAAAAAAA7vs/trvOgTP7V30aBo8mAV-d5xlcTyaQHCq3gCLcB/s800/mujintou_kojima.png",
    name: "島の名前",
  },
  {
    icon: "https://1.bp.blogspot.com/-4Ng1gNmOhAM/V2ucIdYoIAI/AAAAAAAA7vs/trvOgTP7V30aBo8mAV-d5xlcTyaQHCq3gCLcB/s800/mujintou_kojima.png",
    name: "島の名前",
  },
  {
    icon: "https://1.bp.blogspot.com/-4Ng1gNmOhAM/V2ucIdYoIAI/AAAAAAAA7vs/trvOgTP7V30aBo8mAV-d5xlcTyaQHCq3gCLcB/s800/mujintou_kojima.png",
    name: "島の名前",
  },
];
</script>

<template>
  <div class="join">
    <section>
      <p class="join__title">スカウト承認待ちの島</p>
    </section>
    <section class="join__list">
      <div v-for="island in array" :key="island" class="join__item">
        <!-- リンク先変える -->
        <!-- <RouterLink v-bind:to="{ name: 'top', params: { id: 1 } }"> -->
        <RouterLink v-bind:to="{ name: 'userScout' }">
          <img v-bind:src="island.icon" alt="island" class="join__iconImg" />
          <p class="join__name">{{ island.name }}</p>
        </RouterLink>
        <div class="scout__buttons">
          <button class="scout__buttons-approveButton">許可</button>
          <button class="scout__buttons-deleteButton">削除</button>
        </div>
      </div>
    </section>
  </div>
</template>

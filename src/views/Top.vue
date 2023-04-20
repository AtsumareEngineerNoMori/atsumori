<template>
  <div class="top">
    <div v-if="isShow" class="top-nomal">
      <div class="top-nomal-select1">
        <p class="top-nomal-select1-nomal"   v-on:click="toggleStatus">島/プロジェクト検索</p>
        <p class="top-nomal-select1-recruit">募集中の島/プロジェクト検索</p>
      </div>
    </div>

    <div v-else="isShow" class="top-recruit">
      <div class="top-recruit-select1">
        <p class="top-recruit-select1-nomal">島/プロジェクト検索</p>
        <p class="top-recruit-select1-recruit"   v-on:click="toggleStatus">募集中の島/プロジェクト検索</p>
      </div>
    </div>

    <div class="top-searchSet">
      <div class="top-search">
        <input type="text" class="top-search-input" />
        <button class="top-search-button">検索</button>
      </div>
      <div class="top-select2">
        <input type="radio" name="select" value="island" />
        <span class="top-select2-island">島</span>
        <input type="radio" name="select" value="project" />
        <span>プロジェクト</span>
      </div>
    </div>

    <div class="top-new">
      <div class="top-new-set">
        <p class="top-new-set-title">新着島</p>
        <section class="top-new-set-list">
          <div
            v-for="infomation in array"
            :key="infomation"
            class="top-new-set-item"
          >
            <img
              v-bind:src="infomation.icon"
              alt="ifomation"
              class="top-new-set-img"
            />
            <p class="top-new-set-name">{{ infomation.name }}</p>
          </div>
        </section>
      </div>

      <div class="top-new-set">
        <p class="top-new-set-title">新プロジェクト</p>
        <section class="top-new-set-list">
          <div
            v-for="infomation in array"
            :key="infomation"
            class="top-new-set-item"
          >
            <img
              v-bind:src="infomation.icon"
              alt="ifomation"
              class="top-new-set-img"
            />
            <p class="top-new-set-name">{{ infomation.name }}</p>
          </div>
        </section>
      </div>
    </div>

    <div class="top-new">
      <div class="top-new-set">
        <p class="top-new-set-title">新募集島</p>
        <section class="top-new-set-list">
          <div
            v-for="infomation in array"
            :key="infomation"
            class="top-new-set-item"
          >
            <img
              v-bind:src="infomation.icon"
              alt="ifomation"
              class="top-new-set-img"
            />
            <p class="top-new-set-name">{{ infomation.name }}</p>
          </div>
        </section>
      </div>

      <div class="top-new-set">
        <p class="top-new-set-title">新募集プロジェクト</p>
        <section class="top-new-set-list">
          <div
            v-for="infomation in array"
            :key="infomation"
            class="top-new-set-item"
          >
            <img
              v-bind:src="infomation.icon"
              alt="ifomation"
              class="top-new-set-img"
            />
            <p class="top-new-set-name">{{ infomation.name }}</p>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const isShow = ref(false);
const toggleStatus = () => {
  isShow.value = !isShow.value;
};

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

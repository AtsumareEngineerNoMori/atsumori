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
        <input  class="top-select2-input" type="radio" name="select" value="island" />
        <span class="top-select2-island">島</span>
        <input  class="top-select2-input" type="radio" name="select" value="project" />
        <span>プロジェクト</span>
      </div>
    </div>

    <div class="top-new">
      <div class="top-new-set">
        <p class="top-new-set-title">新着島</p>
        <section class="top-new-set-list">
          <div
            v-for="infomation in newIslandArray"
            :key="infomation"
            class="top-new-set-item"
          >
            <img
              v-bind:src="infomation.icon"
              alt="ifomation"
              class="top-new-set-img"
            />
            <p class="top-new-set-name">{{ infomation.islandName}}</p>
          </div>
        </section>
      </div>

      <div class="top-new-set">
        <p class="top-new-set-title">新プロジェクト</p>
        <section class="top-new-set-list">
          <div
            v-for="infomation in newProjectArray"
            :key="infomation"
            class="top-new-set-item"
          >
            <img
              v-bind:src="infomation.icon"
              alt="ifomation"
              class="top-new-set-img"
            />
            <p class="top-new-set-name">{{ infomation.projectName }}</p>
          </div>
        </section>
      </div>
    </div>

    <div class="top-new">
      <div class="top-new-set">
        <p class="top-new-set-title">新募集島</p>
        <section class="top-new-set-list">
          <div
            v-for="infomation in newRecruitIslandArray"
            :key="infomation"
            class="top-new-set-item"
          >
            <img
              v-bind:src="infomation.islandIcon"
              alt="ifomation"
              class="top-new-set-img"
            />
            <p class="top-new-set-name">{{ infomation.islandName }}{{ infomation.recruitTitle }}</p>
          </div>
        </section>
      </div>

      <div class="top-new-set">
        <p class="top-new-set-title">新募集プロジェクト</p>
        <section class="top-new-set-list">
          <div
            v-for="infomation in newRecruitProjectArray"
            :key="infomation"
            class="top-new-set-item"
          >
            <img
              v-bind:src="infomation.projectIcon"
              alt="ifomation"
              class="top-new-set-img"
            />
            <p class="top-new-set-name">{{ infomation.projectName }}</p>
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

const newIslandArray = ref();
const newProjectArray = ref();
const newRecruitIslandArray = ref();
const newRecruitProjectArray = ref();

// 島
const getIslands = async() => {
const response = await fetch(
        `http://localhost:8000/Islands/?_limit=6`
      );
      const data = await response.json();
      console.log(data)
      newIslandArray.value = data
}
getIslands();

// プロジェクト
const getProjects = async() => {
const response = await fetch(
        `http://localhost:8000/Projects/?_limit=6`
      );
      const data = await response.json();
      console.log(data)
      newProjectArray.value = data
}
getProjects();

// 募集人
const getRecruitIslands = async() => {
const response = await fetch(
        `http://localhost:8000/RecruitNewUser/?_limit=6`
      );
      const data = await response.json();
      console.log(data)
    newRecruitIslandArray.value = data
    // console.log(typeof data[0].cr)
    // newRecruitIslandArray.value.sort(
    //     (x, y) => (x.createDate.getTime()) - (y.createDate.getTime()),
    // )
}
getRecruitIslands();

// 募集島
const getRecruitProjects = async() => {
const response = await fetch(
        `http://localhost:8000/RecruitNewIsland/?_limit=6`
      );
      const data = await response.json();
      console.log(data)
      newRecruitProjectArray.value = data
}
getRecruitProjects();

// const sort = () => {
//   return newRecruitIslandArray.value.sort((a, b) => {
//     return b.createDate - a.createDate;
//   });
// }
// sort();




</script>

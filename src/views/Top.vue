<template>
  <div class="top">
    <div v-if="isShow" class="top-nomal">
      <div class="top-nomal-select1">
        <p
          class="top-nomal-select1-nomal"
          :class="{ active: selectedFilter === 'filter1' }"
          @click="selectFilter('filter1')"
        >
          島/プロジェクト検索
        </p>
        <p
          class="top-nomal-select1-recruit"
          :class="{ active: selectedFilter === 'filter2' }"
          @click="selectFilter('filter2')"
        >
          募集中の島/プロジェクト検索
        </p>
      </div>
    </div>

    <div v-else="isShow" class="top-recruit">
      <div class="top-recruit-select1">
        <p
          class="top-recruit-select1-nomal"
          :class="{ active: selectedFilter === 'filter1' }"
          @click="selectFilter('filter1')"
        >
          島/プロジェクト検索
        </p>
        <p
          :class="{ active: selectedFilter === 'filter2' }"
          @click="selectFilter('filter2')"
          class="top-recruit-select1-recruit"
        >
          募集中の島/プロジェクト検索
        </p>
      </div>
    </div>

    <div class="top-searchSet">
      <form :action="formAction" @submit.prevent="handleSubmit">
        <div class="top-search">
          <input
            type="search"
            name="search"
            placeholder="キーワードを入力"
            class="top-search-input"
            v-model="keyword"
          />
          <input
            type="submit"
            name="submit"
            value="検索"
            class="top-search-button"
          />
        </div>
      </form>

      <div class="top-select2">
        <input
          class="top-select2-input"
          type="radio"
          name="select"
          value="island"
        />
        <span class="top-select2-island">島</span>
        <input
          class="top-select2-input"
          type="radio"
          name="select"
          value="project"
        />
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
            <router-link
              :to="{ name: 'show', params: { id: infomation.id } }"
            >
              <img
                v-bind:src="infomation.icon"
                alt="ifomation"
                class="top-new-set-img"
              />
              <p class="top-new-set-name">{{ infomation.islandName }}</p>
            </router-link>
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
            <!-- <router-link
              :to="{ name: 'projectShow', params: { id: infomation.id } }"
            > -->
              <img
                v-bind:src="infomation.icon"
                alt="ifomation"
                class="top-new-set-img"
              />
              <p class="top-new-set-name">{{ infomation.projectName }}</p>
            <!-- </router-link> -->
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
            <router-link
              :to="{ name: 'show', params: { id: infomation.id } }"
            >
              <img
                v-bind:src="infomation.islandIcon"
                alt="ifomation"
                class="top-new-set-img"
              />
              <p class="top-new-set-name">
                {{ infomation.islandName }}
              </p>
            </router-link>
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
            <!-- <router-link
              :to="{ name: 'projectShow', params: { id: infomation.id } }"
            > -->
              <img
                v-bind:src="infomation.projectIcon"
                alt="ifomation"
                class="top-new-set-img"
              />
              <p class="top-new-set-name">{{ infomation.projectName }}</p>
            <!-- </router-link> -->
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";

const isShow = ref(false);
const selectedFilter = ref("filter1");
const searchType = ref("island");
const keyword = ref("");
const router = useRouter();

const newIslandArray = ref();
const newProjectArray = ref();
const newRecruitIslandArray = ref();
const newRecruitProjectArray = ref();

//selectedFilterの値を変更
function selectFilter(filter) {
  selectedFilter.value = filter;
  console.log("変更しています", filter);
  isShow.value = !isShow.value;
}

// みゆ
const formAction = computed(() => {
  if (selectedFilter.value === "filter1" && searchType.value === "island") {
    return "/searchIslandResult";
  } else if (
    selectedFilter.value === "filter1" &&
    searchType.value === "project"
  ) {
    return "/searchProResult";
  } else if (
    selectedFilter.value === "filter2" &&
    searchType.value === "island"
  ) {
    return "/searchReqIslandResult";
  } else if (
    selectedFilter.value === "filter2" &&
    searchType.value === "project"
  ) {
    return "/projectReqList";
  } else {
    return "";
  }
});

function handleSubmit() {
  if (keyword.value.length > 20) {
    alert("20文字以内で入力してください");
    return (keyword.value = "");
  } else {
    const url = `${formAction.value}?search=${keyword.value}`;
    router.push(url);
  }
}

// 島
const getIslands = async () => {
  const response = await fetch(
    `http://localhost:8000/Islands/?_limit=6&_sort=createDate&_order=desc`
  );
  const data = await response.json();
  console.log(data);
  newIslandArray.value = data;
};
getIslands();

// プロジェクト
const getProjects = async () => {
  const response = await fetch(
    `http://localhost:8000/Projects/?_limit=6&_sort=createDate&_order=desc`
  );
  const data = await response.json();
  console.log(data);
  newProjectArray.value = data;
};
getProjects();

// 募集人
const getRecruitIslands = async () => {
  const response = await fetch(
    `http://localhost:8000/RecruitNewUser/?_limit=6&_sort=createDate&_order=desc`
  );
  const data = await response.json();
  console.log(data);
  newRecruitIslandArray.value = data;
};
getRecruitIslands();

// 募集島
const getRecruitProjects = async () => {
  const response = await fetch(
    `http://localhost:8000/RecruitNewIsland/?_limit=6&_sort=createDate&_order=desc`
  );
  const data = await response.json();
  console.log(data);
  newRecruitProjectArray.value = data;
};
getRecruitProjects();
</script>

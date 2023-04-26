<!-- TOPの検索ボックス -->
<template>
  <div class="search">
    <section>
      <h3 class="search_title">TOPの検索</h3>
    </section>

    <div class="all_search">
      <div>
        <button
          :class="{ active: selectedFilter === 'filter1' }"
          @click="selectFilter('filter1')"
          class="select"
        >
          島/プロジェクト検索
        </button>
        <button
          :class="{ active: selectedFilter === 'filter2' }"
          @click="selectFilter('filter2')"
          class="select"
        >
          募集中の島/プロジェクト検索
        </button>
      </div>

      <div class="which_radio">
        <label>
          <input
            type="radio"
            name="whichSearch"
            value="island"
            v-model="searchType"
          />島
        </label>
        <label>
          <input
            type="radio"
            name="whichSearch"
            value="project"
            v-model="searchType"
          />プロジェクト
        </label>
      </div>

      <form :action="formAction" @submit.prevent="handleSubmit">
        <input
          type="search"
          name="search"
          placeholder="キーワードを入力"
          class="search_box"
          v-model="keyword"
        />
        <input type="submit" name="submit" value="検索" class="search_btn" />
      </form>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";

const selectedFilter = ref("filter1");
const searchType = ref("island");
const keyword = ref("");
const router = useRouter();

//selectedFilterの値を変更
function selectFilter(filter) {
  selectedFilter.value = filter;
  console.log("変更しています", filter);
}

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
    // const kana = keyword.value
    //   .toLowerCase()
    //   .replace(/[ぁ-ん]/g, (s) => String.fromCharCode(s.charCodeAt(0) + 0x60))
    //   .replace(/[ァ-ン]/g, (s) => String.fromCharCode(s.charCodeAt(0) + 0x60));

    // const url = `${formAction.value}?search=${encodeURI(kana)}`;
    // router.push(url);
  }
}
</script>

<style>
.select {
  background-color: #fff;
  color: #ccc;
  border: none;
  padding: 10px 20px;
  /* margin-right: 10px; */
  /* cursor: pointer; */
}

.select.active {
  background-color: #ccc;
  color: #333;
  font-weight: bold;
  text-decoration: underline;
}

.all_search {
  margin: 2%;
}
</style>

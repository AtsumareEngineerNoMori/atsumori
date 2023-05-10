<!-- TOPの検索ボックス -->
<!-- <template>
  <div class="search">
    <section>
      <h3 class="search_title">TOPの検索</h3>
    </section>

    <div class="all_search">
      <div>
        <button
          class="search_select"
          :class="{ active: selectedFilter === 'filter1' }"
          @click="selectFilter('filter1')"
        >
          島/プロジェクト検索
        </button>
        <button
          class="search_select"
          :class="{ active: selectedFilter === 'filter2' }"
          @click="selectFilter('filter2')"
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

      <div class="search_set">
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
  </div>
</template> -->
<!-- <script setup>
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
    return "/searchReqProResult";
  } else {
    return "";
  }
});

function handleSubmit() {
  if (keyword.value.length > 20) {
    alert("20文字以内で入力してください");
    return (keyword.value = "");
  } else {
    // ひらがなとカタカナに変換する
    // const hiraganaKatakana = keyword.value
    //   .replace(/[ぁ-ん]/g, (match) => {
    //     return String.fromCharCode(match.charCodeAt(0) + 0x60);
    //   })
    //   .replace(/[ァ-ン]/g, (match) => {
    //     return String.fromCharCode(match.charCodeAt(0) + 0x60);
    //   });

    // const regex = new RegExp(keyword.value.replace(/[ぁ-んァ-ン]/g, "[ぁ-んァ-ン]"));

    const url = `${formAction.value}?search=${keyword.value}`;
    // const url = `${formAction.value}?search=${encodeURIComponent(regex.source)}`;

    router.push(url);
  }
}
</script> -->
<template>
  <div class="search">
    <div class="all_search">
      <div class="search_selects4">
        <button
          class="search_select"
          :class="{ active: selectedFilter === 'filter1' }"
          @click="selectFilter('filter1')"
        >
          島検索
        </button>
        <button
          class="search_select"
          :class="{ active: selectedFilter === 'filter2' }"
          @click="selectFilter('filter2')"
        >
          プロジェクト検索
        </button>
        <button
          class="search_select"
          :class="{ active: selectedFilter === 'filter3' }"
          @click="selectFilter('filter3')"
        >
          募集中の島検索
        </button>
        <button
          class="search_select"
          :class="{ active: selectedFilter === 'filter4' }"
          @click="selectFilter('filter4')"
        >
          募集中のプロジェクト検索
        </button>
      </div>
      <div class="search_set">
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
  switch (filter) {
    case "filter1":
      searchType.value = "island";
      break;
    case "filter2":
      searchType.value = "project";
      break;
    case "filter3":
      searchType.value = "island";
      break;
    case "filter4":
      searchType.value = "project";
      break;
  }
  selectedFilter.value = filter;
  console.log("変更しています", filter);
}

const formAction = computed(() => {
  switch (selectedFilter.value) {
    case 'filter1':
      return searchType.value === 'island' ? '/searchIslandResult' : '/searchProResult';
    case 'filter2':
      return searchType.value === 'island' ? '/searchReqIslandResult' : '/searchReqProResult';
    case 'filter3':
      return '/searchReqIslandResult';
    case 'filter4':
      return '/searchReqProResult';
    default:
      return '';
  }
});


function handleSubmit() {
  if (keyword.value.length > 20) {
    alert("20文字以内で入力してください");
    return (keyword.value = "");
  } else {
    // ひらがなとカタカナに変換する
    // const hiraganaKatakana = keyword.value
    //   .replace(/[ぁ-ん]/g, (match) => {
    //     return String.fromCharCode(match.charCodeAt(0) + 0x60);
    //   })
    //   .replace(/[ァ-ン]/g, (match) => {
    //     return String.fromCharCode(match.charCodeAt(0) + 0x60);
    //   });

    // const regex = new RegExp(keyword.value.replace(/[ぁ-んァ-ン]/g, "[ぁ-んァ-ン]"));

    const url = `${formAction.value}?search=${keyword.value}`;
    // const url = `${formAction.value}?search=${encodeURIComponent(regex.source)}`;

    router.push(url);
  }
}
</script>

<!-- <style>
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
</style> -->

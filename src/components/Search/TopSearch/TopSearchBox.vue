<template>
  <div class="all">
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
      <p v-if="errorMessage" class="search_errmsg">{{ errorMessage }}</p>
    </div>
  </div>
  <!-- </div> -->
</template>

<script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";

const selectedFilter = ref("filter1");
const searchType = ref("island");
const keyword = ref("");
const router = useRouter();
const errorMessage = ref("");

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
    case "filter1":
      return "/searchIslandResult";
    case "filter2":
      return "/searchProResult";
    case "filter3":
      return "/searchReqIslandResult";
    case "filter4":
      return "/searchReqProResult";
    default:
      return "";
  }
});

// // //ひらがなカタカナ曖昧検索
// function handleSubmit() {
//   if (keyword.value.length > 20) {
//     errorMessage.value = "20文字以内で入力してください";
//     // alert("20文字以内で入力してください");
//     keyword.value = "";
//   } else {
//     const searchQuery = keyword.value
//       // .replace(/[ぁ-ん]/g, (c) => String.fromCharCode(c.charCodeAt(0) + 0x60))
//       // .replace(/[\u30a1-\u30f6]/g, (c) =>
//       //   String.fromCharCode(c.charCodeAt(0) - 0x60)
//       // );
//       .toLowerCase()
//     .replace(/[ぁ-ん]/g, (match) =>
//       String.fromCharCode(match.charCodeAt(0) + 0x60)
//     )
//     .replace(/[\u30a1-\u30f6]/g, (match) =>
//       String.fromCharCode(match.charCodeAt(0) - 0x60)
//     );

      
//     const url = `${formAction.value}?search=${searchQuery}`;
//     keyword.value = "";
//     errorMessage.value = "";

//     router.push(url);
//   }
// }


// ひらがなカタカナ曖昧検索なし
function handleSubmit() {
  if (keyword.value.length > 20) {
    errorMessage.value = "20文字以内で入力してください";
    keyword.value = "";
  } else {
    const searchQuery = keyword.value.toLowerCase();
    const url = `${formAction.value}?search=${searchQuery}`;
    keyword.value = "";
    errorMessage.value = "";

    router.push(url);
  }
}

</script>

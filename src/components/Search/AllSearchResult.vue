<template>
  <!-- スカウトする島・難民を検索する -->
  <div class="search">
    <section>
      <h3 class="search_title">{{ props.searchTitle }}</h3>
    </section>

    <div class="all_search">
      <form action="どこから取ってくるかURL" method="get">
        <p>キーワードを入力してください。</p>
        <input
          type="search"
          name="search"
          placeholder="キーワードを入力"
          class="search_box"
        />
        <input type="submit" name="submit" value="検索" class="search_btn" />
      </form>
    </div>

    <p>検索結果を表示する(初期表示なし)</p>

    <section class="search_list">
      <!-- <div v-if="searchImages.length > 0"> -->
      <div v-for="searchImage in searchImages" :key="searchImage">
        <router-link to="島・プロジェクト詳細ページ">
          <img :src="searchImage.icon" alt="island" class="search_iconImg" />
          <p>{{ searchImage.name }}</p>
        </router-link>
      </div>
      <!-- </div>
            <div v-else> 該当する結果がない,20文字以上を入力した場合
              <p>該当する島はありません</p>
            </div> -->
      <!-- <div v-else> 未入力で検索ボタンを押した場合
            <p>最新から20表示</p>
        </div> -->
    </section>
  </div>
</template>

<script setup>
// import "../css/main.css";

const props = defineProps({
  searchTitle: String,
});

const searchImages = [
  {
    icon: "https://1.bp.blogspot.com/-4Ng1gNmOhAM/V2ucIdYoIAI/AAAAAAAA7vs/trvOgTP7V30aBo8mAV-d5xlcTyaQHCq3gCLcB/s800/mujintou_kojima.png",
    name: "名前",
  },
  {
    icon: "https://1.bp.blogspot.com/-4Ng1gNmOhAM/V2ucIdYoIAI/AAAAAAAA7vs/trvOgTP7V30aBo8mAV-d5xlcTyaQHCq3gCLcB/s800/mujintou_kojima.png",
    name: "名前",
  },
  {
    icon: "https://1.bp.blogspot.com/-4Ng1gNmOhAM/V2ucIdYoIAI/AAAAAAAA7vs/trvOgTP7V30aBo8mAV-d5xlcTyaQHCq3gCLcB/s800/mujintou_kojima.png",
    name: "名前",
  },
  {
    icon: "https://1.bp.blogspot.com/-4Ng1gNmOhAM/V2ucIdYoIAI/AAAAAAAA7vs/trvOgTP7V30aBo8mAV-d5xlcTyaQHCq3gCLcB/s800/mujintou_kojima.png",
    name: "名前",
  },
  {
    icon: "https://1.bp.blogspot.com/-4Ng1gNmOhAM/V2ucIdYoIAI/AAAAAAAA7vs/trvOgTP7V30aBo8mAV-d5xlcTyaQHCq3gCLcB/s800/mujintou_kojima.png",
    name: "名前",
  },
  {
    icon: "https://1.bp.blogspot.com/-4Ng1gNmOhAM/V2ucIdYoIAI/AAAAAAAA7vs/trvOgTP7V30aBo8mAV-d5xlcTyaQHCq3gCLcB/s800/mujintou_kojima.png",
    name: "名前",
  },
];
</script>

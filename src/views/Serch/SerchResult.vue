<template>
  <div class="serch">
    <section>
      <h3 class="serch_title">検索結果</h3>
    </section>

    <div class="all_serch">
      <form action="どこから取ってくるかURL" method="get">
        <p>キーワードを入力してください。</p>
        <input
          type="search"
          name="search"
          placeholder="キーワードを入力"
          class="serch_box"
        />
        <input type="submit" name="submit" value="検索" class="serch_btn" />
      </form>
    </div>

    <section class="serch_list">
      <!-- <div v-if="serchImages.length > 0"> -->
      <div v-for="serchImage in serchImages" :key="serchImage">
        <router-link to="島・プロジェクト詳細ページ">
          <img :src="serchImage.icon" alt="island" class="serch_iconImg" />
          <p>{{ serchImage.name }}</p>
        </router-link>
      </div>
      <!-- </div>
        <div v-else> 該当する結果がない場合
          <p>検索結果がありません</p>
        </div> -->
      <!-- <div v-else> 未入力で検索ボタンを押した場合
        <p>最新から20表示</p>
    </div> -->
    </section>
  </div>
</template>

<script setup>
// import "../css/main.css";

const serchImages = [
  {
    icon: "https://1.bp.blogspot.com/-4Ng1gNmOhAM/V2ucIdYoIAI/AAAAAAAA7vs/trvOgTP7V30aBo8mAV-d5xlcTyaQHCq3gCLcB/s800/mujintou_kojima.png",
    name: "島またはプロジェクトの名前",
  },
  {
    icon: "https://1.bp.blogspot.com/-4Ng1gNmOhAM/V2ucIdYoIAI/AAAAAAAA7vs/trvOgTP7V30aBo8mAV-d5xlcTyaQHCq3gCLcB/s800/mujintou_kojima.png",
    name: "島またはプロジェクトの名前",
  },
  {
    icon: "https://1.bp.blogspot.com/-4Ng1gNmOhAM/V2ucIdYoIAI/AAAAAAAA7vs/trvOgTP7V30aBo8mAV-d5xlcTyaQHCq3gCLcB/s800/mujintou_kojima.png",
    name: "島またはプロジェクトの名前",
  },
  {
    icon: "https://1.bp.blogspot.com/-4Ng1gNmOhAM/V2ucIdYoIAI/AAAAAAAA7vs/trvOgTP7V30aBo8mAV-d5xlcTyaQHCq3gCLcB/s800/mujintou_kojima.png",
    name: "島またはプロジェクトの名前",
  },
  {
    icon: "https://1.bp.blogspot.com/-4Ng1gNmOhAM/V2ucIdYoIAI/AAAAAAAA7vs/trvOgTP7V30aBo8mAV-d5xlcTyaQHCq3gCLcB/s800/mujintou_kojima.png",
    name: "島またはプロジェクトの名前",
  },
  {
    icon: "https://1.bp.blogspot.com/-4Ng1gNmOhAM/V2ucIdYoIAI/AAAAAAAA7vs/trvOgTP7V30aBo8mAV-d5xlcTyaQHCq3gCLcB/s800/mujintou_kojima.png",
    name: "島またはプロジェクトの名前",
  },
];
</script>

<template>
  <div class="top">
    <div class="top-search">
      <TopSearchBox />
    </div>
    <div class="top-new">
      <TopShow :table="`islandsTop`" :witch="`island`" :title="'新着島'" />
      <TopShow
        :table="`projectsTop`"
        :witch="`project`"
        :title="'新着プロジェクト'"
      />
    </div>
    <div class="top-new">
      <TopShow
        :table="`recruitIslandsTop`"
        :witch="`island`"
        :title="'新着募集島'"
      />
      <TopShow
        :table="`recruitProjectsTop`"
        :witch="`project`"
        :title="'新着募集プロジェクト'"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import TopSearchBox from "../components/Search/TopSearch/TopSearchBox.vue";
import { onAuthStateChanged } from "@firebase/auth";
import { auth } from "../firebase";
import { useRouter } from "vue-router";
import TopShow from "../components/Top/TopShow.vue";

const router = useRouter();

// ログイン状態の場合の処理
onAuthStateChanged(auth, (currentUser) => {
  if (currentUser) {
    console.log("ログインしています");
  } else {
    router.replace("/login");
  }
});
</script>

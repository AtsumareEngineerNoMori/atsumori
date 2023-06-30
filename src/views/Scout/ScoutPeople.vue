<!-- スカウトする難民を探す -->
<!-- 初期表示なし、未入力検索はランダムで20件表示 -->
<template>
  <div class="search">
    <section>
      <h3 class="search_title">スカウトする難民を探す</h3>
    </section>

    <div class="search_set">
      <form @submit.prevent="searchUsers">
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

    <section v-if="results">
      <div v-if="filteredUsers.length > 0">
        <div v-if="filteredUsers.length > 20" class="search_no">
          <p class="search_recommend">おすすめの難民</p>
        </div>
        <div class="search_list">
          <router-link
            v-for="user in randomUsers"
            :key="user.id"
            :to="`/mypageforscout/${$route.params.islandId}/${user.id}`"
            class="search_result"
          >
            <div class="search_flex">
              <img :src="user.icon" alt="user" class="search_iconImg" />
              <div class="search_recinfo">
                <p>{{ user.name }}</p>
              </div>
            </div>
          </router-link>
        </div>
      </div>
      <div v-else class="search_no">
        <p>検索結果はありません</p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, Ref } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

//型
type User = {
  id: number;
  icon: string;
  name: string;
  JoinIslands: JoinIsland[];
};
type JoinIsland = {
  userId: string;
  islandId: number;
  id: number;
};

const route = useRoute();
const keyword: Ref<string> = ref("");
const users: Ref<User[]> = ref([]);
const filteredUsers: Ref<User[]> = ref([]);
const results: Ref<boolean> = ref(false);
const errorMessage: Ref<string> = ref("");

const fetchUsers = async () => {
  try {
    // const responce = await fetch(`http://localhost:3000/scoutUsersSearch`);
    // const data = await responce.json();
    const responce = await axios.get(`http://localhost:3000/scoutUsersSearch`);
    const data = await responce.data;
    users.value = data;
    console.log("難民", data);
  } catch (error) {
    console.log("難民", error);
  }
};

//paramsのislandId以外のデータを取得
const searchUsers = () => {
  console.log("検索:", keyword.value);

  const keywordUser = keyword.value
    .toLowerCase()
    .replace(/[ぁ-ん]/g, (match) =>
      String.fromCharCode(match.charCodeAt(0) + 0x60)
    )
    .replace(/[\u30a1-\u30f6]/g, (match) =>
      String.fromCharCode(match.charCodeAt(0) - 0x60)
    );
  if (keywordUser) {
    if (keyword.value.length > 20) {
      errorMessage.value = "20文字以内で入力してください";
      keyword.value = "";
    } else {
      filteredUsers.value = users.value
        .filter((user) =>
          user.name
            .toLowerCase()
            .replace(/[ぁ-ん]/g, (match) =>
              String.fromCharCode(match.charCodeAt(0) + 0x60)
            )
            .replace(/[\u30a1-\u30f6]/g, (match) =>
              String.fromCharCode(match.charCodeAt(0) - 0x60)
            )
            .includes(keywordUser)
        )
        .filter(
          (user) =>
            !user.JoinIslands.some(
              (join) =>
                join.islandId === parseInt(route.params.islandsId as string)
            )
        );
      results.value = true;
      keyword.value = "";
      errorMessage.value = "";
    }
  } else {
    filteredUsers.value = users.value.filter(
      (user) =>
        !user.JoinIslands.some(
          (join) => join.islandId === parseInt(route.params.islandId as string)
        )
    );
    results.value = true;
    keyword.value = "";
    errorMessage.value = "";
  }
  console.log("表示難民", filteredUsers.value);
};

//未入力で検索ボタンを押下した際ランダムで20件選出
const randomUsers = computed(() => {
  if (filteredUsers.value.length <= 20) {
    return filteredUsers.value;
  } else {
    const randomArray: number[] = [];
    while (randomArray.length < 20) {
      const random = Math.floor(Math.random() * filteredUsers.value.length);
      if (!randomArray.includes(random)) {
        randomArray.push(random);
      }
    }
    return randomArray.map((index) => filteredUsers.value[index]);
  }
});

onMounted(() => {
  fetchUsers();
});
</script>

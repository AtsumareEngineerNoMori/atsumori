<!-- スカウトする難民を探す -->
<!-- 初期表示なし、未入力検索はランダムで20件表示 -->
<template>
  <div class="search">
    <section>
      <h3 class="search_title">スカウトする難民を探す</h3>
    </section>

    <div class="island_search">
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
    </div>

    <section v-if="results" class="search_list">
      <div v-if="filteredUsers.length > 0">
        <router-link
          v-for="user in filteredUsers"
          :key="user.id"
          :to="`/mypageforscout/${$route.params.id}/${user.id}`"
        >
          <!-- <router-link
          v-for="(user, index) in filteredUsers.slice(0, 5)"
          :key="user.id"
          :to="`/mypageforscout/${$route.params.id}/${user.id}`"
        > -->
          <img :src="user.icon" alt="user" class="search_iconImg" />
          <div class="search_recinfo">
            <p>{{ user.name }}</p>
          </div>
        </router-link>
        <!-- <div v-if="filteredUsers.length > 5" class="search_no">
          <p>最新のおすすめ20件</p>
        </div> -->
      </div>
      <div v-else class="search_no">
        <p>検索結果はありません。</p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

const keyword = ref("");
const users = ref([]);
const filteredUsers = ref([]);
const results = ref(false);

const fetchUsers = async () => {
  try {
    const responce = await fetch(`http://localhost:8000/Users`);
    const data = await responce.json();
    users.value = data;
    console.log("難民", data);
  } catch (error) {
    console.log("難民", error);
  }
};

const searchUsers = () => {
  console.log("検索:", keyword.value);

  const keywordUser = keyword.value.toLowerCase();
  if (keywordUser) {
    if (keyword.value.length > 20) {
      alert("20文字以内で入力してください");
      keyword.value = "";
    } else {
      filteredUsers.value = users.value.filter((user) =>
        user.name.toLowerCase().includes(keywordUser)
      );
      results.value = true;
      keyword.value = "";
    }
  } else {
    filteredUsers.value = users.value;
    results.value = true;
    keyword.value = "";
  }
};

onMounted(() => {
  fetchUsers();
});
</script>

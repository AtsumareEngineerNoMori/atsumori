<script setup lang="ts">
import { ref } from "vue";
import type { Ref } from "vue";
import "../../css/main.css";

interface UserScout {
  id: number;
  userId: string;
  islandId: number;
}

const props = defineProps({
  userId: String,
  islandId: Number,
});
const scoutList: Ref<UserScout[]> = ref([]);

// 退会ボタン
const deleteBtn = async () => {
  // userScoutからuserIdが等しいデータを取得し、選択した島のislandIdが一致するデータをidを指定して削除する
  const getUserScout = async () => {
    const response = await fetch(
      `http://localhost:8000/userScout/?userId=${props.userId}`
    );
    const data = await response.json();
    scoutList.value = data;
    console.log(data);
  };
  getUserScout()
    .then(() => {
      scoutList.value.map(async (scout) => {
        if (props.islandId === scout.islandId) {
          await fetch(`http://localhost:8000/userScout/${scout.id}`, {
            method: "DELETE",
          });
        }
      });
    })
    .then(() => {
      location.reload();
    });
};
</script>

<template>
  <button class="list__button" @click="deleteBtn">削除</button>
</template>

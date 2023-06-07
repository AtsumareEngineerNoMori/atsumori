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
const deleteBtn: () => Promise<void> = async () => {
  // userScoutからuserIdが等しいデータを取得し、選択した島のislandIdが一致するデータをidを指定して削除する
  const getUserScout: () => Promise<void> = async () => {
    const response: Response = await fetch(
      `http://localhost:8000/userScout/?userId=${props.userId}`
    );
    const data: UserScout[] = await response.json();
    scoutList.value = data;
    console.log(data);
  };
  getUserScout()
    .then(() => {
      scoutList.value.map(async (scout: UserScout) => {
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

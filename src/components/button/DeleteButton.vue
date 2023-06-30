<script setup lang="ts">
import "../../css/main.css";

interface ResData {
  id: number;
  userId: string;
  islandId: number;
}

const props = defineProps({
  userId: String,
  islandId: Number,
  admin: Boolean,
  url: String,
});

// 退会ボタン
const deleteBtn: () => Promise<void> = async () => {
  // joinIslandsもしくはUserScoutからログインユーザーのuserIdと選択されたislandIdと一致するデータを削除
  await fetch(
    `http://localhost:3000/${props.url}/?userId=${props.userId}&islandId=${props.islandId}`,
    {
      method: "DELETE",
    }
  )
    .then((response) => response.json())
    .then((data: ResData) => {
      console.log("削除されたデータ:", data);
      location.reload();
    })
    .catch((error) => {
      console.error("削除エラー:", error);
    });
};
</script>

<template>
  <template v-if="props.url === 'deleteJoinIslands'">
    <button class="list__button" @click="deleteBtn" v-if="!props.admin">退会</button>
  </template>
  <template v-else-if="props.url === 'deleteUserScout'">
    <button class="list__button" @click="deleteBtn">削除</button>
  </template>
</template>

<script setup lang="ts">
import "../../css/main.css";

interface JoinIslands {
  id: number;
  userId: string;
  islandId: number;
}

const props = defineProps({
  userId: String,
  islandId: Number,
});

// 退会ボタン
const deleteBtn: () => Promise<void> = async () => {
  // joinIslandsからログインユーザーのuserIdと選択されたislandIdと一致するデータを削除
  await fetch(
    `http://localhost:3000/deleteJoinIslands/?userId=${props.userId}&islandId=${props.islandId}`,
    {
      method: "DELETE",
    }
  )
    .then((response) => response.json())
    .then((data: JoinIslands) => {
      console.log("削除されたデータ:", data);
      location.reload();
    })
    .catch((error) => {
      console.error("削除エラー:", error);
    });
};
</script>

<template>
  <button class="list__button" @click="deleteBtn">退会</button>
</template>

<script setup lang="ts">
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

// 削除ボタン
const deleteBtn: () => Promise<void> = async () => {
  // UserScoutからログインユーザーのuserIdと選択されたislandIdに一致するデータを削除
  await fetch(
    `http://localhost:3000/deleteUserScout/?userId=${props.userId}&islandId=${props.islandId}`,
    {
      method: "DELETE",
    }
  )
    .then((response) => response.json())
    .then((data: UserScout) => {
      console.log("削除されたデータ:", data);
      location.reload();
    })
    .catch((error) => {
      console.log("削除エラー:", error);
    });
};
</script>

<template>
  <button class="list__button" @click="deleteBtn">削除</button>
</template>

<script setup lang="ts">
import "../../css/main.css";

interface UserScout {
  id: number;
  userId: string;
  islandId: number;
}

interface JoinIslands {
  id: number;
  userId: string;
  islandId: number;
}

const props = defineProps({
  userId: String,
  islandId: Number,
});

// スカウトを受け入れて島に参加する
const approveBtn = async () => {
  // JoinIslandsに追加
  const joinResponse: Response = await fetch(
    "http://localhost:3000/addJoinIslands",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: props.userId,
        islandId: props.islandId,
      }),
    }
  );
  const joinData: JoinIslands = await joinResponse.json();
  console.log(joinData);

  // UserScoutからログインユーザーのuserIdと選択されたislandIdに一致するデータを削除
  await fetch(
    `http://localhost:3000/deleteUserScout/?userId=${props.userId}&islandId=${props.islandId}`,
    {
      method: "DELETE",
    }
  )
    .then((res) => res.json())
    .then((data: UserScout) => {
      console.log("削除されたデータ:", data);
      // 削除後のデータを取得するためにリロード
      location.reload();
    })
    .then((error) => {
      console.log("削除エラー:", error);
    });
};
</script>

<template>
  <button @click="approveBtn" class="scout__buttons-approveButton">参加</button>
</template>

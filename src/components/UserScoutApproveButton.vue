<script setup>
import "../css/main.css";

const props = defineProps({
  userId: String,
  islandId: Number,
});

// スカウトを受け入れて島に参加する
const approveBtn = async () => {
  // JoinIslandsに追加
  const joinResponse = await fetch("http://localhost:8000/joinIslands", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: props.userId,
      islandId: props.islandId,
    }),
  });
  const joinData = await joinResponse.json();
  console.log(joinData);

  // userScoutから消す
  const scoutResponse = await fetch(`http://localhost:8000/userScout/?userId=${3}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(
    //   {
    //   userId: props.userId,
    //   islandId: props.islandId,
    // }
    ),
  });
  const scoutData = await scoutResponse.json();
  console.log(scoutData);

  // 最新のuserScoutのデータを取得する
  // watch?
};
</script>

<template>
  <button @click="approveBtn" class="scout__buttons-approveButton">参加</button>
</template>

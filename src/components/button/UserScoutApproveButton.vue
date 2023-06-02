<script setup lang="ts">
import { ref } from "vue";
import type { Ref } from "vue";
import "../../css/main.css";

interface UserScout {
  id: number,
  userId: string,
  islandId: number
}

const props = defineProps({
  userId: String,
  islandId: Number,
});

// データ削除の時に再度取得したデータを保管
const scoutList:Ref<UserScout[]> = ref([]);

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

  // userScoutからuserIdが等しいデータを取得し、選択した島のislandIdが一致するデータをidを指定して削除する
  const getScoutUser = async () => {
    const response = await fetch(
      `http://localhost:8000/userScout/?userId=${props.userId}`
    );
    const data = await response.json();
    scoutList.value = data;
    console.log(data);
  };
  getScoutUser()
    .then(() => {
      scoutList.value.map(async (scout) => {
        if (props.islandId === scout.islandId) {
          await fetch(`http://localhost:8000/userScout/${scout.id}`, {
            method: "DELETE",
          });
        }
      });
    })
    // 削除後のデータを取得するためにリロード
    .then(() => {
      location.reload();
    });
};
</script>

<template>
  <button @click="approveBtn" class="scout__buttons-approveButton">参加</button>
</template>

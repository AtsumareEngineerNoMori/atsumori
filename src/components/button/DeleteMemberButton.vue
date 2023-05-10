<script setup>
import { ref } from "vue";
import "../../css/main.css";

const props = defineProps({
  userId: String,
  islandId: Number,
});
const joinList = ref([]);

// 退会ボタン
const deleteBtn = async () => {
  // joinIslandsからuserIdが等しいデータを取得し、選択したislandIdが一致するデータをidを指定して削除する
  const getJoinIsland = async () => {
    const response = await fetch(
      `http://localhost:8000/joinIslands/?userId=${props.userId}`
    );
    const data = await response.json();
    joinList.value = data;
    console.log(data);
  };
  // 島idと一致するもの消す
  getJoinIsland()
    .then(() => {
      console.log(joinList.value);
      joinList.value.map(async (join) => {
        if (props.islandId === join.islandId) {
          await fetch(`http://localhost:8000/joinIslands/${join.id}`, {
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
  <button class="list__button" @click="deleteBtn">退会</button>
</template>

<script setup>
import { ref, watch } from "vue";
import "../css/main.css";

const props = defineProps({
  userId: String,
  islandId: Number,
});
const joinList = ref([]);
const islandData = ref([]);
// 一旦取ってきているデータからjoinIslandテーブルのidを取得する
const deleteBtn = async () => {
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
    .then(()=>{
      location.reload();
    })
    // .then(() => {
    //   const againJoinIsland = async () => {
    //     const response = await fetch(
    //       `http://localhost:8000/joinIslands/?userId=${3}`
    //     );
    //     const data = await response.json();
    //     joinList.value = data;
    //     console.log(data);
    //   };
    //   againJoinIsland().then(() => {
    //     console.log(joinList.value);
    //     // 上で取得した島idと等しいデータをIslandsテーブルから取得
    //     joinList.value.map(async (island) => {
    //       const response = await fetch(
    //         `http://localhost:8000/Islands/?id=${island.islandId}`
    //       );
    //       const data = await response.json();
    //       islandData.value.push(data);
    //       console.log(data);
    //     });
    //   });
    // });
};

// const emit = defineEmits(['response'])

// emit("response", islandData);
</script>

<template>
  <button class="list__button" @click="deleteBtn">退会</button>
</template>

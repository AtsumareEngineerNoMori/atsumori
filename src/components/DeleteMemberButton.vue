<script setup>
import "../css/main.css";

const props = defineProps({
  userId: String,
  islandId: Number,
})

const deleteBtn = async() => {
  console.log(props.userId,props.islandId)
  await fetch(`http://localhost:8000/joinIslands/?userId=${props.userId}&islandId=${props.islandId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId: 2,
      islandId: 2
    }),
  })
  // .catch((error)=>{
  //   console.log(error)
  // })
  // const response = await fetch(`http://localhost:8000/joinIslands/?userId=${2}&islandId=${2}`, {
  //     method: "DELETE",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     // body: JSON.stringify({

  //     // }),
  //   });
  //   const data = await response.json();
  //   console.log(data);
};
</script>

<template>
  <button class="list__button" @click="deleteBtn">退会</button>
</template>

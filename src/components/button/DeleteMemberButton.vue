<script setup lang="ts">
import { ref } from "vue";
import type { Ref } from "vue";
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
const joinList: Ref<JoinIslands[]> = ref([]);

// 退会ボタン
const deleteBtn: () => Promise<void> = async () => {
  // joinIslandsからuserIdが等しいデータを取得し、選択したislandIdが一致するデータをidを指定して削除する
  const getJoinIsland: () => Promise<void> = async () => {
    const response: Response = await fetch(
      `http://localhost:8000/joinIslands/?userId=${props.userId}`
    );
    const data: JoinIslands[] = await response.json();
    joinList.value = data;
    console.log(data);
  };
  // 島idと一致するもの消す
  getJoinIsland()
    .then(() => {
      console.log(joinList.value);
      joinList.value.map(async (join: JoinIslands) => {
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

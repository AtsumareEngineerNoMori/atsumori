<template>
  <p>名前</p>
  <input type="text" v-model="text" />
  <p>メッセージ</p>
  <input type="text" v-model="message" />
  <button @click="eventUpdate">更新</button>
</template>

<script setup>
import { ref } from "vue";
import { realtimeDB } from "../../../firebase";
import "../../css/main.css";
import {
  ref as dbRef,
  onValue,
  orderByChild,
  query,
  startAt,
  endAt,
  set,
} from "firebase/database";
import { myIdJudge } from "../../userJudge";

const text = ref("");
const message = ref("");

const updateName = async (userId, newName, newIcon) => {
  // userIdが等しいデータ参照先
  const queryRef = query(
    dbRef(realtimeDB, myIdJudge()),
    orderByChild("userId"),
    startAt(userId),
    endAt(userId)
  );

  onValue(queryRef, (snapshot) => {
    if (snapshot.exists()) {
      console.log("存在する");
      // データ参照
      const chatData = snapshot.val();
      // データ1件ずつキーを取得
      Object.keys(chatData).forEach(async (childSnapshot) => {
        // 名前更新
        await set(
          dbRef(realtimeDB, `${myIdJudge()}/${childSnapshot}/name`),
          newName
        );
        // icon更新
        await set(
          dbRef(realtimeDB, `${myIdJudge()}/${childSnapshot}/icon`),
          newIcon
        );
      });
      console.log("更新されました");
      text.value = "";
    } else {
      console.log("存在しない");
    }
  });
};

// クリックイベント
const eventUpdate = () => {
  // ログインユーザーのidを指定する
  const userId = "kF3c2VYBsAYUTOucVyLsNmRK4D43";
  const newName = text.value;
  const newIcon = message.value;
  updateName(userId, newName, newIcon);
};
</script>

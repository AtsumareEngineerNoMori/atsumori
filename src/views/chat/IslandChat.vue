<script setup>
import { onAuthStateChanged } from "firebase/auth";
import { onMounted, onUpdated, ref } from "vue";
import { realtimeDB, auth } from "../../../firebase";
import "../../css/main.css";
import GetDate from "../../components/date/GetDate.vue";
import Loading from "../../components/Loading.vue";
import MyChat from "../../components/chat/MyChat.vue";
import OtherChat from "../../components/chat/OtherChat.vue";
import { useRoute } from "vue-router";
import {
  ref as dbRef,
  push,
  onValue,
  serverTimestamp,
  orderByChild,
  limitToLast,
  query,
  startAt,
  endAt,
} from "firebase/database";
import { myIdJudge } from "../../userJudge";

// ログインユーザーのid
const uid = ref("");
// データ取得判別
const loading = ref(true);
// 島情報保管
const islandData = ref();
// チャット情報保管
const chatList = ref([]);
// 入力内容保持
const message = ref("");
// 全データ数
const allDataLength = ref(0);
// 画面スクロール用
const messageScreen = ref(null);

// 島詳細からislandIdを受け取る
const route = useRoute();
const islandId = route.params.id;

// 初期表示のデータ取得
onMounted(() => {
  onAuthStateChanged(auth, (currentUser) => {
    if (!currentUser) {
      console.log("ログアウト状態");
    } else {
      console.log(`ログイン状態 uid:${currentUser.uid}`);
      uid.value = currentUser.uid;
      getData();
      firstGetAllData();
    }
  });
});

// 島の情報取得
const getData = () => {
  const getIsland = async () => {
    const response = await fetch(
      `http://localhost:8000/islands/?id=${islandId}`
    );
    const data = await response.json();
    islandData.value = data;
    console.log(data);
  };
  getIsland()
    .then(() => {
      // realtimeDBから島idと等しいデータを取得
      const q = query(
        dbRef(realtimeDB, myIdJudge()),
        orderByChild("islandId"),
        limitToLast(10),
        startAt(islandId),
        endAt(islandId)
      );
      onValue(q, (snapshot) => {
        chatList.value = snapshot.val();
      });
      loading.value = false;
    })
};

// 全件取得
const getAllData = () => {
  const q = query(
    dbRef(realtimeDB, myIdJudge()),
    orderByChild("islandId"),
    startAt(islandId),
    endAt(islandId)
  );
  onValue(q, (snapshot) => {
    const data = snapshot.val();
    console.log(data);
    chatList.value = data;
    allDataLength.value = Object.keys(data).length;
    console.log(allDataLength.value);
  });
};
// 初回表示用にデータ全件取得
const firstGetAllData = () => {
  const q = query(
    dbRef(realtimeDB, myIdJudge()),
    orderByChild("islandId"),
    startAt(islandId),
    endAt(islandId)
  );
  onValue(q, (snapshot) => {
    const data = snapshot.val();
    console.log(data);
    if (data !== null) {
      allDataLength.value = Object.keys(data).length;
      console.log(allDataLength.value);
    }
  });
};

// firebaseリアルタイムデータベース追加
const chatRef = dbRef(realtimeDB, myIdJudge());
// 送信
const submit = async () => {
  if (message.value.length > 120) {
    alert("120文字以内で入力してください");
  } else {
    // ログインユーザーの情報取得
    const response = await fetch(
      `http://localhost:8000/users/?id=${uid.value}`
    );
    const userData = await response.json();
    // realtimeDBに追加
    const newData = push(chatRef, {
      userId: uid.value,
      name: userData[0].name,
      icon: userData[0].icon,
      islandId: islandId,
      createDate: serverTimestamp(),
      message: message.value,
    });
    console.log("追加");
    console.log(newData.key);
    message.value = "";
  }
};

const loadMore = () => {
  getAllData();
};

// 最新メッセージへ自動スクロール(DOM更新後に呼び出される)
onUpdated(() => {
  // messageScreen.value.scrollTop = messageScreen.value.scrollHeight;
  if (chatList.value !== null) {
    // messageScreen.value.scrollTop = 800;
    messageScreen.value.scrollTop = 1000;
  }
});
</script>

<template>
  <div v-if="loading" class="list">
    <Loading />
  </div>
  <div class="chat" v-else>
    <section class="chat__header">
      <img :src="islandData[0].icon" alt="icon" class="chat__icon" />
      <p class="chat__name">{{ islandData[0].islandName }}</p>
    </section>
    <section v-if="chatList === null" class="chat__messageWrapper">
      <p class="chat__messageWrapper-noDataTitle">メッセージがありません</p>
    </section>
    <section class="chat__messageWrapper" ref="messageScreen" v-else>
      <template v-if="Object.keys(chatList).length !== allDataLength">
        <div class="chat__messageWrapper-loadMore">
          <button @click="loadMore" class="chat__messageWrapper-loadMoreBtn">
            さらに読み込む
          </button>
        </div>
      </template>
      <div v-for="chat in chatList" :key="chat">
        <!-- 自分のメッセージか判別する -->
        <div v-if="chat.userId === uid" class="chat__messageWrapper-myMessage">
          <MyChat :chat="chat" />
        </div>

        <div v-else class="chat__messageWrapper-otherMessage">
          <OtherChat :chat="chat" />
        </div>
        <template v-if="chat.userId !== '1234567890'">
          <!-- <GetDate
            :createDate="chat.createDate"
            :chatList="chatList"
            :id="chat.id"
            :chat="chat"
          /> -->
        </template>
      </div>
    </section>
    <!-- <form @submit.prevent="submit2"> -->
    <textarea
      name=""
      id=""
      placeholder="入力してください"
      class="chat__textarea"
      v-model="message"
    ></textarea>
    <button class="chat__submitBtn" @click="submit">送信</button>
    <!-- </form> -->
  </div>
</template>

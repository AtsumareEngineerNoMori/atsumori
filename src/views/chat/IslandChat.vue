<script setup lang="ts">
import { onMounted, onUpdated, ref } from "vue";
import type { Ref } from "vue";
import { realtimeDB } from "../../../firebase";
import "../../css/main.css";
// import GetDate from "@/components/date/GetDate.vue";
import Loading from "../../components/Loading.vue";
import MyChat from "@/components/chat/MyChat.vue";
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

interface Islands {
  id: number,
  icon: string,
  islandName: string,
  islandDescription: string,
  adminId: string,
  createDate: Date
}
interface ChatData {
  createDate: number,
  icon: string,
  islandId: number,
  message: string,
  userId: string,
  name: string,
}

// ログインユーザーのid
const uid:Ref<string> = ref("");
// データ取得判別
const loading:Ref<boolean> = ref(true);
// 島情報保管
const islandData:Ref<Islands[]> = ref([]);
// チャット情報保管
const chatList:Ref<ChatData[]> = ref([]);
// 入力内容保持
const message:Ref<string> = ref("");
// 全データ数
const allDataLength:Ref<number> = ref(0);
// 画面スクロール用
const messageScreen:Ref<any> = ref(null);

// 島詳細からislandIdを受け取る
const route = useRoute();
const islandId:string | string[] = route.params.id;

// 初期表示のデータ取得
onMounted(() => {
  const currentUserId = $cookies.get("myId");
  uid.value = currentUserId;
  if (!uid.value) {
    console.log("ログアウト状態");
  } else {
    console.log(`ログイン状態 uid:${uid.value}`);
    getData();
    firstGetAllData();
  }
});

// 初期データの取得
const getData = () => {
  // 島の情報取得
  const getIsland = async () => {
    const response = await fetch(
      `http://localhost:8000/islands/?id=${islandId}`
    );
    const data = await response.json();
    islandData.value.push(...data);
  };
  getIsland().then(() => {
    // realtimeDBから島idと等しいデータを取得
    const q = query(
      dbRef(realtimeDB, myIdJudge()),
      orderByChild("islandId"),
      limitToLast(10),
      startAt(String(islandId)),
      endAt(String(islandId))
    );
    onValue(q, (snapshot) => {
      chatList.value = snapshot.val();
    });
    loading.value = false;
  });
};

// 全件取得参照先
const q = query(
  dbRef(realtimeDB, myIdJudge()),
  orderByChild("islandId"),
  startAt(String(islandId)),
  endAt(String(islandId))
);

// 全件取得
const getAllData = () => {
  onValue(q, (snapshot) => {
    const data = snapshot.val();
    chatList.value = data;
    allDataLength.value = Object.keys(data).length;
    console.log(allDataLength.value);
  });
};
// 初回表示用にデータ全件取得
const firstGetAllData = () => {
  onValue(q, (snapshot) => {
    const data = snapshot.val();
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
  if (message.value.length > 120 || message.value.length === 0) {
    alert("1文字以上120文字以内で入力してください");
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
      <RouterLink
        v-bind:to="{ name: 'islandShow', params: { id: islandData[0].id } }"
        class="chat__icon"
      >
        <img :src="islandData[0].icon" alt="icon" class="chat__icon-img" />
      </RouterLink>
      <RouterLink
        v-bind:to="{ name: 'islandShow', params: { id: islandData[0].id } }"
      >
        <p class="chat__name">{{ islandData[0].islandName }}</p>
      </RouterLink>
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
      <div v-for="chat in chatList">
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
    <textarea
      name=""
      id=""
      placeholder="入力してください"
      class="chat__textarea"
      v-model="message"
    ></textarea>
    <button class="chat__submitBtn" @click="submit">送信</button>
  </div>
</template>

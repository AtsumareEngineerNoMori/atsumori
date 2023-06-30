<script setup lang="ts">
import { onMounted, onUpdated, ref } from "vue";
import type { Ref } from "vue";
import { useRoute } from "vue-router";
import { realtimeDB } from "../../firebase";
import "../../css/main.css";
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
import type {
  Query,
  DataSnapshot,
  DatabaseReference,
  ThenableReference,
} from "firebase/database";
import Loading from "../../components/Loading.vue";
import MyChat from "../../components/chat/MyChat.vue";
import OtherChat from "../../components/chat/OtherChat.vue";
import { myIdJudge } from "../../userJudge";
import { app } from "../../main";
import { getIdData } from "../../getData";

interface Projects {
  id: number;
  icon: string;
  projectName: string;
  projectDescription: string;
  adminId: number;
  createDate: Date;
}
interface ChatData {
  createDate: number;
  icon: string;
  projectId: number;
  message: string;
  userId: string;
  name: string;
}

// プロジェクト詳細からprojectIdを受け取る
const route = useRoute();
const projectId: number = Number(route.params.id);

// ログインユーザーのid
const uid: Ref<string> = ref("");
// データ取得判別
const loading: Ref<boolean> = ref(true);
// プロジェクト情報保管
const projectData: Ref<Projects[]> = ref([]);
// チャット情報保管
const chatList: Ref<ChatData[]> = ref([]);
// 全データの数
const allDataLength: Ref<number> = ref(0);
// 入力内容保持
const message: Ref<string> = ref("");
// 画面スクロール用
const messageScreen: Ref<any> = ref(null);

onMounted(() => {
  const currentUserId: string = app.$cookies.get("myId");
  uid.value = currentUserId;
  if (!uid.value) {
    console.log("ログアウト状態");
  } else {
    console.log("ログイン状態");
    getData();
    firstGetAllData();
  }
});

// 初期表示のデータ取得
const getData: () => void = () => {
  // プロジェクト情報取得
  getIdData("getProjects", projectId)
    .then((res) => {
      console.log(res);
      projectData.value.push(res);
    })
    .then(() => {
      // realtimeDBからprojectIdと等しいデータを最大10件取得
      const q: Query = query(
        dbRef(realtimeDB, myIdJudge()),
        orderByChild("projectId"),
        limitToLast(10),
        startAt(String(projectId)),
        endAt(String(projectId))
      );
      // 取得したデータをchatListに保管
      onValue(q, (snapshot: DataSnapshot) => {
        chatList.value = snapshot.val();
      });
      loading.value = false;
    });
};

// 全件取得参照先
const allQuery: Query = query(
  dbRef(realtimeDB, myIdJudge()),
  orderByChild("projectId"),
  startAt(String(projectId)),
  endAt(String(projectId))
);

//全件データと件数取得
const getAllData: () => void = () => {
  onValue(allQuery, (snapshot: DataSnapshot) => {
    const data: ChatData[] = snapshot.val();
    chatList.value = data;
    allDataLength.value = Object.keys(data).length;
    console.log(allDataLength.value);
  });
};

// 初回表示用に全件の件数取得
const firstGetAllData: () => void = () => {
  onValue(allQuery, (snapshot: DataSnapshot) => {
    const data: ChatData = snapshot.val();
    if (data !== null) {
      allDataLength.value = Object.keys(data).length;
    }
  });
};

// リアルタイムデータベース参照
const chatRef: DatabaseReference = dbRef(realtimeDB, myIdJudge());

// realtimeDBに追加
const submit: () => Promise<void> = async () => {
  if (message.value.length > 120 || message.value.length === 0) {
    alert("1文字以上120文字以内で入力してください");
  } else {
    // ログインユーザーの情報取得
    const response: Response = await fetch(
      `http://localhost:8000/users/?id=${uid.value}`
    );
    const userData = await response.json();

    getIdData("getUsers", uid.value).then((res) => {
      console.log(res);
      const userData = res;

      // realtimeDBに追加
      const newData: ThenableReference = push(chatRef, {
        userId: uid.value,
        name: userData.name,
        icon: userData.icon,
        projectId: projectId,
        createDate: serverTimestamp(),
        message: message.value,
      });
      console.log("追加");
      console.log(newData.key);
      // 空の状態に戻す
      message.value = "";
    });
  }
};

// さらに読み込むボタン
const loadMore: () => void = () => {
  getAllData();
};

// 最新メッセージへ自動スクロール(DOM更新後に呼び出される)
onUpdated(() => {
  if (chatList.value !== null) {
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
        v-bind:to="{ name: 'projectShow', params: { id: projectData[0].id } }"
        class="chat__icon"
      >
        <img :src="projectData[0].icon" alt="icon" class="chat__icon-img" />
      </RouterLink>
      <RouterLink
        v-bind:to="{ name: 'projectShow', params: { id: projectData[0].id } }"
      >
        <p class="chat__name">{{ projectData[0].projectName }}</p>
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
      <div v-for="chat in chatList" :key="chat.userId">
        <div v-if="chat.userId === uid" class="chat__messageWrapper-myMessage">
          <MyChat :chat="chat" />
        </div>

        <div v-else class="chat__messageWrapper-otherMessage">
          <OtherChat :chat="chat" />
        </div>
        <template v-if="chat.userId !== '1234567890'">
          <!-- <GetDate
            :createDate="chat.createDate"
            :displayList="realList"
            :id="chat.id"
            :chat="chat"
          /> -->
        </template>
      </div>
    </section>
    <textarea
      name="messageText"
      id="messageText"
      placeholder="入力してください"
      class="chat__textarea"
      v-model="message"
    ></textarea>
    <button class="chat__submitBtn" @click="submit">送信</button>
  </div>
</template>

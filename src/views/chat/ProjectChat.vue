<script setup>
import { onAuthStateChanged } from "firebase/auth";
import { onMounted, onUpdated, ref } from "vue";
import { useRoute } from "vue-router";
import { realtimeDB, auth } from "../../../firebase";
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
  remove,
  get
} from "firebase/database";
import Loading from "../../components/Loading.vue";
import MyChat from "../../components/chat/MyChat.vue";
import OtherChat from "../../components/chat/OtherChat.vue";

// プロジェクト詳細からprojectIdを受け取る
const route = useRoute();
const projectId = route.params.id;

// ログインユーザーのid
const uid = ref("");
// データ取得判別
const loading = ref(true);
// プロジェクト情報保管
const projectData = ref();
// チャット情報保管
const realList = ref([]);
// 全データの数
const allDataLength = ref(0);
// 入力内容保持
const message = ref("");
// 画面スクロール用
const messageScreen = ref(null);

onMounted(() => {
  onAuthStateChanged(auth, (currentUser) => {
    if (!currentUser) {
      console.log("ログアウト状態");
    } else {
      console.log(`ログイン状態${currentUser.uid}`);
      uid.value = currentUser.uid;
      getData();
      firstGetAllData();
    }
  });
});

// 初期表示のデータ取得
const getData = () => {
  // プロジェクト情報取得
  const getProject = async () => {
    const response = await fetch(
      `http://localhost:8000/projects/?id=${projectId}`
    );
    const data = await response.json();
    projectData.value = data;
    console.log(data);
  };
  getProject().then(() => {
    const q = query(
      dbRef(realtimeDB, "chat"),
      orderByChild("projectId"),
      limitToLast(10),
      startAt(projectId),
      endAt(projectId)
    );
    // const dataArray = [];
    onValue(q, (snapshot) => {
      // const data = snapshot.val();
      realList.value = snapshot.val();
      // dataArray.push(data);
      // console.log(dataArray);
      console.log(realList.value)
    });
    loading.value = false;
  });
};

// チャットデータ全件取得
const getAllData = () => {
  const q = query(
    dbRef(realtimeDB, "chat"),
    orderByChild("projectId"),
    startAt(projectId),
    endAt(projectId)
  );
  onValue(q, (snapshot) => {
    const data = snapshot.val();
    console.log(data);
    realList.value = data;
    allDataLength.value = Object.keys(data).length;
    console.log(allDataLength.value);
  });
};

// 初回表示用にデータ全件取得
const firstGetAllData = () => {
  const q = query(
    dbRef(realtimeDB, "chat"),
    orderByChild("projectId"),
    startAt(projectId),
    endAt(projectId)
  );
  onValue(q, (snapshot) => {
    const data = snapshot.val();
    console.log(data);
    if(data !== null){
    allDataLength.value = Object.keys(data).length;
    console.log(allDataLength.value);
    }
  });
};

// リアルタイムデータベース参照
const chatRef = dbRef(realtimeDB, "chat");

// 追加
const submit = async () => {
  // ログインユーザーの情報取得
  const response = await fetch(`http://localhost:8000/users/?id=${uid.value}`);
  const userData = await response.json();
  console.log(userData);

  // realtimeDBに追加
  const newData = push(chatRef, {
    userId: uid.value,
    name: userData[0].name,
    icon: userData[0].icon,
    projectId: projectId,
    createDate: serverTimestamp(),
    message: message.value,
  });
  console.log("追加");
  console.log(newData.key);
  // 空の状態に戻す
  message.value = "";
};

// さらに読み込むボタン
const loadMore = () => {
  getAllData();
};

// 最新メッセージへ自動スクロール(DOM更新後に呼び出される)
onUpdated(() => {
  if(realList.value !== null){
  messageScreen.value.scrollTop = 800;
  }
});

const deleteBtn = () => {
  const q = query(
    dbRef(realtimeDB, "chat"),
    orderByChild("projectId"),
    startAt(projectId),
    endAt(projectId)
  );
  get(q).then((snapshot)=>{
snapshot.forEach((a)=>{
  remove(a.ref);
})
  })
}
</script>

<template>
  <div v-if="loading" class="list">
    <Loading />
  </div>
  <div class="chat" v-else>
    <section class="chat__header">
      <img :src="projectData[0].icon" alt="icon" class="chat__icon" />
      <p class="chat__name">{{ projectData[0].projectName }}</p>
    </section>
    <section v-if="realList === null" class="chat__messageWrapper">
      <p class="chat__messageWrapper-noDataTitle">メッセージがありません</p>
    </section>
    <section class="chat__messageWrapper" ref="messageScreen" v-else>
      <template v-if="Object.keys(realList).length !== allDataLength">
        <div class="chat__messageWrapper-loadMore">
          <button @click="loadMore" class="chat__messageWrapper-loadMoreBtn">
            さらに読み込む
          </button>
        </div>
      </template>
      <div v-for="chat in realList" :key="chat">
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
      name=""
      id=""
      placeholder="入力してください"
      class="chat__textarea"
      v-model="message"
    ></textarea>
    <button class="chat__submitBtn" @click="submit">送信</button>
    <button @click="deleteBtn">削除</button>
  </div>
</template>

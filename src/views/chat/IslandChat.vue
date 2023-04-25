<script setup>
import { onAuthStateChanged } from "firebase/auth";
import { computed, onMounted, ref, watch } from "vue";
import { auth } from "../../../firebase";
import "../../css/main.css";
import GetDate from "../../components/date/GetDate.vue";
import GetTime from "../../components/date/GetTime.vue";
import Loading from "../../components/Loading.vue";

// 島詳細からislandIdを受け取る

const uid = ref("");
const loading = ref(true);
// 島情報保管
const islandData = ref();
// チャット情報保管
const chatList = ref([]);
// ユーザー情報保管
const displayList = ref([]);
// 入力内容保持
const message = ref("");
// ボタン状態管理
const submitToggle = ref(false);

// 島の情報取得
const getData = () => {
  const getIsland = async () => {
    const response = await fetch(`http://localhost:8000/islands/?id=${2}`);
    const data = await response.json();
    islandData.value = data;
  };
  getIsland()
    .then(async () => {
      console.log(islandData.value);
      // islandChatからislandIdと等しいデータを取得(日付順で最新から10件)
      const response = await fetch(
        `http://localhost:8000/islandChat/?islandId=${2}&_limit=10&_sort=createDate&_order=desc`
      );
      const data = await response.json();
      chatList.value = data;
    })
    .then(() => {
      // 上で取得したデータのuserIdと等しいデータをusersから取得
      if (chatList.value.length > 0) {
        chatList.value.map(async (chat) => {
          const response = await fetch(
            `http://localhost:8000/users/?id=${chat.userId}`
          );
          const userData = await response.json();
          // chatテーブルとusersテーブルの情報を結合
          const joinObj = Object.assign(chat, userData);
          displayList.value.push(joinObj);
          // 1番下に最新のメッセージが来るように並び替え
          displayList.value.sort((a, b) => {
            return new Date(a.createDate) > new Date(b.createDate) ? 1 : -1;
          });
          // データ取得終了時に反転させる
          loading.value = false;
        });
      } else {
        console.log("データがありません");
        loading.value = false;
      }
      console.log(displayList.value);
    });
};

// 送信ボタン
const submit = async () => {
  if (message.value.length > 120) {
    alert("120文字以内で入力してください");
  } else {
    const response = await fetch("http://localhost:8000/islandChat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: uid.value,
        islandId: 2,
        createDate: new Date(),
        message: message.value,
      }),
    });
    const messageData = await response.json();
    console.log(messageData);
    // 送信後に入力欄を空に戻す
    message.value = "";
  }
};

// 初期表示のデータ取得
onMounted(() => {
  onAuthStateChanged(auth, (currentUser) => {
    if (!currentUser) {
      console.log("ログアウト状態");
    } else {
      console.log(`ログイン状態 uid:${currentUser.uid}`);
      uid.value = currentUser.uid;
      getData();
    }
  });
});

// 送信ボタン
const submitBtn = () => {
  submitToggle.value = !submitToggle.value;
  console.log(submitToggle.value);
};

//送信ボタンが押されたら走る処理
watch(submitToggle, () => {
  if (submitToggle.value) {
    submit().then(() => getData());
  } else {
    submit().then(() => getData());
  }
});

// 10件以上前のデータを取得(さらに10件ごと)
const loadMore = () => {};

// チャットの初期表示位置を1番下にする
// let messageArea = document.getElementById("messageContents");

// chatAreaHeight = messageArea.scrollHeight;
// messageArea.scrollTop = chatAreaHeight;
</script>

<!-- iconと名前からユーザーのマイページにリンク飛ばす -->
<template>
  <div v-if="loading" class="list">
    <Loading />
  </div>
  <div class="chat" v-else>
    <section class="chat__header">
      <img :src="islandData[0].icon" alt="icon" class="chat__icon" />
      <p class="chat__name">{{ islandData[0].islandName }}</p>
    </section>
    <section v-if="displayList.length <= 0" class="chat__messageWrapper">
      <p class="chat__messageWrapper-noDataTitle">メッセージがありません</p>
    </section>
    <section id="messageContents" class="chat__messageWrapper" v-else>
      <div v-for="chat in displayList" :key="chat">
        <!-- <div v-if="dateTitle">日付</div> -->
        <!-- <GetDate :createDate="chat.createDate" :displayList = displayList /> -->
        <!-- 自分のメッセージか判別する -->
        <div v-if="chat.userId === uid" class="chat__messageWrapper-myMessage">
          <img
            :src="chat[0].icon"
            alt="userIcon"
            class="chat__messageWrapper-userIcon"
          />
          <div>
            <p class="chat__messageWrapper-myMessage-userName">
              {{ chat[0].name }}
            </p>
            <div class="chat__messageWrapper-myMessage-comDate">
              <div class="chat__messageWrapper-myComment">
                <p class="chat__messageWrapper-myComment-text">
                  {{ chat.message }}
                </p>
              </div>
              <GetTime :createDate="chat.createDate" />
              <!-- <p>{{ chat.createDate }}</p> -->
            </div>
          </div>
        </div>

        <div v-else class="chat__messageWrapper-otherMessage">
          <img
            :src="chat[0].icon"
            alt="userIcon"
            class="chat__messageWrapper-userIcon"
          />
          <div>
            <p class="chat__messageWrapper-otherMessage-userName">
              {{ chat[0].name }}
            </p>
            <div class="chat__messageWrapper-otherMessage-comDate">
              <div class="chat__messageWrapper-otherComment">
                <p class="chat__messageWrapper-otherComment-text">
                  {{ chat.message }}
                </p>
              </div>
              <GetTime :createDate="chat.createDate" />
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- <form @submit.prevent="submit"> -->
    <textarea
      name=""
      id=""
      placeholder="入力してください"
      class="chat__textarea"
      v-model="message"
    ></textarea>
    <button class="chat__submitBtn" @click="submitBtn">送信</button>
    <!-- </form> -->
  </div>
</template>

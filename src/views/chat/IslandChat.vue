<script setup>
import { onAuthStateChanged } from "firebase/auth";
import { computed, onMounted, onUpdated, ref, watch } from "vue";
import { auth } from "../../../firebase";
import "../../css/main.css";
import GetDate from "../../components/date/GetDate.vue";
import GetTime from "../../components/date/GetTime.vue";
import Loading from "../../components/Loading.vue";
import MyChat from "../../components/chat/MyChat.vue";
import OtherChat from "../../components/chat/OtherChat.vue";
import { useRoute } from "vue-router";

// 島詳細からislandIdを受け取る
const route = useRoute();
// const islandId = route.params.id;
// console.log(islandId);

// ログインユーザーのid
const uid = ref("");
// データ取得判別
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
// さらに読み込んだchatテーブルから取得したデータを保管
const moreChatList = ref([]);
// trueだったら表示(ダミーデータが存在していなかったら表示)
const loadDisplay = ref(false);
// 日付比較(trueだったら表示する)
const compareDate = ref(false);

// 島の情報取得
const getData = () => {
  const getIsland = async () => {
    const response = await fetch(`http://localhost:8000/islands/?id=${7}`);
    const data = await response.json();
    islandData.value = data;
    console.log(data);
  };
  getIsland()
    .then(async () => {
      console.log(islandData.value);
      // islandChatからislandIdと等しいデータを取得(日付順で最新から10件)
      const response = await fetch(
        `http://localhost:8000/islandChat/?islandId=${7}&_limit=10&_sort=createDate&_order=desc`
      );
      const data = await response.json();
      chatList.value = data;
      console.log(data);
      // 見つからない場合は-1を返す(ボタンを表示する)
      if (
        chatList.value.findIndex((chat) => chat.userId === "1234567890") === -1
      ) {
        loadDisplay.value = true;
      } else {
        loadDisplay.value = false;
      }
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
          console.log(displayList.value);
          // データ取得終了時に反転させる
          loading.value = false;
        });
      } else {
        console.log("データがありません");
        loading.value = false;
      }
      console.log(chatList.value);
      console.log(displayList.value);
    });
};

// チャット追加
const submit = async () => {
  // 最初の投稿の場合
  if (chatList.value.length === 0) {
    console.log("データがない場合");
    // ダミー追加
    const response = await fetch("http://localhost:8000/islandChat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: "1234567890",
        islandId: 7,
        createDate: new Date(),
        message: "0",
      }),
    });
    const firstData = await response.json().then(async () => {
      // 最初のメッセージ追加
      const response = await fetch("http://localhost:8000/islandChat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: uid.value,
          islandId: 7,
          createDate: new Date(),
          message: message.value,
        }),
      });
      const messageData = await response.json();
      console.log(messageData);

      // 送信後に入力欄を空に戻す
      message.value = "";
    });
  } else {
    // 2回目以降の投稿
    console.log("データがある場合");
    const response = await fetch("http://localhost:8000/islandChat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: uid.value,
        islandId: 7,
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
  if (message.value.length > 120) {
    alert("120文字以内で入力してください");
  } else {
    // 追加関数呼び出し
    submit()
      .then(async () => {
        console.log(chatList.value.length);
        // 初回のみidが新しいデータを取得する
        if (chatList.value.length === 0) {
          console.log("初回");
          // const firstResponse = await fetch(
          //   `http://localhost:8000/islandChat/?islandId=${7}&_limit=1&_sort=id&_order=desc`
          // );
          // const data = await firstResponse.json();
          // chatList.value = data;
          location.reload();
        } else {
          console.log("2回目以降");
          // 最新のデータ1件取得
          const response = await fetch(
            `http://localhost:8000/islandChat/?islandId=${7}&_limit=1&_sort=createDate&_order=desc`
          );
          const data = await response.json();
          chatList.value = data;
        }
      })
      .then(() => {
        console.log(chatList.value);
        // 上で取得したデータのuserIdと等しいデータをusersから取得
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
          console.log(displayList.value);
        });
      });
  }
};

// 10件以上前のデータを取得(さらに10件ごと)
const loadMore = () => {
  // displayListの一番古いデータ(下に行くほど新しいから配列の[0]が常に1番古い)のidから新しい順で10件さらに取得する
  const getMoreChat = async () => {
    const response = await fetch(
      `http://localhost:8000/islandChat/?islandId=${7}&_sort=createDate&_order=desc&_limit=10&id_lte=${
        displayList.value[0].id - 1
      }`
    );
    const data = await response.json();
    console.log(data);
    moreChatList.value = data;
    // 見つからない場合は-1を返す(ボタンを表示する)
    if (
      moreChatList.value.findIndex((chat) => chat.userId === "1234567890") ===
      -1
    ) {
      loadDisplay.value = true;
    } else {
      loadDisplay.value = false;
    }
  };
  getMoreChat().then(() => {
    // 上で取得したデータのuserIdと等しいデータをusersから取得
    moreChatList.value.map(async (moreChat) => {
      const response = await fetch(
        `http://localhost:8000/users/?id=${moreChat.userId}`
      );
      const userData = await response.json();
      // chatテーブルとusersテーブルの情報を結合
      const joinObj = Object.assign(moreChat, userData);
      // 元から表示しているデータの前に追加する
      displayList.value.unshift(joinObj);
      // 1番下に最新のメッセージが来るように並び替え
      displayList.value.sort((a, b) => {
        return new Date(a.createDate) > new Date(b.createDate) ? 1 : -1;
      });
    });
  });
  loading.value = false;
};

// 最新メッセージへ自動スクロール(DOM更新後に呼び出される)
const messageScreen = ref(null);
onUpdated(() => {
  // messageScreen.value.scrollTop = messageScreen.value.scrollHeight;
  messageScreen.value.scrollTop = 800;
});
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
    <section class="chat__messageWrapper" ref="messageScreen" v-else>
      <!-- <section v-if="moreChatList.length !== 0">
        <div v-for="moreChat in displayMoreList" :key="moreChat">
          <div
            v-if="moreChat.userId === uid"
            class="chat__messageWrapper-myMessage"
          >
            <MyChat :chat="moreChat" />
          </div>
          <div v-else class="chat__messageWrapper-otherMessage">
            <OtherChat :chat="moreChat" />
          </div>
        </div>
      </section> -->
      <template v-if="loadDisplay">
        <div class="chat__messageWrapper-loadMore">
          <button @click="loadMore" class="chat__messageWrapper-loadMoreBtn">
            さらに読み込む
          </button>
        </div>
      </template>
      <div v-for="chat in displayList" :key="chat">
        <!-- <template v-if="chat.userId !== '1234567890'">
          <GetDate
            :createDate="chat.createDate"
            :displayList="displayList"
            :id="chat.id"
          />
        </template> -->
        <!-- <div v-if="dateTitle">日付</div> -->
        <!-- <GetDate :createDate="chat.createDate" :displayList = displayList /> -->
        <!-- 自分のメッセージか判別する -->

        <div v-if="chat.userId === uid" class="chat__messageWrapper-myMessage">
          <MyChat :chat="chat" />
          <!-- <img
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
            </div>
          </div> -->
        </div>

        <div v-else class="chat__messageWrapper-otherMessage">
          <OtherChat :chat="chat" />
          <!-- <img
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
          </div> -->
        </div>
        <template v-if="chat.userId !== '1234567890'">
          <GetDate
            :createDate="chat.createDate"
            :displayList="displayList"
            :id="chat.id"
          />
        </template>
      </div>
    </section>
    <form @submit.prevent="submitBtn">
      <textarea
        name=""
        id=""
        placeholder="入力してください"
        class="chat__textarea"
        v-model="message"
      ></textarea>
      <button class="chat__submitBtn">送信</button>
    </form>
  </div>
</template>

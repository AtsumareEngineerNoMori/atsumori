<script setup>
import "../../css/main.css";

//チャットテーブルとユーザーテーブルを結合して、島詳細から島idを受け取り、等しいデータだけ取得する
const array = [
  {
    id: 1,
    userId: "12345678901234567890abcdefgh",
    userIcon:
      "https://2.bp.blogspot.com/-uoj7bbsM5AA/WBsA4BSa9mI/AAAAAAAA_XM/-Z7iyv23qpox9VgA0Drt354rqun61oSHgCLcB/s200/simple_leaf8.png",
    name: "たぬきち",
    islandId: 1,
    createDate: "2023-04-18 09:00:00",
    message: "みなさん",
  },
  {
    id: 2,
    userId: "12345678901234567890abcdefgh",
    userIcon:
      "https://2.bp.blogspot.com/-uoj7bbsM5AA/WBsA4BSa9mI/AAAAAAAA_XM/-Z7iyv23qpox9VgA0Drt354rqun61oSHgCLcB/s200/simple_leaf8.png",
    name: "たぬきち",
    islandId: 1,
    createDate: "2023-04-18 09:00:00",
    message: "こんにちは",
  },
  {
    id: 3,
    userId: "abcdefgh12345678901234567890",
    userIcon:
      "https://4.bp.blogspot.com/-aWjtPlLB9e4/UNbZ5m-vJoI/AAAAAAAAJNo/P_-MhOOzf8g/s110/12_8bu_onpu_renkou.png",
    name: "しずえ",
    islandId: 1,
    createDate: "2023-04-18 09:10:00",
    message: "こんにちは",
  },
  {
    id: 4,
    userId: "abcdefgh12345678900987654321",
    userIcon:
      "https://3.bp.blogspot.com/--Gw4b3xIKS8/VGX8kG1tUGI/AAAAAAAApI4/KP8H_HNBm_8/s400/kai_hotate.png",
    name: "ラコスケ",
    islandId: 1,
    createDate: "2023-04-18 09:15:00",
    message: "こんにちは",
  },
  {
    id: 5,
    userId: "1234567890abcdefgh1234567890",
    userIcon:
      "https://3.bp.blogspot.com/-Gzz-_2Qf5Ec/WEOPUqh4raI/AAAAAAABALU/G1mms737TJEXAsPIURsdlbNmU7EGTb-4QCLcB/s400/kaseki_kyoryu2.png",
    name: "フータ",
    islandId: 1,
    createDate: "2023-04-18 09:20:00",
    message: "こんにちは",
  },
  {
    id: 6,
    userId: "12345678901234567890abcdefgh",
    userIcon:
      "https://2.bp.blogspot.com/-uoj7bbsM5AA/WBsA4BSa9mI/AAAAAAAA_XM/-Z7iyv23qpox9VgA0Drt354rqun61oSHgCLcB/s200/simple_leaf8.png",
    name: "たぬきち",
    islandId: 1,
    createDate: "2023-04-18 09:00:00",
    message: "何かボクに相談だなも？なんでも気軽に聞いてちょうだい！",
  },
];

// 島の情報も別で取得する
const islandList = {
  id: 1,
  icon: "https://1.bp.blogspot.com/-4Ng1gNmOhAM/V2ucIdYoIAI/AAAAAAAA7vs/trvOgTP7V30aBo8mAV-d5xlcTyaQHCq3gCLcB/s800/mujintou_kojima.png",
  islandName: "島",
};
</script>

<!-- iconと名前からユーザーのマイページにリンク飛ばす -->
<template>
  <div class="chat">
    <div class="chat__header">
      <img :src="islandList.icon" alt="icon" class="chat__icon" />
      <p class="chat__name">{{ islandList.islandName }}</p>
    </div>
    <section class="chat__messageWrapper">
      <div v-for="chat in array" :key="chat">
        <div
          v-if="chat.userId === '12345678901234567890abcdefgh'"
          class="chat__messageWrapper-myMessage"
        >
          <img
            :src="chat.userIcon"
            alt="userIcon"
            class="chat__messageWrapper-userIcon"
          />
          <div>
            <p class="chat__messageWrapper-myMessage-userName">
              {{ chat.name }}
            </p>
            <div class="chat__messageWrapper-myComment">
              <p class="chat__messageWrapper-myComment-text">
                {{ chat.message }}
              </p>
            </div>
          </div>
        </div>
        <div v-else class="chat__messageWrapper-otherMessage">
          <img
            :src="chat.userIcon"
            alt="userIcon"
            class="chat__messageWrapper-userIcon"
          />
          <div>
            <p class="chat__messageWrapper-otherMessage-userName">
              {{ chat.name }}
            </p>
            <div class="chat__messageWrapper-otherComment">
              <p class="chat__messageWrapper-otherComment-text">
                {{ chat.message }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <textarea
      name=""
      id=""
      placeholder="入力してください"
      class="chat__textarea"
    ></textarea>
    <button class="chat__submitBtn">送信</button>
  </div>
</template>

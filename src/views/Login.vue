<template>
  <div class="loginPage">
    <div class="loginPage-logo">
      <img src="../../public/atsumori.png" />
    </div>

    <div class="loginPage-text">
      <form @submit.prevent="loginButton">
        <div>
          <input type="email" placeholder="メールアドレスを入力してください" class="loginPage-email" v-model="user.email" autocomplete="email" />
        </div>
        <div>
          <input type="password" placeholder="パスワードを入力してください" class="loginPage-password" v-model="user.password" autocomplete="current-password" />
        </div>
        <p class="alart" v-if="input">メールアドレスまたはパスワードが間違っています</p>
        <div>
          <button type="submit" class="loginPage-button">ログイン</button>
        </div>
      </form>
      <RouterLink to="/userRegister">
        <div class="loginPage-register-margin"><span class="loginPage-register">アカウントを登録しよう！</span></div>
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import "../css/main.css";
import { useRouter } from "vue-router";
import { reactive,onMounted,ref } from "vue";
import { signInWithEmailAndPassword} from "@firebase/auth";
import {  auth } from "../firebase";
import {
  onAuthStateChanged,
} from "@firebase/auth";
import {app} from "../main"

interface User {
  uid: string;
}

const router = useRouter();
const user = reactive({ email: "", password: "" });
const input = ref(false)

// cookieに登録
const setCookie = (myId: string) => {
  app.$cookies.set('myId', myId);
};

// ログイン状態の場合の処理
onMounted(() => {
  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      router.push("/top");
    } else {
    {}
    }
  });
});

const loginButton = async () => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, user.email, user.password);
    const currentUser: User | null = userCredential.user;
    if (currentUser) {
      setCookie(currentUser.uid);
      router.push("/top");
      console.log("ログインできました");
    } else {
      console.log("ユーザーが存在しません");
    }
  } catch (error) {
    input.value = true;
    console.log("メールアドレスまたはパスワードが間違っています");
  }
};
</script>

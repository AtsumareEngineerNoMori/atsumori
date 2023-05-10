<template>
  <div class="loginPage">
    <div class="loginPage-logo">
      <img src="../../public/atsumori.png" />
    </div>

    <div class="loginPage-text">
    <div><input type="email" placeholder="メールアドレスを入力してください"  class="loginPage-email" v-model="user.email"/></div>
    <div><input type="password" placeholder="パスワードを入力してください" class="loginPage-password" v-model="user.password"/></div>
    <p  class="alart" v-if=input >メールアドレスまたはパスワードが間違っています</p>
    <div><button @click="loginButton" class="loginPage-button">ログイン</button></div>
    <RouterLink to="/userRegister">
    <div class="loginPage-register-margin"><span class="loginPage-register">アカウントを登録しよう！</span></div>
    </RouterLink>
    </div>

  </div>
</template>

<script setup>
import "../css/main.css";
import { useRouter } from "vue-router";
import { reactive,onMounted,ref } from "vue";
import { signInWithEmailAndPassword} from "@firebase/auth";
import {  auth } from "../../firebase";
import {
  onAuthStateChanged,
} from "@firebase/auth";



const router = useRouter();
const user = reactive({ email: "", password: "" });
const input = ref(false)

// cookieに登録
const setCookie = (myId) => {
  $cookies.set("myId", myId);
};

// ログイン状態の場合の処理
onMounted(() => {
  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      router.push("/top");
    } else {
      console.log("ログインしてないです");
    }
  });
});

const loginButton = async () => {
  try {
    await signInWithEmailAndPassword(auth, user.email, user.password).then(
      () => {
        console.log(auth.currentUser.uid)
        setCookie(auth.currentUser.uid);

        router.push("/top");
        console.log("ログインできました");
      }
    );
  } catch (error) {
    input.value=true
    console.log("メールアドレスまたはパスワードが間違っています");
  }
};
</script>

<template>
  <div class="loginPage">
    <div class="loginPage-logo">
      <img src="../../public/atsumare engimeer no Mori.png" />
    </div>

    <div class="loginPage-text">
    <div><input type="email" placeholder="メールアドレスを入力してください"  class="loginPage-email" v-model="user.email"/></div>
    <div><input type="password" placeholder="パスワードを入力してください" class="loginPage-password" v-model="user.password"/></div>
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
import { reactive } from "vue";
import { signInWithEmailAndPassword} from "@firebase/auth";
import {  auth } from "../../firebase";


const router = useRouter();

const user = reactive({ email: "", password: "" });

const loginButton = async () => {
  try {
    await signInWithEmailAndPassword(auth, user.email, user.password).then(
      () => {
        // if (referrer.path === "/top") {
        //   router.push("/top");
        // } else if (referrer.path === "/top") {
        //   router.push("/top");
        // } else {
        //   router.push("/top");
        // }
        console.log("ログインできました")
      }
    );
  } catch (error) {
    alert("メールアドレスまたはパスワードが間違っています");
  }
};



</script>

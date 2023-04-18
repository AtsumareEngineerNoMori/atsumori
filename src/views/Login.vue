<template>
  <div class="loginPage">
    <div class="loginPage-logo">
      <img src="../../public/atsumare engimeer no Mori.png" />
    </div>

    <div class="loginPage-text">
    <div><input typr="email" placeholder="メールアドレスを入力してください"  class="loginPage-email"/></div>
    <div><input type="password" placeholder="パスワードを入力してください" class="loginPage-password"/></div>
    <div><button class="loginPage-button">ログイン</button></div>
    <div class="loginPage-register-margin"><RouterLink to="/"><span class="loginPage-register">アカウントを登録しよう！</span></RouterLink></div>
  </div>
</div>
</template>

<script setup>
import "../css/main.css";
</script>

<template>
    <Header />
<!-- <HeaderModal /> -->
    <div class="ProjectRegister">
    <hi class="ProjectRegister-title">🌏 プロジェクト登録</hi>
  
    <div class="ProjectRegister-set">
      <div>
    <div class="ProjectRegister-details">
      <div class="ProjectRegister-details-icon">
        <div class="ProjectRegister-details-icon-imgdiv">
          <img
            src="../../../public/earth.png"
            class="ProjectRegister-details-icon-img"
          />
        </div>
        <!-- <input type="file" /> -->
  
        <div class="ProjectRegister-details-name">プロジェクトの名前 
          <input type="text" class="ProjectRegister-details-name-input"/></div>
      </div>
  
      <div class="ProjectRegister-details-information">
        <p class="ProjectRegister-details-information-title">プロジェクトの情報</p>
        <textarea class="ProjectRegister-details-information-text"></textarea>
      </div>
    </div>
  </div>
  
    <button class="ProjectRegister-set-button">登録する</button>
  </div>
  </div>
  </template>
  
  <script setup>
  import Header from "../../components/Header/Header.vue";
  // import HeaderModal from "../../components/Header/HeaderModal.vue";
  </script>
  
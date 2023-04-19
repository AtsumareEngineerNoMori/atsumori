<template>

  <Header />
  <div class="IslandRegister">
  <hi class="IslandRegister-title">島登録</hi>

  <div class="IslandRegister-set">
    <div>
  <div class="IslandRegister-details">
    <div class="IslandRegister-details-icon">
      <div class="IslandRegister-details-icon-imgdiv">
        <img
          src="../../../public/mujintou_kojima.png"
          class="IslandRegister-details-icon-img"
        />
      </div>
      <!-- <input type="file" /> -->

      <div class="IslandRegister-details-name">島の名前
        <input type="text" class="IslandRegister-details-name-input"/></div>
    </div>

    <div class="IslandRegister-details-information">
      <p class="IslandRegister-details-information-title">島の情報</p>
      <textarea class="IslandRegister-details-information-text"></textarea>

    </div>
  </div>
</div>


  <button class="IslandRegister-set-button">登録する</button>
</div>
</div>
</template>

<script setup>

import Header from "../../components/Header/Header.vue"

</script>

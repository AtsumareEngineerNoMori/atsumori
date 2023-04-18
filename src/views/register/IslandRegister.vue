<template>
  <!-- <Header /> -->
  <div class="IlandRegister">
  <hi class="IlandRegister-title">島登録</hi>

  <div class="IlandRegister-set">
    <div>
  <div class="IlandRegister-details">
    <div class="IlandRegister-details-icon">
      <div class="IlandRegister-details-icon-imgdiv">
        <img
          src="../../../public/mujintou_kojima.png"
          class="IlandRegister-details-icon-img"
        />
      </div>
      <!-- <input type="file" /> -->

      <div class="IlandRegister-details-name">島の名前 
        <input type="text" class="IlandRegister-details-name-input"/></div>
    </div>

    <div class="IlandRegister-details-information">
      <p class="IlandRegister-details-information-title">島の情報</p>
      <textarea class="IlandRegister-details-information-text"></textarea>
    </div>
  </div>
</div>

  <button class="IlandRegister-set-button">登録する</button>
</div>
</div>
</template>

<script setup>
// import Header from "../../components/Header/Header.vue"
</script>

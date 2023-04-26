<script setup>
import { ref } from 'vue';


    const checked = ref(false);

</script>
<template>
  <div class="request">
    <h1 class="request__title">申請画面</h1>
    <div class="request__container">
      <h1 class="request__item">プロジェクトの情報</h1>
      <p class="request__detail">
        情報情報情報情報情報情報情報情報情報情報情報情報情報情報情報情報情報情報情報情報情報情報情報情報情報情報情報情報情報情報情報情報情報情報情報情報
      </p>
    </div>
    <div>
      <h1 class="request__item">募集要項</h1>
      <p class="request__detail">
        情報情報情報情報情報情報情報情報情報情報情報情報情報情報情報情報情報情報情報情報情報情報情報情報情報情報情報情報情報情報情報情報情報情報情報情報
      </p>
    </div>

    <div>
      <h1 class="request__item">ひとこと</h1>
      <input type="text" class="request__input" />
    </div>

    <div class="request__agree">
      <!-- <input type="checkbox" id="agree" v-model="checked.value"/> -->
      <label for="agree">上記に同意しました　</label>
      <input type="checkbox" id="agree" v-model="checked"/>

      <div>
        <button :class="{ 'request__button': true, 'request__disabled': !checked }">送信</button>


      </div>
    </div>

  </div>
</template>
<!-- class="request__button " -->

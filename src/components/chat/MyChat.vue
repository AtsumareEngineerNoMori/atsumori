<script setup lang="ts">
import GetTime from "@/components/date/GetTime.vue";
const props = defineProps({
  chat: Object,
});
</script>

<template>
  <RouterLink v-bind:to="{ name: 'mypage' }" class="chat__messageWrapper-userIcon">
    <img
      :src="props.chat.icon"
      alt="userIcon"
      class="chat__messageWrapper-userIcon-img"
    />
  </RouterLink>
  <div class="chat__messageWrapper-message">
    <RouterLink v-bind:to="{ name: 'mypage' }">
      <p class="chat__messageWrapper-myMessage-userName">
        {{ props.chat.name }}
      </p>
    </RouterLink>
    <div class="chat__messageWrapper-myMessage-comDate">
      <div class="chat__messageWrapper-myComment">
        <p class="chat__messageWrapper-myComment-text">
          {{ props.chat.message }}
        </p>
      </div>
      <GetTime :createDate="props.chat.createDate" />
    </div>
  </div>
</template>

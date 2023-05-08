<script setup>
import GetTime from "../date/GetTime.vue";
const props = defineProps({
  chat: Object,
});
</script>

<template>
  <img
    :src="props.chat[0].icon"
    alt="userIcon"
    class="chat__messageWrapper-userIcon"
  />
  <div>
    <p class="chat__messageWrapper-myMessage-userName">
      {{ props.chat[0].name }}
    </p>
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

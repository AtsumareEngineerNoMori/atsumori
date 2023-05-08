<script setup>
import GetTime from "../date/GetTime.vue";
const props = defineProps({
  chat: Object,
});
</script>

<template>
  <template v-if="props.chat.userId !== '1234567890'">
  <img
    :src="props.chat[0].icon"
    alt="userIcon"
    class="chat__messageWrapper-userIcon"
  />
  <div>
    <p class="chat__messageWrapper-otherMessage-userName">
      {{ props.chat[0].name }}
    </p>
    <div class="chat__messageWrapper-otherMessage-comDate">
      <div class="chat__messageWrapper-otherComment">
        <p class="chat__messageWrapper-otherComment-text">
          {{ props.chat.message }}
        </p>
      </div>
      <GetTime :createDate="props.chat.createDate" />
    </div>
  </div>
</template>
</template>

<script setup lang="ts">
import GetTime from "../date/GetTime.vue";

interface Chat {
  createDate: number,
  icon: string,
  islandId?: number,
  projectId?: number,
  message: string,
  userId: string,
  name: string,
}
const props = defineProps<{
  chat: Chat,
}>();
</script>

<template>
  <template v-if="props.chat.userId !== '1234567890'">
    <RouterLink v-bind:to="{ name: 'othermypage', params: {id: props.chat.userId} }" class="chat__messageWrapper-userIcon">
  <img
    :src="props.chat.icon"
    alt="userIcon"
    class="chat__messageWrapper-userIcon-img"
  />
  </RouterLink>
  <div class="chat__messageWrapper-message">
    <RouterLink v-bind:to="{ name: 'othermypage', params: {id: props.chat.userId} }" >
    <p class="chat__messageWrapper-otherMessage-userName">
      {{ props.chat.name }}
    </p>
    </RouterLink>
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

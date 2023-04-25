<script setup>
import { reactive } from "vue";

const props = defineProps({
  createDate: String,
});

const date = reactive({
  hour: "",
  min: "",
});

const timestamp = new Date(props.createDate);
date.hour = timestamp.getHours().toString().padStart(2, "0");
date.min = timestamp.getMinutes().toString().padStart(2, "0");
</script>

<template>
  <div class="time">{{ date.hour }}:{{ date.min }}</div>
</template>

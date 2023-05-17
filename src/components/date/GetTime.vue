<script setup>
import { reactive } from "vue";

const props = defineProps({
  createDate: Number,
});

const date = reactive({
  year: "",
  month: "",
  date: "",
  hour: "",
  min: "",
});

const timestamp = new Date(props.createDate);
date.year = timestamp.getFullYear();
date.month = timestamp.getMonth() + 1;
date.date = timestamp.getDate().toString().padStart(2, "0");
date.hour = timestamp.getHours().toString().padStart(2, "0");
date.min = timestamp.getMinutes().toString().padStart(2, "0");
</script>

<template>
  <div class="time">{{ date.month }}/{{ date.date }}&nbsp;{{ date.hour }}:{{ date.min }}</div>
</template>

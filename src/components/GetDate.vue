<script setup>
import { reactive } from "vue";
const props = defineProps({
  createDate: String,
});

const date = reactive({
  year: "",
  month: "",
  date: "",
  hour: "",
  min: "",
});
// const timestamp = props.createDate.toDate();
const timestamp = new Date(props.createDate);
// date.year = timestamp.getFullYear();
// date.month = timestamp.getMonth() + 1;
// date.date = timestamp.getDate().toString().padStart(2, "0");
date.hour = timestamp.getHours().toString().padStart(2, "0");
date.min = timestamp.getMinutes().toString().padStart(2, "0");
</script>

<template>
  <div class="date">{{ date.hour }}:{{ date.min }}</div>
</template>

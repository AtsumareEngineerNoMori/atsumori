<script setup lang="ts">
import { reactive } from "vue";

interface Date {
  year: string,
  month: string,
  date: string,
  hour: string,
  min: string
}

const props = defineProps({
  createDate: Number,
});

const date = reactive<Date>({
  year: "",
  month: "",
  date: "",
  hour: "",
  min: "",
});

const timestamp = new Date(props.createDate);
date.year = timestamp.getFullYear().toString();
date.month = timestamp.getMonth().toString() + 1;
date.date = timestamp.getDate().toString().padStart(2, "0");
date.hour = timestamp.getHours().toString().padStart(2, "0");
date.min = timestamp.getMinutes().toString().padStart(2, "0");
</script>

<template>
  <div class="time">{{ date.month }}/{{ date.date }}&nbsp;{{ date.hour }}:{{ date.min }}</div>
</template>

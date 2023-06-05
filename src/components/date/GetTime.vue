<script setup lang="ts">
import { reactive } from "vue";

interface GetDate {
  year: number;
  month: number;
  date: string;
  hour: string;
  min: string;
}

const props = defineProps<{
  createDate: number;
}>();

const date = reactive<GetDate>({
  year: 0,
  month: 0,
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
  <div class="time">
    {{ date.month }}/{{ date.date }}&nbsp;{{ date.hour }}:{{ date.min }}
  </div>
</template>

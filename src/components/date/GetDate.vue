<script setup>
import { computed, reactive } from "vue";
const props = defineProps({
  createDate: String,
  displayList: Array,
});

const date = reactive({
  year: "",
  month: "",
  date: "",
});

const timestamp = new Date(props.createDate);
date.year = timestamp.getFullYear();
date.month = timestamp.getMonth() + 1;
date.date = timestamp.getDate().toString().padStart(2, "0");

console.log(props.displayList);
console.log(props.createDate);

// if (date.year === date.year) {
//   if (date.month === date.month) {
//     return date.date < date.date;
//   } else {
//     return date.month < date.month;
//   }
// } else {
//   return date.year < date.year;
// }


// 日付表示
// 前後の日付を比較して異なっていたら日付を表示する
// const compareDate = computed(() => {
//   console.log(props.displayList);

  // for (let i = ""; i < props.displayList.length - 1; i++) {
  //   const a = props.displayList[i].createDate;
  //   const b = props.displayList[i + 1].createDate;
  //   if (a === b) {
  //     console.log("同じ");
  //     return false;
  //   } else if (a > b) {
  //     console.log("前の方が新しい");
  //     return true;
  //   } else {
  //     console.log("後の方が新しい");
  //     return true;
  //   }
  // }
// });
</script>

<template>
  <div class="date">{{ date.year }}/{{ date.month }}/{{ date.date }}</div>
</template>

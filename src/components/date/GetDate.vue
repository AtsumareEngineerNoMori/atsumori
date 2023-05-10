<script setup>
import { reactive, ref } from "vue";
const props = defineProps({
  createDate: String,
  displayList: Array,
  id: Number,
});

const date = reactive({
  year: "",
  month: "",
  date: "",
});
const compareDate = ref(false);

const timestamp = new Date(props.createDate);
const propsYear = timestamp.getFullYear();
const propsMonth = timestamp.getMonth() + 1;
const propsDate = timestamp.getDate().toString().padStart(2, "0");

// console.log(props.displayList);
// console.log(props.createDate);
// console.log(props.id);

// propsのデータが後のデータと異なっていたら表示する
for (let i = 0; i < props.displayList.length - 1; i++) {
  // console.log(`id${props.id}`);
  // console.log(`i番目のid${props.displayList[i].id}`);

  // まるごと渡されたデータの中から該当データとその前後を比較
  if (props.displayList[i].id === props.id) {
    // i番目が同じデータだからその次のデータと比べる
    const time1 = new Date(props.displayList[i + 1].createDate);
    date.year = time1.getFullYear();
    date.month = time1.getMonth() + 1;
    date.date = time1.getDate().toString().padStart(2, "0");
    if (
      date.year === propsYear &&
      date.month === propsMonth &&
      date.date === propsDate
    ) {
      console.log(`一致:1${time1}とprops${timestamp}`);
      compareDate.value = false;
    } else {
      console.log(`不一致:1${time1}とprops${timestamp}`);
      compareDate.value = true;
    }
  }
}
</script>

<template>
  <template v-if="compareDate">
    <div class="date">{{ date.year }}/{{ date.month }}/{{ date.date }}</div>
  </template>
</template>

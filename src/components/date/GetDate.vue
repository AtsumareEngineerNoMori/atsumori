<script setup>
import { reactive, ref } from "vue";
import { realtimeDB } from "../../../firebase";
import {
  ref as dbRef,
  set,
  push,
  onValue,
  onChildAdded,
  serverTimestamp,
  orderByChild,
  equalTo,
  limitToLast,
  query,
  startAt,
  endAt,
  child,
} from "firebase/database";
const props = defineProps({
  createDate: Number,
  chatList: Object,
  chat:Object
});

console.log(props.createDate);
console.log(props.displayList)
console.log(props.chat.createDate)

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
console.log(timestamp)

// console.log(props.displayList);
// console.log(props.createDate);
// console.log(props.id);
// 一意なキーだけ取得できた
// props.chatの内容をもとにdbから条件指定して探す？
const qMessage = query(
  dbRef(realtimeDB, "chat2"),
  orderByChild("message"),
  startAt(props.chat.message),
  endAt(props.chat.message)
)
const qCreateDate = query(
  dbRef(realtimeDB, "chat2"),
  orderByChild("createDate"),
  startAt(props.chat.createDate),
  endAt(props.chat.createDate)
)
const qUserId = query(
  dbRef(realtimeDB, "chat2"),
  orderByChild("userId"),
  startAt(props.chat.userId),
  endAt(props.chat.userId)
)
const q = query(
  dbRef(realtimeDB, "chat2"),
  orderByChild("message").equalTo("こんにちは"),
  orderByChild("createDate").equalTo(props.createDate),
  orderByChild("userId").equalTo("20FZ8Rur4Je4NvLmrYryp8xn3Hi2")
)
onValue(q, (snapshot) => {
  const data = snapshot.val();
  console.log(data);
})

const keyArray = [];
for(let data in props.displayList){
  console.log(data)
  keyArray.push(data);
}
console.log(keyArray)
// for(let i of keyArray){
//   console.log(props.displayList.key("-NVDdV9uU_GKg9nu-0os").userId);
// }
// const a = [props.displayList]
// console.log(a)

console.log(Object.keys(props.displayList).length)
// propsのデータが後のデータと異なっていたら表示する
for (let i = 0; i < Object.keys(props.displayList).length - 1; i++) {
  // console.log(`id${props.id}`);
  // console.log(`i番目のid${props.displayList[i].id}`);
  console.log(props.displayList[i])

  // まるごと渡されたデータの中から該当データとその前後を比較
  if (props.displayList[i] === props.chat) {
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

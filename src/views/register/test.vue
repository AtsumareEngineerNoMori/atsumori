<template>
    <input
                type="text"
                v-model="user.name"
              />
<button @click="addUser">テスト登録</button>
</template>

<script setup lang="ts">

import {  ref ,reactive } from "vue";

const user: {
  name: string;
  job: string;
  comment: string;
  email: string;
  password: string;
  cPassword: string;
} = reactive({
  name: "",
  job: "",
  comment: "",
  email: "",
  password: "",
  cPassword: "",
});


const addUser = async () =>{
            const response = await fetch('http://localhost:3000/users',{
            method: 'POST',
            headers:{
              'Content-Type': 'application/json',
            },
            body:JSON.stringify({ name:user.name}),
          });
          const data:string = await response.json();
        //   users.value=data;
        };

</script>

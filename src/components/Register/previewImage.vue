<script setup lang="ts">
import { ref as vueref} from "vue";
import type { Ref } from "vue";

const iconFileName: Ref<string> = vueref("");
const file:Ref<Blob> = vueref(new Blob());
const iconImg:Ref<string> =vueref(
  "https://firebasestorage.googleapis.com/v0/b/atsumareengineernomori.appspot.com/o/icon%2Fha.png?alt=media&token=145c0742-89c6-4fdd-8702-6ab6b80d5308"
);

const previewImage: (event: any) => void = (event:any) => {
  let reader: FileReader= new FileReader();
  reader.onload = function (e: ProgressEvent<FileReader>) {
    iconImg.value = e.target?.result as string;
  };
  reader.readAsDataURL(event.target?.files[0]);
  file.value = event.target?.files[0];
  iconFileName.value = event.target?.files[0].name;
};
</script>

<template>
</template>

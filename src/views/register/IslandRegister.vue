<template>
  <div class="IslandRegister">
    <h1 class="IslandRegister-title">島登録</h1>

    <form @submit.prevent="registerIsland">
    <div class="IslandRegister-set">
      <div>
        <div class="IslandRegister-details">
          <div class="IslandRegister-details-icon">
            <div class="IslandRegister-details-icon-imgdiv">
              <img
                :src="iconImg"
                alt="ユーザーアイコン"
                v-if="iconImg !== undefined"
                class="IslandRegister-details-icon-img"
              />
            </div>
            <div class="icon_form">
              <label htmlFor="iconPreview">
                <p class="add_icon">+</p>
              </label>
              <input
                type="file"
                name="iconPreview"
                @change="previewImage"
                accept=".png, .jpeg, .jpg"
                id="iconPreview"
                class="icon_input"
              />
            </div>

            <div class="IslandRegister-details-name">
              島の名前
              <input
                v-model="island.name"
                type="text"
                class="IslandRegister-details-name-input"
              />
            </div>
          </div>

          <div class="IslandRegister-details-information">
            <p class="IslandRegister-details-information-title">島の情報</p>
            <textarea
              v-model="island.description"
              class="IslandRegister-details-information-text"
            ></textarea>
          </div>
        </div>
      </div>
        <button @click="islandRegisterButton" class="IslandRegister-set-button">
          登録する
        </button>
    </div>
    </form>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { reactive, ref as vueref } from "vue";
import { getAuth } from "@firebase/auth";
import { storage } from "../../../firebase";
import {
  getDownloadURL,
  uploadBytesResumable,
  ref,
  getStorage,
} from "firebase/storage";
import ProjectChat from "../chat/projectChat.vue";

const router = useRouter();
const iconFileName = vueref("");
const file = vueref();
const haveIcon = vueref(false);
// const iconImg = vueref("../../../public/ha.png");
const iconImg = vueref(
  "https://firebasestorage.googleapis.com/v0/b/atsumareengineernomori.appspot.com/o/island%2Fha.png?alt=media&token=10b4db92-8536-44a6-be94-0541b2b84dc0"
);
const today = vueref(new Date());

console.log(today.value);

const island = reactive({
  id: "",
  islandName: "",
  isIandDescription: "",
  adminId: "",
  createDate: "",
  name:"",
  description:""
});

const auth = getAuth();
const currentUserId = auth.currentUser?.uid;

// アイコン画像プレビュー処理
const previewImage = (event) => {
  haveIcon.value = true;
  let reader = new FileReader();
  reader.onload = function (e) {
    iconImg.value = e.target.result;
  };
  reader.readAsDataURL(event.target.files[0]);
  file.value = event.target.files[0];
  iconFileName.value = event.target.files[0].name;
  console.log(file);
  console.log(iconFileName);
};

const islandRegisterButton = () => {
  // Storageにアイコン登録
  console.log("アイコンの登録のターンがきたよ");
  const storageRef = ref(storage, `island/${iconFileName.value}`);
  console.log(storageRef);
  uploadBytesResumable(storageRef, file.value)
    // StorageからアイコンURLを取得
    .then(() => {
      console.log("アイコンを取得のターンがきたよ");
      const storage = getStorage();
      const starsRef = ref(storage, `island/${iconFileName.value}`);
      getDownloadURL(starsRef).then((url) => {
        console.log(url);
        iconImg.value = url;
        console.log(iconImg.value);
        fetch("http://localhost:8000/Islands", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            islandName: island.name,
            isIandDescription: island.description,
            adminId: currentUserId,
            createDate: new Date(),
            icon: url,
          }),
        });
      });
    });
};

const registerIsland = () =>{
  if(island.name === "") {
    window.alert("島の名前を登録してください");
  }else if(island.description === ""){
    window.alert("島の情報を登録してください");
  } else if (
    !island.name.match(
      /^([ぁ-んーァ-ンヴーｧ-ﾝﾞﾟ\-0-9a-zA-Z^\x20-\x7e一-龠]{1,20})$/
    )
  ) {
    window.alert("島の名前は1文字以上20文字以下で入力してください");
  }else if (
    !island.description.match(
      /^([ぁ-んーァ-ンヴーｧ-ﾝﾞﾟ\-0-9a-zA-Z^\x20-\x7e一-龠]{1,255})$/
    )
  ) {
    window.alert("島の情報は1文字以上255文字以下で入力してください");
  }else{
    islandRegisterButton();
    router.push("/top");
  }
}
</script>

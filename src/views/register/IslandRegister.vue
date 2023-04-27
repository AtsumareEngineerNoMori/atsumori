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
        <button class="IslandRegister-set-button">登録する</button>
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

const router = useRouter();
const iconFileName = vueref("");
const file = vueref();
const iconImg = vueref(
  "https://firebasestorage.googleapis.com/v0/b/atsumareengineernomori.appspot.com/o/island%2Fha.png?alt=media&token=10b4db92-8536-44a6-be94-0541b2b84dc0"
);

const islandData = vueref("");

const island = reactive({
  id: "",
  islandName: "",
  islandDescription: "",
  adminId: "",
  createDate: "",
  name: "",
  description: "",
});

const auth = getAuth();
const currentUserId = auth.currentUser?.uid;

// アイコン画像プレビュー処理
const previewImage = (event) => {
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
  console.log(iconImg.value);
  if (
    iconImg.value !==
    "https://firebasestorage.googleapis.com/v0/b/atsumareengineernomori.appspot.com/o/island%2Fha.png?alt=media&token=10b4db92-8536-44a6-be94-0541b2b84dc0"
  ) {
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
          fetch("http://localhost:8000/Islands", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              islandName: island.name,
              islandDescription: island.description,
              adminId: currentUserId,
              createDate: new Date(),
              icon: iconImg.value,
            }),
          })
            .then(function (response) {
              // fetch が返した Promise の解決を待つ
              return response.json();
            })
            .then(function (jsonObj) {
              // response.json が返した Promise の解決を待つ
              console.log(jsonObj.id);
              fetch("http://localhost:8000/JoinIslands", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  userId: currentUserId,
                  islandId: jsonObj.id,
                }),
              });
            });
        });
      });
  } else {
    fetch("http://localhost:8000/Islands", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        islandName: island.name,
        islandDescription: island.description,
        adminId: currentUserId,
        createDate: new Date(),
        icon: iconImg.value,
      }),
    })
      .then(function (response) {
        // fetch が返した Promise の解決を待つ
        return response.json();
      })
      .then(function (jsonObj) {
        // response.json が返した Promise の解決を待つ
        console.log(jsonObj.id);
        fetch("http://localhost:8000/JoinIslands", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({

            userId: currentUserId,
            islandId: jsonObj.id,

          }),
        });
      });
  }
};

const registerIsland = () => {
  if (island.name === "") {
    window.alert("島の名前を登録してください");
  } else if (island.description === "") {
    window.alert("島の情報を登録してください");
  } else if (island.name.length < 1 || island.name.length > 20){
    window.alert("島の名前は1文字以上20文字以下で入力してください");
  }else if (island.description.length < 1 || island.description.length > 255 ){
  window.alert("島の情報は1文字以上255文字以下で入力してください");
  } else {
    islandRegisterButton();
    router.push("/top");
  }
};
</script>

<template>
  <div class="IslandRegister">
    <h1 class="IslandRegister-title">島登録</h1>

    <form @submit.prevent="registerIsland">
      <div class="IslandRegister-set">
        <div>
          <div class="IslandRegister-details">
            <div class="IslandRegister-details-icon">
              <label htmlFor="iconPreview">
                <div class="IslandRegister-details-icon-imgdiv">
                  <img
                    :src="iconImg"
                    alt="ユーザーアイコン"
                    v-if="iconImg !== undefined"
                    class="IslandRegister-details-icon-img"
                  />

                  <div class="icon_form">
                    <label htmlFor="iconPreview">
                      <p class="add_icon">+</p>
                    </label>
                  </div>
                </div>
              </label>
              <input
                type="file"
                name="iconPreview"
                @change="previewImage"
                accept=".png, .jpeg, .jpg"
                id="iconPreview"
                class="icon_input"
              />
              <div class="IslandRegister-details-name">
                島の名前
                <input
                  v-model="island.name"
                  type="text"
                  class="IslandRegister-details-name-input"
                  @change="changeName"
                />
                <p class="val-name" v-if="islandNameLength">
                  島の名前を入力してください
                </p>
                <p class="val-name" v-if="island.name.length > 20">
                  20文字以下で入力してください
                </p>
              </div>
            </div>

            <div class="IslandRegister-details-information">
              <p class="IslandRegister-details-information-title">島の情報</p>
              <textarea
                v-model="island.description"
                class="IslandRegister-details-information-text"
                @change="changeInfomation"
              ></textarea>
              <p class="val-infomation3" v-if="islandDescriptionLength">
                島の情報を入力してください
              </p>
              <p class="val-infomation4" v-if="island.description.length > 255">
                255文字以下で入力してください
              </p>
            </div>
          </div>
        </div>
        <button class="IslandRegister-set-button">登録する</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { Router, useRouter } from "vue-router";
import type { Ref } from "vue";
import { reactive, ref as vueref } from "vue";
import { Auth, getAuth } from "@firebase/auth";
import { storage } from "../../firebase";
import {
  getDownloadURL,
  uploadBytesResumable,
  ref,
  getStorage,
  StorageReference,
  FirebaseStorage,
} from "firebase/storage";

const router: Router = useRouter();
const iconFileName: Ref<string> = vueref("");
const file: Ref<Blob> = vueref(new Blob());
const iconImg: Ref<string> = vueref(
  "https://firebasestorage.googleapis.com/v0/b/atsumareengineernomori.appspot.com/o/island%2Fha.png?alt=media&token=10b4db92-8536-44a6-be94-0541b2b84dc0"
);

const island: {
  id: number;
  islandName: string;
  islandDescription: string;
  adminId: string;
  createDate: Date;
  name: string;
  description: string;
} = reactive({
  id: Number(),
  islandName: "",
  islandDescription: "",
  adminId: "",
  createDate: new Date(),
  name: "",
  description: "",
});

const islandNameLength: Ref<boolean> = vueref(false);
const islandDescriptionLength: Ref<boolean> = vueref(false);

const auth: Auth = getAuth();
const currentUserId: string | undefined = auth.currentUser?.uid;

const changeName: (e: Event) => void = (e: Event) => {
  islandNameLength.value = false;
};

const changeInfomation: (e: Event) => void = (e: Event) => {
  islandDescriptionLength.value = false;
};

// アイコン画像プレビュー処理
const previewImage: (event: any) => void = (event: any) => {
  let reader: FileReader = new FileReader();
  reader.onload = function (e: ProgressEvent<FileReader>) {
    iconImg.value = e.target?.result as string;
  };
  reader.readAsDataURL(event.target?.files[0]);
  file.value = event.target?.files[0];
  iconFileName.value = event.target?.files[0].name;
};

const islandRegisterButton: () => void = async () => {
  console.log(iconImg.value);
  if (
    iconImg.value !==
    "https://firebasestorage.googleapis.com/v0/b/atsumareengineernomori.appspot.com/o/island%2Fha.png?alt=media&token=10b4db92-8536-44a6-be94-0541b2b84dc0"
  ) {
    // Storageにアイコン登録
    console.log("アイコンの登録のターンがきたよ");
    const storageRef: StorageReference = ref(
      storage,
      `island/${iconFileName.value}`
    );
    console.log(storageRef);
    uploadBytesResumable(storageRef, file.value)
      // StorageからアイコンURLを取得
      .then(() => {
        console.log("アイコンを取得のターンがきたよ");
        const storage: FirebaseStorage = getStorage();
        const starsRef: StorageReference = ref(
          storage,
          `island/${iconFileName.value}`
        );
        getDownloadURL(starsRef).then((url: string) => {
          console.log(url);
          iconImg.value = url;
          // try {
          fetch("http://localhost:3000/islandsRegister", {
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
            .then(function (response: Response): Promise<any> {
              // fetch が返した Promise の解決を待つ
              return response.json();
            })
            .then(function (jsonObj: any) {
              // response.json が返した Promise の解決を待つ
              console.log(jsonObj.id);
              fetch("http://localhost:3000/joinIslandsRegister", {
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
    fetch("http://localhost:3000/islandsRegister", {
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
      .then(function (response: Response): Promise<any> {
        // fetch が返した Promise の解決を待つ
        return response.json();
      })
      .then(function (jsonObj: any): void {
        // response.json が返した Promise の解決を待つ
        console.log(jsonObj.id);
        fetch("http://localhost:3000/joinIslandsRegister", {
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

const registerIsland: () => void = () => {
  if (island.name === "") {
    islandNameLength.value = true;
  }
  if (island.description === "") {
    islandDescriptionLength.value = true;
  }
  if (
    island.name === "" ||
    island.description === "" ||
    island.name.length > 20 ||
    island.description.length > 255
  ) {
    console.log("入力が間違っているところがあります");
  } else {
    islandRegisterButton();
    router.push("/top");
  }
};
</script>

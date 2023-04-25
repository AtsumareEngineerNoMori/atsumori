<template>
  <!-- <Header /> -->
  <!-- <HeaderModal /> -->
  <div class="ProjectRegister">
    <hi class="ProjectRegister-title">プロジェクト登録</hi>

    <div class="ProjectRegister-set">
      <div>
        <div class="ProjectRegister-details">
          <div class="ProjectRegister-details-icon">
            <div class="ProjectRegister-details-icon-imgdiv">
              <!-- <img
            src="../../../public/earth.png"
            class="ProjectRegister-details-icon-img"
          /> -->
              <img
                :src="iconImg"
                alt="ユーザーアイコン"
                v-if="iconImg !== undefined"
                class="ProjectRegister-details-icon-img"
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
            <!-- <input type="file" /> -->

            <div class="ProjectRegister-details-name">
              プロジェクトの名前
              <input
                v-model="project.name"
                type="text"
                class="ProjectRegister-details-name-input"
              />
            </div>
          </div>

          <div class="ProjectRegister-details-information">
            <p class="ProjectRegister-details-information-title">
              プロジェクトの情報
            </p>
            <textarea
              v-model="project.description"
              class="ProjectRegister-details-information-text"
            ></textarea>
          </div>
        </div>
      </div>
      <RouterLink to="/top">
        <button
          @click="projectRegisterButton"
          class="ProjectRegister-set-button"
        >
          登録する
        </button>
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref as vueref } from "vue";
import { getAuth } from "@firebase/auth";
import { useRouter } from "vue-router";
import { storage } from "../../../firebase";
import {
  getDownloadURL,
  uploadBytesResumable,
  ref,
  getStorage,
} from "firebase/storage";

const iconFileName = vueref("");
const file = vueref();
const haveIcon = vueref(false);
const iconImg = vueref(
  "https://firebasestorage.googleapis.com/v0/b/atsumareengineernomori.appspot.com/o/project%2Fha.png?alt=media&token=6141dc6e-714a-4257-91e2-88fcd6d436ad"
);
const today = vueref(new Date());

const router = useRouter();
const project = reactive({
  id: "",
  islandName: "",
  isIandDescription: "",
  adminId: "",
  createDate: "",
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
  // console.log(file)
  // console.log(iconFileName)
};

const projectRegisterButton = (async) => {
  // Storageにアイコン登録
  console.log("アイコンの登録のターンがきたよ");
  const storageRef = ref(storage, `project/${iconFileName.value}`);
  console.log(storageRef);
  uploadBytesResumable(storageRef, file.value)
    // StorageからアイコンURLを取得
    .then(() => {
      console.log("アイコンを取得のターンがきたよ");
      const storage = getStorage();
      const starsRef = ref(storage, `project/${iconFileName.value}`);
      getDownloadURL(starsRef).then((url) => {
        console.log(url);
        iconImg.value = url;
        fetch("http://localhost:8000/Projects", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            projectName: project.name,
            projectDescription: project.description,
            adminId: currentUserId,
            createDate: new Date(),
            icon: url,
          }),
        });
      });
    });

  //           .then(() => {
  //             if(iconImg !== "https://firebasestorage.googleapis.com/v0/b/atsumareengineernomori.appspot.com/o/project%2Fha.png?alt=media&token=6141dc6e-714a-4257-91e2-88fcd6d436ad"){
  //   fetch("http://localhost:8000/Projects", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       projectName: project.name,
  //       projectDescription: project.description,
  //       adminId: currentUserId,
  //       createDate: new Date(),
  //       icon:iconImg.value
  //     }),
  // })
  //             }else{
  //               fetch("http://localhost:8000/Projects", {

  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },

  //     body: JSON.stringify({
  //       projectName: project.name,
  //       projectDescription: project.description,
  //       adminId: currentUserId,
  //       createDate: new Date(),
  //       icon:iconImg.value
  //     }),
  // })

  //             }
  // })
};
</script>

<template>
  <div class="ProjectRegister">
    <h1 class="ProjectRegister-title">プロジェクト登録</h1>

    <div v-if="islands.length === 0">
      <If :moji="`まずは島を登録しよう`" :pageLink="`/IslandRegister`" />
    </div>

    <div v-else>
      <form @submit.prevent="registerProject">
        <div class="ProjectRegister-set">
          <div>
            <div class="ProjectRegister-details">
              <div class="ProjectRegister-details-icon">
                <div class="ProjectRegister-details-icon-imgdiv">
                  <img
                    :src="iconImg"
                    alt="ユーザーアイコン"
                    v-if="iconImg !== undefined"
                    class="ProjectRegister-details-icon-img"
                  />
                </div>
                <div class="icon_form-project">
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

                <div class="ProjectRegister-details-name">
                  プロジェクトの名前
                  <input
                    v-model="project.name"
                    type="text"
                    class="ProjectRegister-details-name-input"
                    @change="changeName"
                  />
                  <p class="val-name" v-if="projectNameLength">
                    プロジェクトの名前を入力してください
                  </p>
                  <p class="val-name" v-if="project.name.length > 20">
                    20文字以下で入力してください
                  </p>
                </div>
              </div>

              <div class="ProjectRegister-details-information">
                <div>
                  <p class="ProjectRegister-details-information-selecttitle">
                    最初に参加する島
                  </p>
                  <select
                    name="island"
                    id="island-select"
                    v-model="selectIsland"
                    class="ProjectRegister-details-information-select"
                    @change="changeSelect"
                  >
                    <option
                      v-for="island in islands"
                      :value="island.id"
                      :key="island.id"
                      selected
                    >
                      {{ island.islandName }}
                    </option>
                  </select>
                  <p class="val-select" v-if="selectIslandLength">
                    最初に参加する島を選択してください
                  </p>
                </div>

                <p class="ProjectRegister-details-information-title">
                  プロジェクトの情報
                </p>
                <textarea
                  v-model="project.description"
                  class="ProjectRegister-details-information-text"
                  @change="changeInfomation"
                ></textarea>
                <p class="val-infomation" v-if="projectDescriptionLength">
                  プロジェクトの情報を入力してください
                </p>
                <p
                  class="val-infomation2"
                  v-if="project.description.length > 255"
                >
                  255文字以下で入力してください
                </p>
              </div>
            </div>
          </div>
          <button class="ProjectRegister-set-button">登録する</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import If from "../../components/If/If.vue";
import { useRouter } from "vue-router";
import { reactive, ref as vueref } from "vue";
import { auth, storage } from "../../firebase";
import {
  getDownloadURL,
  uploadBytesResumable,
  ref,
  getStorage,
} from "firebase/storage";
import { onAuthStateChanged } from "@firebase/auth";

const router = useRouter();
const iconFileName = vueref("");
const file = vueref();
const iconImg = vueref(
  "https://firebasestorage.googleapis.com/v0/b/atsumareengineernomori.appspot.com/o/project%2Fha.png?alt=media&token=6141dc6e-714a-4257-91e2-88fcd6d436ad"
);

const project:{id:Number,projectName:String,  projectDescription:String ,
  adminId: String,
  createDate: Date,
  name: String,
  description: String} = reactive({
  id: "",
  projectName: "",
  projectDescription: "",
  adminId: "",
  createDate: "",
  name: "",
  description: "",
});

const selectIsland = vueref("");
const projectNameLength = vueref(false);
const projectDescriptionLength = vueref(false);
const selectIslandLength = vueref(false);
const islands = vueref([]);



const changeName = (e) => {
  console.log(e);
  projectNameLength.value = false;
};

const changeSelect = (e) => {
  console.log(e);
  selectIslandLength.value = false;
};

const changeInfomation = (e) => {
  console.log(e);
  projectDescriptionLength.value = false;
};

// ログイン状態の場合の処理
onAuthStateChanged(auth, (currentUser:String) => {
    if (currentUser) {
   console.log("ログインしています")
    } else {
      router.push("/login");
    }
  });


// 自分が管理している島取得
// const getFlight = async () => {
//   const response = await fetch(
//     `http://localhost:8000/islands?adminId=${currentUserId}`

//   );
//   const data = await response.json();
//   console.log(data);
//   // islands.value = data;
// };

// onMounted (

// const auth = getAuth();
//   const currentUserId = auth.currentUser?.uid;

const currentUserId = $cookies.get("myId");

const getFlight = async () => {
  const response = await fetch(
    `http://localhost:8000/islands?adminId=${currentUserId}`
  ).then((response) => response.json());
  islands.value = response;
  console.log(response);
};
getFlight();
// )

// アイコン画像プレビュー処理
const previewImage = (event) => {
  let reader = new FileReader();
  reader.onload = function (e) {
    iconImg.value = e.target.result;
  };
  reader.readAsDataURL(event.target.files[0]);
  file.value = event.target.files[0];
  iconFileName.value = event.target.files[0].name;
};

const projectRegisterButton = () => {
  // Storageにアイコン登録
  if (
    iconImg.value !==
    "https://firebasestorage.googleapis.com/v0/b/atsumareengineernomori.appspot.com/o/project%2Fha.png?alt=media&token=6141dc6e-714a-4257-91e2-88fcd6d436ad"
  ) {
    const storageRef = ref(storage, `project/${iconFileName.value}`);
    uploadBytesResumable(storageRef, file.value)
      // StorageからアイコンURLを取得
      .then(() => {
        const storage = getStorage();
        const starsRef = ref(storage, `project/${iconFileName.value}`);
        getDownloadURL(starsRef).then((url) => {
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
              icon: iconImg.value,
              adminIslandId:selectIsland.value
            }),
          })
            .then(function (response) {
              // fetch が返した Promise の解決を待つ
              return response.json();
            })
            .then(function (jsonObj) {
              // response.json が返した Promise の解決を待つ
              console.log(jsonObj.id);
              fetch("http://localhost:8000/JoinProjects", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  islandId: selectIsland.value,
                  projectId: jsonObj.id,
                }),
              });
            });
        });
      });
  } else {
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
        icon: iconImg.value,
        adminIslandId:selectIsland.value
      }),
    })
      .then(function (response) {
        // fetch が返した Promise の解決を待つ
        return response.json();
      })
      .then(function (jsonObj) {
        // response.json が返した Promise の解決を待つ
        console.log(jsonObj.id);
        fetch("http://localhost:8000/JoinProjects", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            islandId: selectIsland.value,
            projectId: jsonObj.id,
          }),
        });
      });
  }
};

const registerProject = () => {
  console.log(selectIsland);
  if (project.name === "") {
    projectNameLength.value = true;
  }
  if (project.description === "") {
    projectDescriptionLength.value = true;
  }
  if (selectIsland.value === "") {
    console.log("ヤッホ！！！！");
    selectIslandLength.value = true;
  }

  if (
    project.name === "" ||
    project.description === "" ||
    project.name.length > 20 ||
    project.description.length > 255 ||
    selectIsland.value === ""
  ) {
    // window.alert("入力が間違っているところがあります")
    console.log("yahho~!");
  } else {
    projectRegisterButton();
    router.push("/top");
  }
};
</script>

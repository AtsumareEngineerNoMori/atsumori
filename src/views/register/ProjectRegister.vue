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
import type { Ref } from "vue";
import { Router, useRouter } from "vue-router";
import { reactive, ref as vueref } from "vue";
import { auth, storage } from "../../firebase";
import {
  getDownloadURL,
  uploadBytesResumable,
  ref,
  getStorage,
StorageReference,
FirebaseStorage,
} from "firebase/storage";
import { onAuthStateChanged, User } from "@firebase/auth";
import {app} from "../../main"

const router: Router = useRouter();
const iconFileName:Ref<string> = vueref("");
const file :Ref<Blob>= vueref( new Blob());
const iconImg :Ref<string>= vueref(
  "https://firebasestorage.googleapis.com/v0/b/atsumareengineernomori.appspot.com/o/project%2Fha.png?alt=media&token=6141dc6e-714a-4257-91e2-88fcd6d436ad"
);

const project: {
  id: number;
  projectName: string;
  projectDescription: string;
  adminId: string;
  createDate: Date;
  name: string;
  description: string;
} = reactive({
  id: Number(),
  projectName: "",
  projectDescription: "",
  adminId: "",
  createDate:new Date(),
  name: "",
  description: "",
});

const selectIsland:Ref<string> = vueref("");
const projectNameLength:Ref<boolean>  = vueref(false);
const projectDescriptionLength:Ref<boolean>  = vueref(false);
const selectIslandLength:Ref<boolean>  = vueref(false);
const islands:Ref<{id:number,islandName:string}[]>  = vueref([]);

const changeName = (e:Event) => {
  projectNameLength.value = false;
};

const changeSelect = (e: Event) => {
  selectIslandLength.value = false;
};

const changeInfomation = (e: Event) => {
  projectDescriptionLength.value = false;
};

// ログイン状態の場合の処理
onAuthStateChanged(auth, (currentUser: User | null) => {
  if (currentUser) {
{}
  } else {
    router.push("/login");
  }
});

const currentUserId: any = app.$cookies.get("myId");

const getFlight: () => Promise<void> = async () => {
  const response: any = await fetch(
    `http://localhost:8000/islands?adminId=${currentUserId}`
  ).then((response: Response) => response.json());
  islands.value = response;
};
getFlight();

// アイコン画像プレビュー処理
const previewImage : (event: any) => void= (event: any) => {
  let reader : FileReader= new FileReader();
  reader.onload = function (e:ProgressEvent<FileReader>): void {
    iconImg.value = e.target?.result as string;
  };
  reader.readAsDataURL(event.target?.files[0]);
  file.value = event.target?.files[0];
  iconFileName.value = event.target?.files[0].name;
};

const projectRegisterButton : () => void= () => {
  // Storageにアイコン登録
  if (
    iconImg.value !==
    "https://firebasestorage.googleapis.com/v0/b/atsumareengineernomori.appspot.com/o/project%2Fha.png?alt=media&token=6141dc6e-714a-4257-91e2-88fcd6d436ad"
  ) {
    const storageRef : StorageReference= ref(storage, `project/${iconFileName.value}`);
    uploadBytesResumable(storageRef, file.value)
      // StorageからアイコンURLを取得
      .then(() => {
        const storage: FirebaseStorage = getStorage();
        const starsRef : StorageReference= ref(storage, `project/${iconFileName.value}`);
        getDownloadURL(starsRef).then((url: string) => {
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
              adminIslandId: selectIsland.value,
            }),
          })
            .then(function (response: Response): Promise<any> {
              // fetch が返した Promise の解決を待つ
              return response.json();
            })
            .then(function (jsonObj:any): void {
              // interfaceでisland定義して、anyではなくてIslandi入れる
              // response.json が返した Promise の解決を待つ
              // console.log(jsonObj.id);
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
        adminIslandId: selectIsland.value,
      }),
    })
      .then(function (response: Response): Promise<any> {
        // fetch が返した Promise の解決を待つ
        return response.json();
      })
      .then(function (jsonObj:any): void {
        // response.json が返した Promise の解決を待つ
        // console.log(jsonObj.id);
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

const registerProject : () => void= () => {
  if (project.name === "") {
    projectNameLength.value = true;
  }
  if (project.description === "") {
    projectDescriptionLength.value = true;
  }
  if (selectIsland.value === "") {
    selectIslandLength.value = true;
  }

  if (
    project.name === "" ||
    project.description === "" ||
    project.name.length > 20 ||
    project.description.length > 255 ||
    selectIsland.value === ""
  ) {
    console.log("入力が間違っているところがあります");
  } else {
    projectRegisterButton();
    router.push("/top");
  }
};
</script>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getStorage, ref as firebaseRef, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {
  onAuthStateChanged,
  // createUserWithEmailAndPassword,
  // getAuth,
} from "@firebase/auth";
import { storage, auth, db } from "../../firebase";


import "../css/main.css";


//デフォルトの画像
const img = {
  icon: "https://1.bp.blogspot.com/-EHBItm2ov28/X7zMLiDUlnI/AAAAAAABcZg/Hn1EagLhVecSENp47dA46nL8wXAP4iChQCNcBGAsYHQ/s608/sweets_tarte_strawberry.png",
  name: "アイコン",
};

const route = useRoute();
const router = useRouter();

//プロジェクト情報取得
const ProjectId = ref(route.params.id);
const Project = ref({
  projectName:"",
  projectDescription:"",
  adminId:"",
  createDate:"",
  icon:"",
  id:"",
  comment:""
});

const overName = ref("");
const overDescription = ref("");
const overComment = ref("");

const data = ref({
  recruitTitle: "",
  recruitJob: "",
  recruitPoint: "",
  createDate: "",
});

//プロジェクト情報取得
onMounted(async () => {
      // ログイン状態のチェック
      onAuthStateChanged(auth, async (currentUser) => {
    if (currentUser) {
      console.log("ログインしています");
  try {
    const response = await fetch(
      `http://localhost:8000/Projects/${ProjectId.value}`
    );
    if (!response.ok) {
      throw new Error(`HTTPエラーです！！！: ${response.status}`);
    }
    Project.value = await response.json();
    console.log("Project.valueの中身", Project.value);
    console.log(Project.value);
  } catch (err:any) {
    err.value = err;
    console.log("エラー", err.value);
  }
} else {
      router.push("/login");
    }
  });
});

//icon選択
async function iconEdit(event:any) {
  try {
    const file = event.target.files[0];
    if (!file) return; // ファイルが選択されていない場合は終了
    const storage = getStorage();
    const storageRef = firebaseRef(storage, `project/${file.name}`);
    await uploadBytesResumable(storageRef, file);
    const fileURL = await getDownloadURL(storageRef);
    Project.value.icon = fileURL;
  } catch (error) {
    console.error(error);
  }
}


//RecruitNewUser取得
const getFlight = async () => {
  const response = await fetch(
    `http://localhost:8000/RecruitNewIsland/${ProjectId.value}`
  );

  const recruitNewIslandData = await response.json();
  console.log(recruitNewIslandData);
  data.value = recruitNewIslandData;
  console.log(data);
  console.log(data.value.recruitTitle)
};
getFlight();

//デフォルトの画像
const defaultIconURL =
  "https://firebasestorage.googleapis.com/v0/b/atsumareengineernomori.appspot.com/o/icon%2Fha.png?alt=media&token=145c0742-89c6-4fdd-8702-6ab6b80d5308";

//画像削除
const removeIcon = () => {
  Project.value.icon = defaultIconURL;
};

// Projects更新
async function updateProject() {
  if (!check()) {
    return;
  }
  try {
    const response = await fetch(
      `http://localhost:8000/Projects/${Project.value.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Project.value),
      }
    );
    if (!response.ok) {
      throw new Error(`HTTPエラーです！！！: ${response.status}`);
    }
    console.log("更新！！！！");
    await updateRecruitNewUser();
    router.push(`/projectShow/${Project.value.id}`);
  } catch (err) {
    console.log("更新できません", err);
  }
}

// recruitNewIsland更新
async function updateRecruitNewUser() {
  try {
    const response = await fetch(
      `http://localhost:8000/RecruitNewIsland/${Project.value.id}`
    );
    if (!response.ok) {
      console.log(`RecruitNewIsland/${Project.value.id}は存在しません`);
      return;
    }
    const result = await fetch(
      `http://localhost:8000/RecruitNewIsland/${Project.value.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectId: Project.value.id,
          recruitTitle: data.value.recruitTitle,
          recruitJob: data.value.recruitJob,
          recruitPoint: data.value.recruitPoint,
          createDate: data.value.createDate,
          projectName: Project.value.projectName,
          projectIcon: Project.value.icon,
          // id: Project,
        }),
      }
    );
  } catch (error) {
    console.error("エラーが発生しました:", error);
  }
}

const back = () => {
  router.push(`/projectShow/${Project.value.id}`);
};

// バリデーションチェック
function check() {
  let isValid = true;

  const maxName = 20;
  if (
    Project.value.projectName.length > maxName ||
    Project.value.projectName.length === 0
  ) {
    overName.value = "プロジェクト名は1文字以上20文字以内で入力してください";
    isValid = false;
  } else {
    overName.value = "";
  }

  const maxDescription = 20;
  if (
    Project.value.projectDescription.length > maxDescription ||
    Project.value.projectDescription.length === 0
  ) {
    overDescription.value = "プロジェクト詳細は1文字以上20文字以内で入力してください";
    isValid = false;
  } else {
    overDescription.value = "";
  }
  const maxComment = 255;
if (Project.value.comment && Project.value.comment.length > maxComment) {
  overComment.value = "ひとことは255文字以内で入力してください";
  isValid = false;
} else {
  overComment.value = "";
}
  return isValid;
}
</script>

<template>
  <!-- プロジェクト編集画面 -->
  <div class="mypage">
    <div class="mypage__container">
      <div class="edit__column">
        <label for="icon_file">
          <img :src="Project.icon" alt="" class="mypage__profileiconImg" />
        </label>
        <input
          type="file"
          @change="iconEdit"
          id="icon_file"
          style="display: none"
        />
        <button @click="removeIcon" class="edit__button_cansel">
          画像を削除
        </button>
      </div>
      <ul class="edit__column2">
        <li class="mypage__item_name">
          <p>プロジェクト名：</p>

          <div>
            <input
              type="text"
              v-model="Project.projectName"
              class="edit__input"
            />
          </div>
          <div style="height: 40px;">
             <span v-show="overName" class="mypage__check">{{ overName }}</span>
          </div>

          <p class="mypage__details">プロジェクト詳細：</p>
        
          <div>
            <input
              type="text"
              v-model="Project.projectDescription"
              class="edit__input"
            />
          </div> 
          <div style="height: 40px;">
            <span v-show="overDescription" class="mypage__check">{{
            overDescription
          }}</span>
          </div> 
        </li>
      </ul>
    </div>
    <div class="edit__item">
      <span>ひとこと：</span> 
      <p>
        <textarea
        name=""
        id=""
        cols="30"
        rows="10"
        class="edit__textarea"
        v-model="Project.comment"
        ></textarea>
      </p>
    </div>
    <div style="height: 20px;">
      <div v-show="overComment" class="mypage__comment">{{ overComment }}</div>
    </div>
    <div class="edit__buttoncontainer">
      <button class="edit__button_cansel" @click="back">キャンセル</button>
      <button class="edit__button" @click="updateProject">更新</button>
    </div>
  </div>
</template>

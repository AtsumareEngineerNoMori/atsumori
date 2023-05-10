<script setup>
import { onMounted, ref } from "vue";
import { useRoute , useRouter } from "vue-router"
import "../css/main.css";

const img = {
  icon: "https://1.bp.blogspot.com/-EHBItm2ov28/X7zMLiDUlnI/AAAAAAABcZg/Hn1EagLhVecSENp47dA46nL8wXAP4iChQCNcBGAsYHQ/s608/sweets_tarte_strawberry.png",
  name: "アイコン",
};

const route = useRoute();
const router = useRouter();

const Project = ref(route.params.id); //?????

const data = ref({
  recruitTitle: "",
  recruitJob: "",
  recruitPoint: "",
  createDate: "",
});

//プロジェクト情報取得
onMounted(async () => {
  try {
    const response = await fetch(
      `http://localhost:8000/Projects/${Project.value}`
    );
    if (!response.ok) {
      throw new Error(`HTTPエラーです！！！: ${response.status}`);
    }
    Project.value = await response.json();
    console.log("Islands.valueの中身", Project.value);
    console.log( Project.value)
  } catch (err) {
    err.value = err;
    console.log("エラー", err.value);
  }
});

//icon選択
async function iconEdit(event) {
  try {
    const file = event.target.files[0];
    if (!file) return; // ファイルが選択されていない場合は終了
    const base64String = await convertToBase64(file);
    Project.value.icon = base64String;
  } catch (error) {
    console.error(error);
  }
}
function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

//RecruitNewUser取得
const getFlight = async () => {
  const response = await fetch(`http://localhost:8000/RecruitNewIsland/${Project.value.id}`);
  const recruitNewIslandData = await response.json();
  console.log(recruitNewIslandData);
  data.value = recruitNewIslandData;
  console.log(data);
};
getFlight();


//デフォルトの画像
const defaultIconURL = "https://1.bp.blogspot.com/-LZL7jGWmL3Q/X-FcwoOnE2I/AAAAAAABdEs/qUrY1ClrQrMukkdaEnZK8-Bdob7mOdmQgCNcBGAsYHQ/s400/onepiece13_crocodile.png"

//画像削除
const removeIcon = () => {
  Project.value.icon = defaultIconURL;
}


//Projects更新
async function updateProject() {
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

        // recruitNewIsland更新
        const updateRecruitNewUser = () => {
      fetch(`http://localhost:8000/RecruitNewIsland/${Project.value.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectId: Project,
          recruitTitle: data.value.recruitTitle,
          recruitJob: data.value.recruitJob,
          recruitPoint: data.value.recruitPoint,
          createDate: data.value.createDate,
          projectName: Project.value.projectName ,
          projectIcon: Project.value.icon ,
          // id: Project,
        }),
      });
    };
    updateRecruitNewUser();





    if (!response.ok) {
      throw new Error(`HTTPエラーです！！！: ${response.status}`);
    }
    console.log("更新！！！！");
    router.push(`/projectShow/${Project.value.id}`);

  } catch (err) {
    console.log("更新できません", err);
  }
}

const back = () => {
  router.push(`/projectShow/${Project.value.id}`)
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
        <button @click="removeIcon"  class="edit__button_cansel">画像を削除</button>

      </div>
      <ul class="edit__column2">
        <li class="mypage__item_name">
          <p>プロジェクト名：</p>
          <span
            ><input
              type="text"
              v-model="Project.projectName"
              class="edit__input"
          /></span>
          <p>プロジェクト詳細：</p>
          <span
            ><input
              type="text"
              v-model="Project.projectDescription"
              class="edit__input"
          /></span>
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
    <div class="edit__buttoncontainer">
      <button class="edit__button_cansel" @click="back">キャンセル</button>
      <button class="edit__button" @click="updateProject">更新</button>

    </div>
  </div>
</template>

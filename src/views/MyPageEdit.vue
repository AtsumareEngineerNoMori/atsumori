<script setup lang="ts">
// import { placeholder } from "@babel/types";
import { onMounted, ref as vueref } from "vue";
import { useRouter } from "vue-router";
import "../css/main.css";
import { realtimeDB, auth } from "../firebase";
import {
  getStorage,
  ref as firebaseRef,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import {
  ref as dbRef,
  onValue,
  orderByChild,
  query,
  startAt,
  endAt,
  set,
} from "firebase/database";
import { myIdJudge } from "../userJudge";

//会員情報取得
const userId = vueref(); //firebaseでログインしてる人のID
const User = vueref({
  icon: "",
  name: "",
  job: "",
  comment: "",
});
const router = useRouter();
const overName = vueref("");
const overComment = vueref("");

const back = () => {
  router.push("/mypage");
};
//会員情報取得
onMounted(async () => {
  //onAuthStateChanged★Firebaseの認証状態が変更されたときに呼び出され、現在の認証状態を示すユーザーオブジェクトを返す
  auth.onAuthStateChanged(async (loggedInUser: any) => {
    if (loggedInUser) {
      userId.value = loggedInUser.uid; // ログインしているユーザーのUIDをセット

      try {
        const response = await fetch(
          `http://localhost:8000/Users/${userId.value}`
        );
        if (!response.ok) {
          throw new Error(`HTTPエラーです！！！: ${response.status}`);
        }
        User.value = await response.json();
        console.log("User.valueの中身", User.value);
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
    const storageRef = firebaseRef(storage, `icon/${file.name}`);
    await uploadBytesResumable(storageRef, file);
    const fileURL = await getDownloadURL(storageRef);
    User.value.icon = fileURL;
  } catch (error) {
    console.error(error);
  }

}

//デフォルトの画像
const defaultIconURL =
  "https://3.bp.blogspot.com/-n0PpkJL1BxE/VCIitXhWwpI/AAAAAAAAmfE/xLraJLXXrgk/s170/animal_hamster.png";

//画像削除
const removeIcon = () => {
  User.value.icon = defaultIconURL;
};
//User更新
async function updateUser() {
  if (!check()) {
    return;
  }
  try {
    // json更新
    const response = await fetch(
      `http://localhost:8000/Users/${userId.value}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(User.value),
      }
    );

    // realtimeDB更新
    const newName = User.value.name;
    const newIcon = User.value.icon;
    updateDB(userId.value, newName, newIcon);

    if (!response.ok) {
      throw new Error(`HTTPエラーです！！！: ${response.status}`);
    }
    console.log("更新！！！！");
    router.push("/mypage");
  } catch (err) {
    console.log("更新できません", err);
  }
}

// バリデーションチェック
function check() {
  let isValid = true;

  const maxName = 20;
  if (User.value.name.length > maxName || User.value.name.length === 0) {
    overName.value = "名前は1文字以上20文字以内で入力してください";
    isValid = false;
  } else {
    overName.value = "";
  }

  const maxComment = 255;
  if (User.value.comment.length > maxComment) {
    overComment.value = "ひとことは255文字以内で入力してください";
    isValid = false;
  } else {
    overComment.value = "";
  }

  return isValid;
}

// realtimeDB更新関数
const updateDB = (userId:string, newName:string, newIcon:string) => {
  // userIdが等しいデータ参照先
  const queryRef = query(
    dbRef(realtimeDB, myIdJudge()),
    orderByChild("userId"),
    startAt(userId),
    endAt(userId)
  );

  onValue(queryRef, (snapshot) => {
    if (snapshot.exists()) {
      console.log("存在する");
      // データ参照
      const chatData = snapshot.val();
      // データ1件ずつキーを取得
      Object.keys(chatData).forEach(async (childSnapshot) => {
        // 名前更新
        await set(
          dbRef(realtimeDB, `${myIdJudge()}/${childSnapshot}/name`),
          newName
        );
        // icon更新
        await set(
          dbRef(realtimeDB, `${myIdJudge()}/${childSnapshot}/icon`),
          newIcon
        );
      });
      console.log("更新されました");
    } else {
      console.log("存在しない");
    }
  });
};
</script>

<template>
  <div class="edit">
    <div class="edit__container">
      <div class="edit__column">
        <label for="icon_file">
          <img :src="User.icon" alt="" class="mypage__profileiconImg" />
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
          <div>なまえ：</div>

          <span
            ><input type="text" v-model="User.name" class="edit__input"
          /></span>
          <div style="height: 40px">
            <span v-if="overName" class="mypage__check">{{ overName }}</span>
          </div>
        </li>
        <li class="mypage__item">
          <span>職種：</span>
          <label class="edit__label">
            <input type="radio" name="job" value="WEB" v-model="User.job" />
            WEB
          </label>
          <label class="edit__label">
            <input type="radio" name="job" value="FR" v-model="User.job" />
            FR
          </label>
          <label class="edit__label">
            <input type="radio" name="job" value="ML" v-model="User.job" />
            ML
          </label>
          <label class="edit__label">
            <input type="radio" name="job" value="CL" v-model="User.job" />
            CL
          </label>
          <label class="edit__label">
            <input type="radio" name="job" value="QA" v-model="User.job" />
            QA
          </label>
          <label class="edit__label">
            <input type="radio" name="job" value="その他" v-model="User.job"/>
            その他
          </label>
        </li>
        <li class="mypage__item">
          <span>ひとこと：</span>

          <textarea
            cols="30"
            rows="10"
            class="edit__input"
            v-model="User.comment"
          ></textarea>
          <div style="height: 40px">
            <span v-if="overComment" class="mypage__check">{{
              overComment
            }}</span>
          </div>
        </li>
      </ul>
    </div>
    <div style="height: 40px"></div>
    <div class="edit__buttoncontainer">
      <button class="edit__button_cansel" @click="back">戻る</button>
      <button class="edit__button" @click="updateUser">更新</button>
    </div>
  </div>
</template>

<template>
  <div class="userRegister">
    <div class="userRegister-title">移住票</div>
    <div class="userRegister-body">
      <!-- <form method="post" action="example.cgi"> -->

      <div class="userRegister-details">
        <div class="userRegister-details-icon">
          <div class="userRegister-details-icon-imgdiv">
            <!-- <img
            class="userRegister-details-icon-img"
            src="../../../public/ha.png"
          /> -->
            <img
              :src="iconImg"
              alt="ユーザーアイコン"
              v-if="iconImg !== undefined"
              class="userRegister-details-icon-img"
            />
          </div>

          <div class="userRegister-details-icon-icon_form">
            <label htmlFor="iconPreview">
              <p class="userRegister-details-icon-add_icon">+</p>
            </label>
            <input
              type="file"
              name="iconPreview"
              @change="previewImage"
              accept=".png, .jpeg, .jpg"
              id="iconPreview"
              class="userRegister-details-icon-icon_input"
            />
          </div>
          <!-- <input src="../../../public/ha.png" type="file" /> -->
        </div>

        <div class="userRegister-details-detail">
          <div>
            お名前
            <input
              type="text"
              class="userRegister-details-detail-name"
              v-model="user.name"
            />
            <!-- <p v-if="!user.name.match(/^([a-zA-Z0-9]{0,20})$/)">
              名前は1文字以上20文字以下で入力してください
            </p> -->
          </div>

          <div>
            <div>職種</div>
            <input type="radio" name="job" value="WEB" v-model="user.job" /> WEB
            <input type="radio" name="job" value="FR" v-model="user.job" /> FR
            <input type="radio" name="job" value="ML" v-model="user.job" /> ML
            <input type="radio" name="job" value="CL" v-model="user.job" /> CL
            <input type="radio" name="job" value="QA" v-model="user.job" /> QA
            <input type="radio" name="job" value="その他" /> その他
          </div>

          <div class="userRegister-details-detail-hitokoto">
            <div>ひとこと</div>
            <textarea
              class="userRegister-details-detail-hitokoto-text"
              v-model="user.comment"
            ></textarea>
            <!-- rows="5" cols="40" -->
          </div>
        </div>
      </div>

      <div class="userRegister-details2">
        <div class="userRegister-details2-inputSet">
          <p class="userRegister-details2-p">メールアドレス</p>
          <input
            v-model="user.email"
            type="email"
            class="userRegister-details2-input"
          />
          <!-- <p v-if="!user.email.match(/^([a-zA-Z0-9]{0,40})$/)">
            40文字以内で入力してください
          </p> -->
        </div>
        <div class="userRegister-details2-inputSet">
          <p class="userRegister-details2-p">パスワード</p>
          <input
            v-model="user.password"
            type="password"
            class="userRegister-details2-input"
          />
        </div>
        <div class="userRegister-details2-inputSet">
          <p class="userRegister-details2-p">パスワード(確認)</p>
          <input
            type="password"
            class="userRegister-details2-input"
            v-model="user.cPassword"
          />
        </div>
        <!-- 色とかつけたいのと、位置がずれちゃうのを治す！ -->
        <p v-if="user.password !== user.cPassword">
          パスワードが一致していません
        </p>

        <button
          type="submit"
          class="userRegister-details2-button"
          @click="UserRegisterButton"
        >
          登録する
        </button>
        <RouterLink to="/login">
          <div class="userRegister-details2-login">ログインはこちら！</div>
        </RouterLink>
      </div>
      <!-- </form> -->
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref as vueref, reactive } from "vue";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  getAuth,
} from "@firebase/auth";
import { storage, auth, db } from "../../../firebase";
import {
  getDownloadURL,
  uploadBytesResumable,
  ref,
  getStorage,
} from "firebase/storage";
import { useRouter } from "vue-router";

const iconFileName = vueref("");
const file = vueref();
const haveIcon = vueref(false);
const iconImg = vueref("../../../public/ha.png");
const user = reactive({
  name: "",
  job: "",
  comment: "",
  email: "",
  password: "",
  cPassword: "",
});
const router = useRouter();

// バリテーション

// ログイン状態の場合の処理
onMounted(() => {
  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      router.push("/top");
    } else {
      console.log("ログインしてないです");
    }
  });
});

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

// 登録ボタンの処理
const UserRegisterButton = (async) => {
  try {
    // Authenticationに登録
    createUserWithEmailAndPassword(auth, user.email, user.password)
      .then(() => {
        // Storageにアイコン登録
        console.log("アイコンの登録のターンがきたよ");
        const auth = getAuth();
        const currentUserId = auth.currentUser?.uid;
        const storageRef = ref(
          //   storage,
          //   `${currentUserId}/icon/${iconFileName.value}`
          // );
          storage,
          `icon/${iconFileName.value}`
        );
        console.log(storageRef);
        uploadBytesResumable(storageRef, file.value)
          // StorageからアイコンURLを取得
          .then(() => {
            console.log("アイコンを取得のターンがきたよ");
            const storage = getStorage();
            const starsRef = ref(storage, `icon/${iconFileName.value}`);
            getDownloadURL(starsRef).then((url) => {
              console.log(url);
              iconImg.value = url;
              console.log(iconImg);
              fetch("http://localhost:8000/Users", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  id: currentUserId,
                  icon: url,
                  name: user.name,
                  job: user.job,
                  comment: user.comment,
                  email: user.email,
                }),
              }).then((res) => res.json());
            });
          })
          // .then(() => {
          //   // jsonサーバーにデータ追加
          //   console.log("jsonサーバーにデータ追加のターンがきたよ");
          //   fetch("http://localhost:8000/Users", {
          //     method: "POST",
          //     headers: {
          //       "Content-Type": "application/json",
          //     },
          //     body: JSON.stringify({
          //       id: currentUserId,
          //       icon: iconImg.value,
          //       name: user.name,
          //       job: user.job,
          //       comment: user.comment,
          //       email: user.email,
          //     }),
          //   })
          //     .then((res) => res.json())
          //     .then(console.log);
          // })
          .then(() => {
            router.push("/top");
          });
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  } catch (e) {
    console.log(e);
  }
};
</script>

<template>
  <div class="userRegister">
    <div class="userRegister-title">移住票</div>
    <div class="userRegister-body">
      <form @submit.prevent="registerUser">
        <div class="userRegister-details">
          <div class="userRegister-details-icon">
            <div class="userRegister-details-icon-imgdiv">
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
          </div>

          <div class="userRegister-details-detail">
            <div>
              お名前
              <input
                type="text"
                class="userRegister-details-detail-name"
                v-model="user.name"
                @change="changeName"
              />
              <p v-if="userNameLength" class="val-name">
                お名前を入力してください
              </p>
              <p v-if="user.name.length > 20" class="val-name">
                お名前は20文字以下で入力してください
              </p>
            </div>

            <div class="aaa">
              <div>職種</div>
              <input type="radio" name="job" value="WEB" v-model="user.job" />
              WEB
              <input
                type="radio"
                name="job"
                value="FR"
                v-model="user.job"
                @change="changeJob"
              />
              FR
              <input
                type="radio"
                name="job"
                value="ML"
                v-model="user.job"
                @change="changeJob"
              />
              ML
              <input
                type="radio"
                name="job"
                value="CL"
                v-model="user.job"
                @change="changeJob"
              />
              CL
              <input
                type="radio"
                name="job"
                value="QA"
                v-model="user.job"
                @change="changeJob"
              />
              QA
              <input
                type="radio"
                name="job"
                value="その他"
                @change="changeJob"
              />
              その他
              <p class="val-job" v-if="userJobLength">職種を選択してください</p>
            </div>
            <div class="userRegister-details-detail-hitokoto">
              <div>ひとこと</div>
              <textarea
                class="userRegister-details-detail-hitokoto-text"
                v-model="user.comment"
                @change="changeComment"
              ></textarea>
              <p class="val-comment" v-if="userCommentLength">
                ひとことを入力してください
              </p>
              <p class="val-comment" v-if="user.comment.length > 255">
                ひとことは255文字以下で入力してください
              </p>
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
              @change="changeEmail"
            />
          </div>
          <p class="val-email" v-if="userEmailLength">
            メールアドレスを入力してください
          </p>
          <p class="val-email" v-if="user.email.length <= 0">&nbsp;</p>
          <p class="val-email" v-else-if="!emailValid(user.email)">
            メールアドレスの形式が不正です。rakus.co.jpまたはrakus-partners.co.jpのドメインを使用してください
          </p>
          <p class="val-email" v-else-if="!emailerror">
            既に登録されているメールアドレスです
          </p>
          <div class="userRegister-details2-inputSet">
            <p class="userRegister-details2-p">パスワード</p>
            <input
              v-model="user.password"
              type="password"
              class="userRegister-details2-input"
              @change="changePassword"
            />
          </div>
          <p class="val-password" v-if="userPasswordLength">
            パスワードを入力してください
          </p>
          <p class="val-password" v-if="user.password.length <= 0">&nbsp;</p>
          <p
            class="val-password2"
            v-else-if="
              !passwordValid(user.password) ||
              user.password.length < 8 ||
              user.password.length > 22
            "
          >
            パスワードは、英字小文字、英字大文字、数字を含む8文字以上22文字以内で入力してください
          </p>
          <p class="val-password2" v-else-if="emojiRegex.test(user.password)">
            パスワードに絵文字は使用できません
          </p>
          <div class="userRegister-details2-inputSet">
            <p class="userRegister-details2-p">パスワード(確認)</p>
            <input
              type="password"
              class="userRegister-details2-input"
              v-model="user.cPassword"
              @change="changecPassword"
            />
          </div>
          <p class="val-cpassword" v-if="user.cPassword.length <= 0">&nbsp;</p>
          <p class="val-cpassword" v-if="usercPasswordLength">
            パスワード(確認)を入力してください
          </p>
          <p
            class="val-cpassword2"
            v-else-if="user.cPassword !== user.password"
          >
            パスワードが一致しません
          </p>
          <button type="submit" class="userRegister-details2-button">
            登録する
          </button>
          <RouterLink to="/login">
            <div class="userRegister-details2-login">ログインはこちら！</div>
          </RouterLink>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref as vueref, reactive } from "vue";
import type { Ref } from "vue";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  getAuth,
} from "@firebase/auth";
import { storage, auth } from "../../../firebase";
import {
  getDownloadURL,
  uploadBytesResumable,
  ref,
  getStorage,
} from "firebase/storage";
import { useRouter } from "vue-router";

const emojiRegex =
  /[\uD800-\uDBFF][\uDC00-\uDFFF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/;

const userNameLength : Ref<boolean> = vueref(false);
const userJobLength: Ref<boolean> = vueref(false);
const userCommentLength : Ref<boolean>= vueref(false);
const userEmailLength : Ref<boolean>= vueref(false);
const userPasswordLength : Ref<boolean>= vueref(false);
const usercPasswordLength : Ref<boolean>= vueref(false);
const emailerror : Ref<boolean>= vueref(true);
const iconFileName: Ref<string> = vueref("");
const file:Ref<Blob> = vueref(new Blob());

const iconImg = vueref(
  "https://firebasestorage.googleapis.com/v0/b/atsumareengineernomori.appspot.com/o/icon%2Fha.png?alt=media&token=145c0742-89c6-4fdd-8702-6ab6b80d5308"
);
const user: {
  name: string;
  job: string;
  comment: string;
  email: string;
  password: string;
  cPassword: string;
} = reactive({
  name: "",
  job: "",
  comment: "",
  email: "",
  password: "",
  cPassword: "",
});
const router = useRouter();

const changeName = (e: any) => {
  userNameLength.value = false;
};

const changeJob = (e: any) => {
  userJobLength.value = false;
};

const changeComment = (e: any) => {
  userCommentLength.value = false;
};

const changeEmail = (e: any) => {
  userEmailLength.value = false;
};

const changePassword = (e: any) => {
  userPasswordLength.value = false;
};

const changecPassword = (e: any) => {
  usercPasswordLength.value = false;
};

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
const previewImage = (event: any) => {
  let reader = new FileReader();
  reader.onload = function (e:any) {
    iconImg.value = e.target.result;
  };
  reader.readAsDataURL(event.target.files[0]);
  file.value = event.target.files[0];
  iconFileName.value = event.target.files[0].name;
};

// cookieに登録
const setCookie = (myId: string) => {
  $cookies.set("myId", myId);
};

const U = async () => {
  try {
    await createUserWithEmailAndPassword(auth, user.email, user.password);
    onAuthStateChanged(auth, (user: any) => {
      if (!user) {
        console.log("ユーザーがいません");
      } else {
        setCookie(auth.currentUser.uid);
        UserRegisterButton();
      }
    });
  } catch (error) {
    emailerror.value = false;
  }
};

// 登録ボタンの処理
const UserRegisterButton = () => {
  if (
    iconImg.value !==
    "https://firebasestorage.googleapis.com/v0/b/atsumareengineernomori.appspot.com/o/icon%2Fha.png?alt=media&token=145c0742-89c6-4fdd-8702-6ab6b80d5308"
  ) {
    console.log("画像挿入されてる処理");
    const auth = getAuth();
    const currentUserId = auth.currentUser?.uid;
    const storageRef = ref(storage, `icon/${iconFileName.value}`);
    uploadBytesResumable(storageRef, file.value)
      .then(() => {
        const storage = getStorage();
        const starsRef = ref(storage, `icon/${iconFileName.value}`);
        getDownloadURL(starsRef).then((url: string) => {
          console.log(url);
          iconImg.value = url;
          fetch("http://localhost:8000/Users", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: currentUserId,
              icon: iconImg.value,
              name: user.name,
              job: user.job,
              comment: user.comment,
              email: user.email,
            }),
          }).then((res) => res.json());
        });
      })
      .then(() => {
        router.push("/top");
      });
  } else {
    console.log(`画像なしです${iconImg.value}`);
    const auth = getAuth();
    const currentUserId = auth.currentUser?.uid;
    fetch("http://localhost:8000/Users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: currentUserId,
        icon: iconImg.value,
        name: user.name,
        job: user.job,
        comment: user.comment,
        email: user.email,
      }),
    }).then(() => {
      router.push("/top");
    });
  }
};

// パスワードの入力形式チェック
const inputCheckSmall = /[a-z]/,
  inputCheckBig = /[A-Z]/,
  inputCheckNumber = /[0-9]/,
  passwordPattern = /[^]{8,20}/;

const passwordValid = (password: string) => {
  return (
    inputCheckSmall.test(password) &&
    inputCheckBig.test(password) &&
    inputCheckNumber.test(password) &&
    passwordPattern.test(password)
  );
};

// メールアドレスの入力形式チェック
const emailPattern =
  /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}(rakus\.co\.jp|rakus-partners\.co\.jp)+$/;
const emailValid = (email: string) => {
  return emailPattern.test(email);
};

const registerUser = () => {
  if (
    user.name.length <= 0 ||
    user.name.length > 20 ||
    user.job.length === 0 ||
    user.comment.length <= 0 ||
    user.comment.length > 255 ||
    user.email.length <= 0 ||
    !emailValid(user.email) ||
    !emailerror ||
    user.password.length <= 0 ||
    !passwordValid(user.password) ||
    user.password.length < 8 ||
    user.password.length > 22 ||
    user.cPassword.length <= 0 ||
    user.cPassword !== user.password ||
    emojiRegex.test(user.password)
  ) {
    console.log("入力が間違っているところがあります");
    U();
  }

  if (user.name.length <= 0) {
    userNameLength.value = true;
  }
  if (user.job.length === 0) {
    userJobLength.value = true;
  }
  if (user.comment.length <= 0) {
    userCommentLength.value = true;
  }
  if (user.email.length <= 0) {
    userEmailLength.value = true;
  }
  if (user.password.length <= 0) {
    userPasswordLength.value = true;
  }
  if (user.cPassword.length <= 0) {
    usercPasswordLength.value = true;
  }
};
</script>

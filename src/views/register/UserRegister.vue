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
              <input type="radio" name="job" value="WEB" v-model="user.job" @change="changeJob"  class="userRegister-details-detail-job"/>WEB
              <input type="radio" name="job" value="FR" v-model="user.job" @change="changeJob"  class="userRegister-details-detail-job"/> FR
              <input type="radio" name="job" value="ML" v-model="user.job" @change="changeJob"  class="userRegister-details-detail-job"/> ML
              <input type="radio" name="job" value="CL" v-model="user.job" @change="changeJob"  class="userRegister-details-detail-job"/> CL
              <input type="radio" name="job" value="QA" v-model="user.job" @change="changeJob"  class="userRegister-details-detail-job"/> QA
              <input type="radio" name="job" value="その他" v-model="user.job" @change="changeJob"  class="userRegister-details-detail-job"/> その他
              <p class="val-job" v-if=userJobLength >
                職種を選択してください
              </p>

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
            ラクスのドメインにして！！！！！
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

const userNameLength = vueref(false);
const userJobLength = vueref(false);
const userCommentLength = vueref(false);
const userEmailLength = vueref(false);
const userPasswordLength = vueref(false);
const usercPasswordLength = vueref(false);
const emailerror = vueref(true);
const iconFileName = vueref("");
const file = vueref();
// const haveIcon = vueref(false);
const iconImg = vueref(
  "https://firebasestorage.googleapis.com/v0/b/atsumareengineernomori.appspot.com/o/icon%2Fha.png?alt=media&token=145c0742-89c6-4fdd-8702-6ab6b80d5308"
);
const user = reactive({
  name: "",
  job: "",
  comment: "",
  email: "",
  password: "",
  cPassword: "",
});
const router = useRouter();

const changeName = (e) => {
  userNameLength.value = false;
};

// これ使いたい
const changeJob = (e) => {
  userJobLength.value = false;
};

const changeComment = (e) => {
  userCommentLength.value = false;
};

const changeEmail = (e) => {
  userEmailLength.value = false;
};

const changePassword = (e) => {
  userPasswordLength.value = false;
};

const changecPassword = (e) => {
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
const previewImage = (event) => {
  // haveIcon.value = true;
  let reader = new FileReader();
  reader.onload = function (e) {
    iconImg.value = e.target.result;
  };
  reader.readAsDataURL(event.target.files[0]);
  file.value = event.target.files[0];
  iconFileName.value = event.target.files[0].name;
};

// cookieに登録
const setCookie = (myId) => {
  $cookies.set("myId", myId);
};

const U = async () => {
  try {
    //Authenticationへのユーザー登録
    await createUserWithEmailAndPassword(auth, user.email, user.password);
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        console.log("ユーザーがいません");
      } else {
        setCookie(auth.currentUser.uid);
        UserRegisterButton();
      }
    });
  } catch (error) {
    // window.alert("既に登録されているメールアドレスです");
    emailerror.value = false;
  }
};

// 登録ボタンの処理
const UserRegisterButton = () => {
  // createUserWithEmailAndPassword(auth, user.email, user.password);
  if (
    iconImg.value !==
    "https://firebasestorage.googleapis.com/v0/b/atsumareengineernomori.appspot.com/o/icon%2Fha.png?alt=media&token=145c0742-89c6-4fdd-8702-6ab6b80d5308"
  ) {
    console.log("画像挿入されてる処理");
    // try {
    // Authenticationに登録
    // createUserWithEmailAndPassword(auth, user.email, user.password)
    // .then(() => {
    // Storageにアイコン登録
    const auth = getAuth();
    const currentUserId = auth.currentUser?.uid;
    const storageRef = ref(storage, `icon/${iconFileName.value}`);
    uploadBytesResumable(storageRef, file.value)
      // StorageからアイコンURLを取得
      .then(() => {
        const storage = getStorage();
        const starsRef = ref(storage, `icon/${iconFileName.value}`);
        getDownloadURL(starsRef).then((url) => {
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
    // })
    // .catch((err) => {
    //   console.log(err);
    //   throw err;
    // });
    // } catch (e) {
    //   console.log(e);
    // }
  } else {
    // Authenticationに登録
    // createUserWithEmailAndPassword(auth, user.email, user.password);
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

const passwordValid = (password) => {
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
const emailValid = (email) => {
  return emailPattern.test(email);
};

// 名前の入力形式チェック
// const namePattern = /[^]{1,}/;
// //  namePattern2 = /[^]{,20}/;
// const nameValid = (name) => {
//   return namePattern.test(name);
// };

// 職種
// const jobPattern = ""
// const jobValid = (job) => {
//   return jobPattern.test(job)
// }

// コメントの入力形式チェック
// // コメントを入力してください
// const commentPattern1 = /[^]{1,}/,
// // 255以内で入力してください
// commentPattern2 = /[^]{0,255}/;
// const commentValid = (comment) => {
//   return commentPattern1.test(comment) && commentPattern2.test(comment);
// };

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
    user.cPassword !== user.password
  ) {

    // window.alert("入力が間違っているところがあります")


    console.log("やっほ〜〜！");
  } else {
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

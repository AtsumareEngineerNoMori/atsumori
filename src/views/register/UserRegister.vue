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
        <!-- <input src="../../../public/ha.png" type="file" /> -->
      </div>

      <div class="userRegister-details-detail">
        <div>
          お名前 <input type="text" class="userRegister-details-detail-name" />
        </div>

        <div>
          <div>職種</div>
          <input type="radio" name="job" value="WEB" /> WEB
          <input type="radio" name="job" value="FR" /> FR
          <input type="radio" name="job" value="ML" /> ML
          <input type="radio" name="job" value="CL" /> CL
          <input type="radio" name="job" value="QA" /> QA
          <input type="radio" name="job" value="その他" /> その他
        </div>

        <div class="userRegister-details-detail-hitokoto">
          <div>ひとこと</div>
          <textarea
            class="userRegister-details-detail-hitokoto-text"
          ></textarea>
          <!-- rows="5" cols="40" -->
        </div>
      </div>
    </div>

    <div class="userRegister-details2">
      <div class="userRegister-details2-inputSet">
        <p class="userRegister-details2-p">メールアドレス</p>
        <input  v-model="email" type="email"  class="userRegister-details2-input" />
      </div>
      <div class="userRegister-details2-inputSet">
        <p class="userRegister-details2-p">パスワード</p>
         <input v-model="password" type="password" class="userRegister-details2-input" />
      </div>
      <div class="userRegister-details2-inputSet">
        <p class="userRegister-details2-p">パスワード(確認)</p>
         <input type="password" class="userRegister-details2-input"/>
      </div>
   
      <button type="submit" class="userRegister-details2-button"
      @click="UserRegisterButton">登録する</button>
    <RouterLink to="/login">
    <div class="userRegister-details2-login">ログインはこちら！</div>
    </RouterLink>
</div>
    <!-- </form> -->
  </div>
</div>
</template>


<script setup>
// // import {
// //   collection,
// //   doc,
// //   DocumentSnapshot,
// //   getDoc,
// //   setDoc,
// // } from "@firebase/firestore";

import { onMounted, ref } from 'vue';
import { onAuthStateChanged, createUserWithEmailAndPassword, getAuth} from "@firebase/auth";
import {  storage, auth } from "../../../firebase";
import { getDownloadURL, uploadBytesResumable,  } from "firebase/storage";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const iconFileName= ref("");
const file = ref();
const haveIcon = ref(false);
const iconImg= ref("../../../public/ha.png");

const router = useRouter();

// ログイン状態の場合の処理
onMounted(() => {
  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      router.push("/top");
    }
    else {
      console.log("ログインしてないです")
    }
  });
});

// アイコン画像プレビュー処理
const previewImage= (event) => {
  haveIcon.value = true;
  let reader= new FileReader();
  reader.onload = function (e) {
    iconImg.value = e.target.result;
  };
  reader.readAsDataURL(event.target.files[0]);
  file.value = event.target.files[0];
  iconFileName.value = event.target.files[0].name;
};

// 登録ボタンの処理
const UserRegisterButton = async => {
  try{
  // Authenticationに登録
  createUserWithEmailAndPassword(auth, email.value, password.value)
  .then(()=>{
  // Storageにアイコン登録
  const auth= getAuth();
  const currentUserId = auth.currentUser?.uid;
  const storageRef= ref(storage,`${currentUserId}/icon/${iconFileName.value}`);
  uploadBytesResumable(storageRef, file.value)
    // StorageからアイコンURLを取得        
    .then(() => {
      getDownloadURL(storageRef).then((url) => {
      iconImg.value = url;
      });
    })
    .then(() => {
    // jsonサーバーにデータ追加
    console.log("jsonサーバーにデータ追加")
    })
    .then(() => {
      router.push("/top");
    });
  })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  }catch (e) {
    console.log(e);
  }
};


</script>

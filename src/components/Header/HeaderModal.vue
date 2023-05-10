<script setup>
import { signOut } from "@firebase/auth";
import { ref } from "vue";
import { auth } from "../../../firebase";

const isShow = ref(false);
const toggleStatus = () => {
  isShow.value = !isShow.value;
};

const logout = async () => {
  await signOut(auth);
  $cookies.remove("myId");
};
</script>

<template>
  <div v-show="isShow" id="modal-1" aria-hidden="true">
    <div class="headerModal__overlay" tabindex="-1" data-micromodal-close>
      <div
        class="headerModal__container"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-1-title"
      >
        <div v-show="isShow" class="headerModal__hukidasidiv">
          <img
            src="../../../public/menuhukidasi.png"
            class="headerModal__hukidasi"
          />
        </div>
        <main class="headerModal__content" id="modal-1-content">
          <RouterLink to="/mypage">
            <div class="headerModal__listdiv-my">
              <p class="headerModal__list">マイページ</p>
            </div>
          </RouterLink>

          <RouterLink to="/islandRegister">
            <div class="headerModal__listdiv-island">
              <p class="headerModal__list">島登録</p>
            </div>
          </RouterLink>

          <RouterLink to="/projectRegister">
            <div class="headerModal__listdiv-project">
              <p class="headerModal__list">プロジェクト登録</p>
            </div>
          </RouterLink>

          <RouterLink to="/login">
            <div @click="logout" class="headerModal__listdiv">
              <p class="headerModal__list">ログアウト</p>
            </div>
          </RouterLink>

          <!-- <div class="headerModal__listdiv"><p @click="toggleStatus"
            data-micromodal-close
            aria-label="Close this dialog window"
            class="headerModal__tojiru">メニューを閉じる</p></div> -->
        </main>
      </div>
    </div>
  </div>
  <a
    @click="toggleStatus"
    data-micromodal-trigger="modal-1"
    href="javascript:;"
    class="headerModal__menudiv"
  >
    <img
      src="../../../public/sozai_cman_jp_20230418144417.png"
      class="headerModal__menu"
    />
  </a>
</template>

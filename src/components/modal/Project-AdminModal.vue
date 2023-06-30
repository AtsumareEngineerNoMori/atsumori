<script setup lang="ts">
import { watch, ref } from "vue";
import { useRouter } from "vue-router";
import { deleteChat } from "./deleteChat";

const router = useRouter();

const isShow = ref(false);
const recruitIsShow = ref(false);
const recruitId = ref<number>();

const props = defineProps<{
  recruitIshow: boolean;
  recruitId: number;
  projectId: number;
}>();

// モーダルの表示切り替え
const toggleStatus = () => {
  isShow.value = !isShow.value;
};

watch(props, async () => {
  //募集中か否か判別
  recruitIsShow.value = props.recruitIshow;
  recruitId.value = props.recruitId;
});

// 募集削除
const deleteRecruit = () => {
  const id = recruitId.value;
  fetch(`http://localhost:3000/projects/${id}/recruitNewIsland`, {
    method: "delete",
    headers: {
      "Content-Type": "application/json",
    },
  });
  recruitIsShow.value = false;
  router.go(0);
};

// プロジェクト解散
const deleteProject = async () => {
  alert("本当に削除してもよろしいですか？");
  try {
    const projectId = props.projectId;
    await fetch(`http://localhost:3000/projects/${projectId}/deleteProject`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());

    // チャット削除
    await deleteChat(projectId, "projectId");

    router.push("/top");
  } catch (e) {
    console.log(e);
  }
};

// 遷移
const editRouter = () => {
  router.push({ name: "projectEdit", params: { id: props.projectId } });
};
const recruitRouter = () => {
  router.push({
    name: "recruitIslandRegister",
    params: { id: props.projectId },
  });
};
</script>
<template>
  <div v-show="isShow" id="modal-1" aria-hidden="true">
    <div class="modal__overlay" tabindex="-1" data-micromodal-close>
      <div
        class="modal__container"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-1-title"
      >
        <header class="modal__header">
          <h2 class="modal__title" id="modal-1-title">
            プロジェクト管理者専用
          </h2>
        </header>
        <main class="modal__content" id="modal-1-content">
          <div class="adminModal">
            <button @click="editRouter" class="adminModal__btn">編集</button>

            <button
              v-show="!recruitIsShow"
              @click="recruitRouter"
              class="adminModal__btn"
            >
              募集作成
            </button>
            <button
              v-show="recruitIsShow"
              @click="deleteRecruit"
              class="adminModal__btn stop"
            >
              募集削除
            </button>
            <button @click="deleteProject" class="adminModal__btn stop">
              解散
            </button>
          </div>
        </main>
        <footer class="modal__footer">
          <button
            @click="toggleStatus"
            class="modal__btn"
            data-micromodal-close
            aria-label="Close this dialog window"
          >
            Close
          </button>
        </footer>
      </div>
    </div>
  </div>
  <a
    @click="toggleStatus"
    data-micromodal-trigger="modal-1"
    href="javascript:;"
  >
    <span class="material-symbols-rounded set"> settings </span>
  </a>
</template>

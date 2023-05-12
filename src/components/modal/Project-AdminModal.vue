<script setup>
import { watch, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const isShow = ref(false);
const recruitIsShow = ref(false);
const recruitData = ref();

const props = defineProps({
  projectId: Number,
});

// モーダルの表示切り替え
const toggleStatus = () => {
  isShow.value = !isShow.value;
};

watch(props, async () => {
  //募集中か否か判別
  const projectId = props.projectId;
  const recruit = await fetch(
    `http://localhost:8000/RecruitNewIsland?projectId=${projectId}`
  ).then((res) => res.json());

  if (recruit.length >= 1) {
    recruitIsShow.value = true;
    recruitData.value = recruit[0];
  }
});

// 募集削除
const deleteRecruit = () => {
  const recruitId = recruitData.value.id;
  fetch(`http://localhost:8000/RecruitNewIsland/${recruitId}`, {
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

    const db = ["RequestProject", "JoinProjects", "IslandScout"];
    const ids = [];

    //削除するプロジェクトの関連データのidを取得
    for (let i of db) {
      const datas = await fetch(
        `http://localhost:8000/${i}?projectId=${projectId}`
      ).then((res) => res.json());
      const dataIds = datas.map((dataId) => dataId.id);
      ids.push(dataIds);
    }

    // 削除するプロジェクトの関連データの削除
    for (let i = 0; i < db.length; i++) {
      if (ids[i].length > 0) {
        for (let id of ids[i]) {
          await fetch(`http://localhost:8000/${db[i]}/${id}`, {
            method: "delete",
            headers: {
              "Content-Type": "application/json",
            },
          });
        }
      }
    }

    // 募集削除（あったら）
    if (recruitIsShow.value) {
      await fetch(
        `http://localhost:8000/RecruitNewIsland/${recruitData.value.id}`,
        {
          method: "delete",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    // プロジェクトの削除
    await fetch(`http://localhost:8000/projects/${projectId}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
    });

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

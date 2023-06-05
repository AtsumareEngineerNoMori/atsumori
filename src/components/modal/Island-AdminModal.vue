<script setup lang="ts">
import { watch, ref } from "vue";
import { useRouter } from "vue-router";
import { realtimeDB } from "../../firebase";

import {
  ref as dbRef,
  orderByChild,
  query,
  startAt,
  endAt,
  remove,
  get,
} from "firebase/database";
import { myIdJudge } from "../../userJudge";

type Projects = {
  projectName: string;
  projectDescription: string;
  adminId: string;
  createDate: Date;
  icon: string;
  adminIslandId: number;
  id: number;
};

const router = useRouter();

const isShow = ref(false);
const recruitIsShow = ref(false);
const recruitData = ref();

const props = defineProps({
  islandId: Number,
});

// モーダル表示切り替え
const toggleStatus = () => {
  isShow.value = !isShow.value;
};

watch(props, async () => {
  // 募集中か否か判別
  const islandId = props.islandId;

  const recruit = await fetch(
    `http://localhost:8000/RecruitNewUser?islandId=${islandId}`
  ).then((res) => res.json());

  if (recruit.length >= 1) {
    recruitIsShow.value = true;
    recruitData.value = recruit[0];
  }
});

// 募集削除
const deleteRecruit = () => {
  const recruitId = recruitData.value.id;
  fetch(`http://localhost:8000/RecruitNewUser/${recruitId}`, {
    method: "delete",
    headers: {
      "Content-Type": "application/json",
    },
  });
  recruitIsShow.value = false;
  router.go(0);
};

// 島解散
const deleteIsland = async () => {
  alert("本当に削除してもよろしいですか？");
  try {
    const islandId = props.islandId;
    const db = [
      "RequestIsland",
      "RequestProject",
      "JoinIslands",
      "JoinProjects",
      "UserScout",
      "IslandScout",
    ];
    const ids = [];

    //削除する島の関連データのidを取得
    for (let i of db) {
      const datas = await fetch(
        `http://localhost:8000/${i}?islandId=${islandId}`
      ).then((res) => res.json());
      const dataIds = datas.map((data: any) => data.id);
      ids.push(dataIds);
    }

    // 削除する島の関連データの削除
    for (let i = 0; i < db.length; i++) {
      if (ids[i].length > 0) {
        for (let id of ids[i]) {
          console.log(db[i], id);
          await fetch(`http://localhost:8000/${db[i]}/${id}`, {
            method: "delete",
            headers: {
              "Content-Type": "application/json",
            },
          });
        }
      }
    }

    // チャット削除
    const q = query(
      dbRef(realtimeDB, myIdJudge()),
      orderByChild("islandId"),
      startAt(String(islandId)),
      endAt(String(islandId))
    );
    await get(q).then((snapshot) => {
      snapshot.forEach((a) => {
        remove(a.ref);
      });
    });

    // 募集削除（あったら）
    if (recruitIsShow.value) {
      await fetch(
        `http://localhost:8000/RecruitNewUser/${recruitData.value.id}`,
        {
          method: "delete",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    // 管理島のプロジェクト削除
    const projects = await fetch(
      `http://localhost:8000/Projects?adminIslandId=${islandId}`
    ).then((res) => res.json());

    if (projects.length > 0) {
      const projectIds = projects.map((project: Projects) => project.id);
      const projectDb = [
        "RequestProject",
        "JoinProjects",
        "IslandScout",
        "RecruitNewIsland",
      ];
      let ids = [];

      for (let projectId of projectIds) {
        console.log(projectId);
        ids = [];
        //削除するプロジェクトの関連データのidを取得
        for (let i of projectDb) {
          const datas = await fetch(
            `http://localhost:8000/${i}?projectId=${projectId}`
          ).then((res) => res.json());
          const dataIds = datas.map((dataId: any) => dataId.id);
          ids.push(dataIds);
        }

        // 削除するプロジェクトの関連データの削除
        for (let i = 0; i < projectDb.length; i++) {
          if (ids[i].length > 0) {
            for (let id of ids[i]) {
              console.log(projectDb[i], id);
              await fetch(`http://localhost:8000/${projectDb[i]}/${id}`, {
                method: "delete",
                headers: {
                  "Content-Type": "application/json",
                },
              });
            }
          }
        }

        // チャット削除
        const q = query(
          dbRef(realtimeDB, myIdJudge()),
          orderByChild("projectId"),
          startAt(String(projectId)),
          endAt(String(projectId))
        );
        await get(q).then((snapshot) => {
          snapshot.forEach((a) => {
            remove(a.ref);
          });
        });

        // プロジェクト削除
        await fetch(`http://localhost:8000/Projects/${projectId}`, {
          method: "delete",
          headers: {
            "Content-Type": "application/json",
          },
        });
      }
    }

    // 島の削除
    await fetch(`http://localhost:8000/Islands/${islandId}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
    });

    await router.push("/top");
  } catch (e) {
    console.log(e);
  }
};

// 遷移
const editRouter = () => {
  router.push({ name: "islandEdit", params: { id: props.islandId } });
};
const recruitRouter = () => {
  router.push({ name: "recruitUserRegister", params: { id: props.islandId } });
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
          <h2 class="modal__title" id="modal-1-title">島管理者専用</h2>
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
            <button @click="deleteIsland" class="adminModal__btn stop">
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

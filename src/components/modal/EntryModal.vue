<script setup lang="ts">
import { watch, ref, computed } from "vue";

type Islands = {
  islandName: string;
  islandDescription: string;
  adminId: string;
  createDate: Date;
  icon: string;
  id: number;
};

const isShow = ref(false);
const joinIsland = ref<Islands[]>([]);
const selectIsland = ref<number>();
const pageShow = ref(false);
const errorIsShow = ref(false);

const props = defineProps({
  projectId: Number,
  myId: String,
});

// モーダル表示切り替え
const toggleStatus = () => {
  isShow.value = !isShow.value;
};
// エラーメッセージ
const errorMessage = computed(() => {
  return errorIsShow.value === true && selectIsland.value === undefined;
});

watch(props, async () => {
  const joinIslandDatas = await fetch(
    `http://localhost:8000/JoinIslands?userId=${props.myId}`
  ).then((res) => res.json());

  if (joinIslandDatas.length > 0) {
    pageShow.value = true;
  }

  for (let joinIslandData of joinIslandDatas) {
    const island = await fetch(
      `http://localhost:8000/Islands/${joinIslandData.islandId}`
    ).then((res) => res.json());

    let islands = false;
    for (let i = 0; i < joinIsland.value.length; i++) {
      if (joinIsland.value[i].id === joinIslandData.islandId) {
        islands = true;
        break;
      }
    }
    if (!islands) {
      joinIsland.value.push(island);
    }
  }
});

// 申請する
const asign = () => {
  if (selectIsland.value !== undefined) {
    fetch("http://localhost:8000/RequestProject", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        projectId: props.projectId,
        islandId: selectIsland.value,
      }),
    });
    toggleStatus();
  } else {
    errorIsShow.value = true;
  }
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
        v-show="!pageShow"
      >
        <main class="modal__content" id="modal-1-content">
          <p class="entryModal__text">まずは島に参加しよう！</p>
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
      <div
        class="modal__container"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-1-title"
        v-show="pageShow"
      >
        <header class="modal__header">
          <h2 class="modal__title" id="modal-1-title">
            <label for="island-select">どの島から参加しますか？</label>
          </h2>
        </header>
        <main class="modal__content" id="modal-1-content">
          <select
            name="island"
            id="island-select"
            v-model="selectIsland"
            class="entryModal__select"
          >
            <option v-for="island in joinIsland" :value="island.id" selected>
              {{ island.islandName }}
            </option>
          </select>
          <p v-if="errorMessage" class="entryModal__error">
            参加する島を選択してください。
          </p>
        </main>

        <footer class="modal__footer">
          <button @click="asign" class="entryModal__btn">申請</button>
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
    <button class="showBtn showEntry">プロジェクト申請</button>
  </a>
</template>

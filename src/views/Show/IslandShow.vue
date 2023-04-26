<script setup>
import AdminModal from "../../components/modal/Island-AdminModal.vue";
import SideMember from "../../components/islandShow/SideMember.vue";
import SideScout from "../../components/islandShow/SideScout.vue";
import ShowBtn from "../../components/islandShow/ShowBtn.vue";
import { adminJudge } from "../../userJudge";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const island = ref([]);
const adminId = ref(null);
const adminName = ref();
const userJudges = ref(null);

onMounted(async () => {
  const id = route.params.id;
  const islandData = await fetch(`http://localhost:8000/Islands/${id}`).then(
    (res) => res.json()
  );
  island.value = islandData;
  adminId.value = islandData.adminId;

  // ユーザーの判別
  userJudges.value = adminJudge(adminId.value);

  const adminData = await fetch(
    `http://localhost:8000/Users/${islandData.adminId}`
  ).then((res) => res.json());
  adminName.value = adminData.name;
});
</script>

<template>
  <div class="detail">
    <div class="detail__user">
      <img
        src="../../../public/beach-1824855_1920.jpg"
        class="detail__user__header"
      />
      <div class="detail__user__icon">
        <img src="../../../public/atsumare engimeer no Mori.png" class="icon" />
        <div class="detail__user__icon__text">
          <p class="detail__user__icon__text__name">{{ island.islandName }}</p>
          <div>
            <span class="detail__user__icon__text__admin">管理者</span>
            <span>{{ adminName }}</span>
          </div>
        </div>
      </div>

      <div v-show="userJudges === 1" class="detail__user__setting">
        <AdminModal :islandId="island.id" />
      </div>
    </div>

    <div class="detail__btn">
      <ShowBtn :islandId="island.id" />
    </div>

    <div class="detail__desc">
      <p class="detail__desc__title">島情報</p>
      <p class="detail__desc__text">{{ island.islandDescription }}</p>
    </div>

    <div class="detail__member">
      <SideMember :islandId="island.id" :adminId="adminId" />
    </div>

    <div class="detail__scout">
      <SideScout :islandId="island.id" :userJudge="userJudges" />
    </div>
  </div>
</template>

<script setup>
import AdminModal from "../../components/modal/AdminModal.vue";
import SideMember from "../../components/islandShow/SideMember.vue";
import SideScout from "../../components/islandShow/SideScout.vue";
import ShowBtn from "../../components/islandShow/ShowBtn.vue";
</script>

<template>
  <div class="detail">
    <div class="detail__image">
      <img
        src="../../../public/beach-1824855_1920.jpg"
        class="detail__image__header"
      />
      <div class="detail__image__icon">
        <img src="../../../public/atsumare engimeer no Mori.png" class="icon" />
        <div class="detail__image__icon__text">
          <p class="detail__image__icon__text__name">aaaaaaa</p>
          <p class="detail__image__icon__text__admin">管理者:bbbbbb</p>
        </div>
      </div>

      <div class="detail__image__setting">
        <AdminModal />
      </div>
    </div>

    <div class="detail__btn">
      <ShowBtn />
    </div>

    <div class="detail__desc">
      島情報島情報島情報島情報島情報島情報島情報島情報島情報島情報島情報島情報島情報島情報島情報島情報島情報島情報島情報島情報島情報島情報島情報
      島情報島情報島情報島情報島情報島情報島情報島情報島情報島情報島情報島情報島情報島情報島情報島情報島情報島情報島情報島情報島情報島情報島情報
      島情報島情報島情報島情報島情報島情報島情報島情報島情報島情報島情報島情報島情報島情報島情報島情報島情報島情報島情報島情報島情報島情報島情報
      島情報島情報島情報島情報島情報島情報島情報島情報島情報島情報島情報島情報島情報島情報島情報島情報島情報島情報島情報島情報島情報島情報島情報
    </div>

    <div class="detail__member">
      <SideMember />
    </div>

    <div class="detail__scout">
      <SideScout />
    </div>
  </div>
</template>

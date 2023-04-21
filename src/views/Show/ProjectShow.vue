<script setup>
import AdminModal from "../../components/modal/Project-AdminModal.vue";
import SideMember from "../../components/projectShow/SideMember.vue";
import ShowBtn from "../../components/projectShow/ShowBtn.vue";
</script>

<template>
  <div class="projectDetail">
    <div class="projectDetail__user">
      <img
        src="../../../public/projectHeader.jpg"
        class="projectDetail__user__header"
      />
      <div class="projectDetail__user__icon">
        <img src="../../../public/atsumare engimeer no Mori.png" class="icon" />
        <div class="projectDetail__user__icon__text">
          <p class="projectDetail__user__icon__text__name">
            あつ森プロジェクト
          </p>
          <div>
            <span class="projectDetail__user__icon__text__admin">管理者</span>
            <span>たぬきち</span>
          </div>
        </div>
      </div>

      <div class="projectDetail__user__setting">
        <AdminModal />
      </div>
    </div>

    <div class="projectDetail__btn">
      <ShowBtn />
    </div>

    <div class="projectDetail__desc">
      プロジェクト詳細プロジェクト詳細プロジェクト詳細プロジェクト詳細プロジェクト詳細プロジェクト
      詳細プロジェクト詳細プロジェクト詳細プロジェクト詳細プロジェクト詳細プロジェクト詳細プロジェクト詳細プロジェクト
      詳細プロジェクト詳細プロジェクト詳細プロジェクト詳細プロジェクト詳細プロジェクト詳細プロジェクト詳細プロジェクト
      詳細プロジェクト詳細プロジェクト詳細
    </div>

    <div class="projectDetail__member">
      <SideMember />
    </div>
  </div>
</template>

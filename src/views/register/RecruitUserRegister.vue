<template>
  <div class="RecruitUserRegister">
    <div class="RecruitUserRegister-title">募集登録</div>

    <div class="RecruitUserRegister-details">
      <div>
        <p class="RecruitUserRegister-details-name">取得した島名を表示</p>
      </div>
      <div class="RecruitUserRegister-details-recruitTitleSet">
        <p class="RecruitUserRegister-details-recruitTitleSet-title"
        >募集タイトル</p>
        <input class="RecruitUserRegister-details-recruitTitleSet-input"
        type="text" />
      </div>
      <div class="RecruitUserRegister-details-jobSet-job">
        <p>募集職種</p>
        <input type="radio" name="job" value="WEB" /> WEB
        <input type="radio" name="job" value="FR" /> FR
        <input type="radio" name="job" value="ML" /> ML
        <input type="radio" name="job" value="CL" /> CL
        <input type="radio" name="job" value="QA" /> QA
        <input type="radio" name="job" value="その他" /> その他
      </div>
      <div>
        <p class="RecruitUserRegister-details-infomationSet-infomation">募集要項</p>
        <textarea class="RecruitUserRegister-details-infomationSet-text"
        ></textarea>
      </div>
      <div class="RecruitUserRegister-buttonset">
        <button class="RecruitUserRegister-button">登録する</button>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<template>
    <div class="RecruitIslandRegister">
      <div class="RecruitIslandRegister-title">募集登録</div>
  
      <div class="RecruitIslandRegister-details">
        <div>
          <p class="RecruitIslandRegister-details-name">取得したプロジェクトを表示</p>
        </div>
        <div class="RecruitIslandRegister-details-recruitTitleSet">
          <p class="RecruitIslandRegister-details-recruitTitleSet-title"
          >募集タイトル</p>
          <input class="RecruitIslandRegister-details-recruitTitleSet-input"
          type="text" />
        </div>
        <div class="RecruitIslandRegister-details-jobSet-job">
          <p>募集職種</p>
          <input type="radio" name="job" value="WEB" /> WEB
          <input type="radio" name="job" value="FR" /> FR
          <input type="radio" name="job" value="ML" /> ML
          <input type="radio" name="job" value="CL" /> CL
          <input type="radio" name="job" value="QA" /> QA
          <input type="radio" name="job" value="その他" /> その他
        </div>
        <div>
          <p class="RecruitIslandRegister-details-infomationSet-infomation">募集要項</p>
          <textarea class="RecruitIslandRegister-details-infomationSet-text"
          ></textarea>
        </div>
        <div class="RecruitIslandRegister-buttonset">
          <button class="RecruitIslandRegister-button">登録する</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup></script>

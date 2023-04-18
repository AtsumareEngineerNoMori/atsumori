<template>
  <div class="userRegister">
  <div class="userRegister-title">移住票</div>
  <div class="userRegister-body">
    <!-- <form method="post" action="example.cgi"> -->

    <div class="userRegister-details">
      <div class="userRegister-details-icon">
        <div class="userRegister-details-icon-imgdiv">
          <img
            class="userRegister-details-icon-img"
            src="../../../public/ha.png"
          />
        </div>
        <!-- <input src="../../../public/ha.png" type="file" /> -->
      </div>

      <div class="userRegister-details-detail">
        <div>
          お名前 <input type="text" class="userRegister-details-detail-name" />
        </div>

        <div>
          <div>職種</div>
          <input type="radio" name="job" value="WEB" /> WEB
          <input type="radio" name="job" value="FR" /> FR
          <input type="radio" name="job" value="ML" /> ML
          <input type="radio" name="job" value="CL" /> CL
          <input type="radio" name="job" value="QA" /> QA
          <input type="radio" name="job" value="その他" /> その他
        </div>

        <div class="userRegister-details-detail-hitokoto">
          <div>ひとこと</div>
          <textarea
            class="userRegister-details-detail-hitokoto-text"
          ></textarea>
          <!-- rows="5" cols="40" -->
        </div>
      </div>
    </div>

    <div class="userRegister-details2">
      <div class="userRegister-details2-inputSet">
        <p class="userRegister-details2-p">メールアドレス</p>
        <input type="email" class="userRegister-details2-input"/>
      </div>
      <div class="userRegister-details2-inputSet">
        <p class="userRegister-details2-p">パスワード</p>
         <input type="password" class="userRegister-details2-input"/>
      </div>
      <div class="userRegister-details2-inputSet">
        <p class="userRegister-details2-p">パスワード(確認)</p>
         <input type="password" class="userRegister-details2-input"/>
      </div>
   
    <RouterLink to="/"><button type="submit" class="userRegister-details2-button">登録する</button></RouterLink>
</div>
    <!-- </form> -->
  </div>
</div>
</template>

<script setup></script>

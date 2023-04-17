<template>
    <div>移住票</div>

<form method="post" action="example.cgi">
    <div><input type="image"/></div>
    <div>お名前 <input type="text" /></div>
    <div>
    <input type="radio" name="job" value="WEB"> WEB
    <input type="radio" name="job" value="FR"> FR  
    <input type="radio" name="job" value="ML"> ML
    <input type="radio" name="job" value="CL"> CL
    <input type="radio" name="job" value="QA"> QA
    <input type="radio" name="job" value="その他"> その他
    </div>
    <div>
    <div>ひとこと</div>
    <textarea rows="10" cols="60" />
    </div>
    <div>メールアドレス <input type="email" /></div>
    <div>パスワード <input type="password" /></div>
    <div>パスワード(確認) <input type="password" /></div>
    <RouterLink to="/"><button type="submit">登録する</button></RouterLink>
</form>
</template>


<script setup> 
</script>

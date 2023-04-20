   <!-- 一覧を表示、検索は再検索用 -->
<template>
  <div class="search">
    <section>
      <h3 class="search_title">プロジェクト 募集一覧</h3>
    </section>

    <div class="island_search">
      <form action="どこから取ってくるかURL" method="get">
        <p>キーワードを入力してください。</p>
        <input
          type="search"
          name="search"
          placeholder="キーワードを入力"
          class="search_box"
        />
        <input type="submit" name="submit" value="検索" class="search_btn" />
      </form>
    </div>

  
    <!-- 結果 -->
  </div>
</template>

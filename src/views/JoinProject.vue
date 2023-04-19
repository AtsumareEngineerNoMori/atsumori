<script setup>
import "../css/main.css";

const array = [
  {
    icon: "https://4.bp.blogspot.com/-a7WEvuIz_-4/W1vhClOop5I/AAAAAAABNtY/FjTJQ-3P41AFPX8QSCZXLU05YgKc8xntACLcBGAs/s400/character_earth_chikyu.png",
    name: "プロジェクトの名前",
  },
  {
    icon: "https://4.bp.blogspot.com/-a7WEvuIz_-4/W1vhClOop5I/AAAAAAABNtY/FjTJQ-3P41AFPX8QSCZXLU05YgKc8xntACLcBGAs/s400/character_earth_chikyu.png",
    name: "プロジェクトの名前",
  },
  {
    icon: "https://4.bp.blogspot.com/-a7WEvuIz_-4/W1vhClOop5I/AAAAAAABNtY/FjTJQ-3P41AFPX8QSCZXLU05YgKc8xntACLcBGAs/s400/character_earth_chikyu.png",
    name: "プロジェクトの名前",
  },
  {
    icon: "https://4.bp.blogspot.com/-a7WEvuIz_-4/W1vhClOop5I/AAAAAAABNtY/FjTJQ-3P41AFPX8QSCZXLU05YgKc8xntACLcBGAs/s400/character_earth_chikyu.png",
    name: "プロジェクトの名前",
  },
  {
    icon: "https://4.bp.blogspot.com/-a7WEvuIz_-4/W1vhClOop5I/AAAAAAABNtY/FjTJQ-3P41AFPX8QSCZXLU05YgKc8xntACLcBGAs/s400/character_earth_chikyu.png",
    name: "プロジェクトの名前",
  },
  {
    icon: "https://4.bp.blogspot.com/-a7WEvuIz_-4/W1vhClOop5I/AAAAAAABNtY/FjTJQ-3P41AFPX8QSCZXLU05YgKc8xntACLcBGAs/s400/character_earth_chikyu.png",
    name: "プロジェクトの名前",
  },
];
</script>

<template>
  <div class="join">
    <section>
      <p class="join__title">参加しているプロジェクト</p>
    </section>
    <section class="join__list">
      <!-- リンク先かえる -->
      <div v-for="project in array" :key="project" class="join__item">
        <RouterLink v-bind:to="{ name: 'joinProject' }">
          <img v-bind:src="project.icon" alt="project" class="join__iconImg" />
          <p class="join__name">{{ project.name }}</p>
        </RouterLink>
      </div>
    </section>
  </div>
</template>

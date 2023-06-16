<script setup lang="ts">
import { ref } from "vue";
import type { Ref } from "vue";
import { defineProps } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
  table: String,
  witch: String,
  title: String,
});

const arrayIsland: Ref<{ id: number; icon: string; islandName: string }[]> =
  ref([]);
const arrayProject: Ref<{ id: number; icon: string; projectName: string }[]> =
  ref([]);

if (props.witch === "island") {
  const get = async () => {
    const response = await fetch(
      `http://localhost:3000/${props.table}/?_limit=6&_sort=createDate&_order=desc`
    );
    const data = await response.json();
    if (props.table === "recruitIslandsTop") {
      const islandArray = await data.map((item: any) => item.islands);
      arrayIsland.value = islandArray;
    } else {
      arrayIsland.value = data;
    }
  };
  get();
} else if (props.witch === "project") {
  const get = async () => {
    const response = await fetch(
      `http://localhost:3000/${props.table}/?_limit=6&_sort=createDate&_order=desc`
    );
    const data = await response.json();
    if (props.table === "recruitProjectsTop") {
      const projectArray = await data.map((item: any) => item.projects);
      arrayProject.value = projectArray;
    } else {
      arrayProject.value = data;
    }
  };
  get();
}
</script>

<template>
  <div class="top-new-set">
    <p class="top-new-set-title">{{ props.title }}</p>

    <section class="top-new-set-list">
      <template v-if="props.witch === 'island'">
        <div
          v-for="infomation in arrayIsland"
          :key="infomation.id"
          class="top-new-set-item"
        >
          <RouterLink
            :to="{ name: 'islandShow', params: { id: infomation.id } }"
          >
            <img
              :src="infomation.icon"
              alt="ifomation"
              class="top-new-set-img"
            />
            <p class="top-new-set-name">{{ infomation.islandName }}</p>
          </RouterLink>
        </div>
      </template>

      <template v-if="props.witch === 'project'">
        <div
          v-for="infomation in arrayProject"
          :key="infomation.id"
          class="top-new-set-item"
        >
          <RouterLink
            :to="{ name: 'projectShow', params: { id: infomation.id } }"
          >
            <img
              :src="infomation.icon"
              alt="ifomation"
              class="top-new-set-img"
            />
            <p class="top-new-set-name">{{ infomation.projectName }}</p>
          </RouterLink>
        </div>
      </template>
    </section>
  </div>
</template>

import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TopTest from "../views/TopTest.vue"
import MyPage from "../views/MyPage.vue"
import MyPageEdit from "../views/MyPageEdit.vue"
import IslandEdit from "../views/IslandEdit.vue"
import ProjectEdit from "../views/ProjectEdit.vue"
import OtherMyPage from "../views/OtherMyPage.vue"
import MyPageForScout from "../views/MyPageForScout.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/top',
      name: 'top',
      component: TopTest
    },
    {
      path: '/mypage',
      name: 'mypage',
      component: MyPage
    },
    {
      path: '/joinIsland',
      name: 'joinIsland',
      component: () => import('../views/JoinIsland.vue')
    },
    {
      path: '/mypageedit',
      name: 'mypageedit',
      component: MyPageEdit
    },
    {
      path: '/othermypage',
      name: 'othermypageedit',
      component: OtherMyPage
    },
    {
      path: '/mypageforscout',
      name: 'mypageforscout',
      component: MyPageForScout
    },
    {
      path: '/islandEdit',
      name: 'islandEdit',
      component: IslandEdit
    },
    {
      path: '/islandEdit',
      name: 'islandEdit',
      component: IslandEdit
    },
    {
      path: '/prijectEdit',
      name: 'projectEdit',
      component: ProjectEdit
    },
  ]
})

export default router

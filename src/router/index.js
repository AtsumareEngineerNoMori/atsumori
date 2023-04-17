import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TopTest from "../views/TopTest.vue"

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
      path: '/joinIsland',
      name: 'joinIsland',
      component: () => import('../views/JoinIsland.vue')
    },
    {
      path: '/joinProject',
      name: 'joinProject',
      component: () => import('../views/JoinProject.vue')
    },
    {
      path: '/userScout',
      name: 'userScout',
      component: () => import('../views/userScout.vue')
    },
  ]
})

export default router

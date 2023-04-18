import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/Login.vue'
import TopTest from "../views/TopTest.vue"
import UserRegisterView from "../views/register/UserRegister.vue"
import IslandRegisterView from "../views/register/IslandRegister.vue"
import ProjectRegisterView from "../views/register/ProjectRegister.vue"
import  RecruitUserRegister from "../views/register/RecruitUserRegister.vue"
import  RecruitIslandRegister from "../views/register/RecruitIslandRegister.vue"

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
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/userRegister',
      name: 'userRegister',
      component:  UserRegisterView
    },
    {
      path: '/islandRegister',
      name: 'islandRegister',
      component:  IslandRegisterView
    },
    {
      path: '/projectRegister',
      name: 'projectRegister',
      component:  ProjectRegisterView
    },
    {
      path: '/recruitUserRegister',
      name: 'recruitUserRegister',
      component:  RecruitUserRegister
    },
    {
      path: '/recruitIslandRegister',
      name: 'recruitIslandRegister',
      component:  RecruitIslandRegister
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
    {
      path: '/islandChat',
      name: 'islandChat',
      component: () => import('../views/chat/islandChat.vue')
    },
  ]
})

export default router

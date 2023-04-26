import IslandShow from "../views/Show/IslandShow.vue";
import ProjectShow from "../views/Show/ProjectShow.vue";
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/Login.vue";
import TopTest from "../views/TopTest.vue";
import UserRegisterView from "../views/register/UserRegister.vue";
import IlandRegisterView from "../views/register/IlandRegister.vue";
import ProjectRegisterView from "../views/register/ProjectRegister.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/userRegister",
      name: "userRegister",
      component: UserRegisterView,
    },
    {
      path: "/ilandRegister",
      name: "ilandRegister",
      component: IlandRegisterView,
    },
    {
      path: "/projectRegister",
      name: "projectRegister",
      component: ProjectRegisterView,
    },
    {
      path: "/top",
      name: "top",
      component: TopTest,
    },
    {
      path: "/islandShow/:id",
      name: "islandShow",
      component: IslandShow,
    },
    {
      path: "/projectShow/:id",
      name: "projectShow",
      component: ProjectShow,
    },
    {
      path: "/joinIsland",
      name: "joinIsland",
      component: () => import("../views/JoinIsland.vue"),
    },
    {
      path: "/joinProject",
      name: "joinProject",
      component: () => import("../views/JoinProject.vue"),
    },
    {
      path: "/userScout",
      name: "userScout",
      component: () => import("../views/userScout.vue"),
    },
    {
      path: "/islandChat",
      name: "islandChat",
      component: () => import("../views/chat/islandChat.vue"),
    },
  ],
});

// 遷移元のURLを特定
router.beforeEach((to, from, next) => {
  router["referrer"] = from;
  router["to"] = to;
  next();
});

export default router;

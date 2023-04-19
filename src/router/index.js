import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
// import TopTest from "../views/TopTest.vue";
import IslandReqList from "../views/ReqList/IslandReqList.vue";
import ProjectReqList from "../views/ReqList/ProjectReqList.vue";
import SerchIslandResult from "../views/Serch/SerchIslandResult.vue";
import SerchProResult from "../views/Serch/SerchProResult.vue";
import SerchReqIslandResult from "../views/Serch/SerchReqIslandResult.vue";
import SerchReqProResult from "../views/Serch/SerchReqProResult.vue";
import ScoutIsland from "../views/Scout/ScoutIsland.vue";
import ScoutPeople from "../views/Scout/ScoutPeople.vue";
import IslandShow from "../views/Show/IslandShow.vue";
import LoginView from "../views/Login.vue";
// import TopTest from "../views/TopTest.vue";
import MyPage from "../views/MyPage.vue";
import MyPageEdit from "../views/MyPageEdit.vue";
import IslandEdit from "../views/IslandEdit.vue";
import ProjectEdit from "../views/ProjectEdit.vue";
import IslandAdmissionRequest from "../views/IslandAdmissionRequest.vue";
import OtherMyPage from "../views/OtherMyPage.vue";
import MyPageForScout from "../views/MyPageForScout.vue";
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
      path: "/mypage",
      name: "mypage",
      component: MyPage,
    },
    {
      path: "/joinIsland",
      name: "joinIsland",
      component: () => import("../views/JoinIsland.vue"),
    },
    {
      path: "/mypageedit",
      name: "mypageedit",
      component: MyPageEdit,
    },
    {
      path: "/othermypage",
      name: "othermypageedit",
      component: OtherMyPage,
    },
    {
      path: "/mypageforscout",
      name: "mypageforscout",
      component: MyPageForScout,
    },
    {
      path: "/islandEdit",
      name: "islandEdit",
      component: IslandEdit,
    },
    {
      path: "/islandEdit",
      name: "islandEdit",
      component: IslandEdit,
    },
    {
      path: "/prijectEdit",
      name: "projectEdit",
      component: ProjectEdit,
    },
    {
      path: "/islandadmissionrequest",
      name: "islandadmissionrequest",
      component: IslandAdmissionRequest,
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
    // {
    //   path: "/top",
    //   name: "top",
    //   component: TopTest,
    // },
    {
      path: "/islandReqList",
      name: "islandReqList",
      component: IslandReqList,
    },
    {
      path: "/show",
      name: "show",
      component: IslandShow,
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
    {
      path: "/projectChat",
      name: "projectChat",
      component: () => import("../views/chat/projectChat.vue"),
    },
    {
      path: "/projectReqList",
      name: "projectReqList",
      component: ProjectReqList,
    },
    {
      path: "/serchIslandResult",
      name: "serchIslandResult",
      component: SerchIslandResult,
    },
    {
      path: "/serchProResult",
      name: "serchProResult",
      component: SerchProResult,
    },
    {
      path: "/serchReqIslandResult",
      name: "serchReqIslandResult",
      component: SerchReqIslandResult,
    },
    {
      path: "/serchReqProResult",
      name: "serchReqProResult",
      component: SerchReqProResult,
    },
    {
      path: "/scoutIsland",
      name: "scoutIsland",
      component: ScoutIsland,
    },
    {
      path: "/scoutPeople",
      name: "scoutPeople",
      component: ScoutPeople,
    },
    {
      path: "/joinIsland",
      name: "joinIsland",
      component: () => import("../views/JoinIsland.vue"),
    },
  ],
});

export default router;

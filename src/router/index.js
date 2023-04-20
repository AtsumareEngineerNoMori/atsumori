import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import IslandReqList from "../views/ReqList/IslandReqList.vue";
import ProjectReqList from "../views/ReqList/ProjectReqList.vue";
import SearchIslandResult from "../views/Search/SearchIslandResult.vue";
import SearchProResult from "../views/Search/SearchProResult.vue";
import SearchReqIslandResult from "../views/Search/SearchReqIslandResult.vue";
import SearchReqProResult from "../views/Search/SearchReqProResult.vue";
import ScoutIsland from "../views/Scout/ScoutIsland.vue";
import ScoutPeople from "../views/Scout/ScoutPeople.vue";
import IslandShow from "../views/Show/IslandShow.vue";
import Top from "../views/Top.vue"
import ProjectRegisterView from "../views/register/ProjectRegister.vue"
import SearchBox from "../components/Search/SearchBox.vue"
import LoginView from "../views/Login.vue";
import MyPage from "../views/MyPage.vue";
import MyPageEdit from "../views/MyPageEdit.vue";
import IslandEdit from "../views/IslandEdit.vue";
import ProjectEdit from "../views/ProjectEdit.vue";
import IslandAdmissionRequest from "../views/IslandAdmissionRequest.vue";
import ProjectAdmissionRequest from "../views/ProjectAdmissionRequest.vue";
import OtherMyPage from "../views/OtherMyPage.vue";
import MyPageForScout from "../views/MyPageForScout.vue";
import UserRegisterView from "../views/register/UserRegister.vue";
import IslandRegisterView from "../views/register/IslandRegister.vue";
import RecruitUserRegister from "../views/register/RecruitUserRegister.vue";
import RecruitIslandRegister from "../views/register/RecruitUserRegister.vue";



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
      path: '/islandRegister',
      name: 'islandRegister',
      component:  IslandRegisterView
    },{
      path: "/projectadmissionrequest",
      name: "projectadmissionrequest",
      component: ProjectAdmissionRequest,

    },
    {
      path: "/userRegister",
      name: "userRegister",
      component: UserRegisterView,
    },

    {
      path: "/islandRegister",
      name: "islandRegister",
      component: IslandRegisterView,
    },

    {

      path: '/recruitUserRegister',
      name: 'recruitUserRegister',
      component:  RecruitUserRegister
    },{
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
      path: '/recruitIslandRegister',
      name: 'recruitIslandRegister',
      component:  RecruitIslandRegister
    },
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
      path: "/searchIslandResult",
      name: "searchIslandResult",
      component: SearchIslandResult,
    },
    {
      path: "/searchProResult",
      name: "searchProResult",
      component: SearchProResult,
    },
    {
      path: "/searchReqIslandResult",
      name: "searchReqIslandResult",
      component: SearchReqIslandResult,
    },
    {
      path: "/searchReqProResult",
      name: "searchReqProResult",
      component: SearchReqProResult,
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
      path: "/top",
      name: "top",
      component: Top,
    },
    {
      path: "/joinIsland",
      name: "joinIsland",
      component: () => import("../views/JoinIsland.vue"),
    },{
      path: "/searchBox",
      name: "searchBox",
      component: SearchBox
    },
  ],
});

export default router;

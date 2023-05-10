import { createRouter, createWebHistory } from "vue-router";
import IslandReqList from "../views/ReqList/IslandReqList.vue";
import ProjectReqList from "../views/ReqList/ProjectReqList.vue";
import SearchIslandResult from "../views/Search/SearchIslandResult.vue";
import SearchProResult from "../views/Search/SearchProResult.vue";
import SearchReqIslandResult from "../views/Search/SearchReqIslandResult.vue";
import SearchReqProResult from "../views/Search/SearchReqProResult.vue";
import ScoutIsland from "../views/Scout/ScoutIsland.vue";
import ScoutPeople from "../views/Scout/ScoutPeople.vue";
import ScoutShow from "../views/Show/ScoutShow.vue";
import Top from "../views/Top.vue";
import ProjectRegisterView from "../views/register/ProjectRegister.vue";
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
import RecruitIslandRegister from "../views/register/RecruitIslandRegister.vue";
import TopSearchBox from "../components/Search/TopSearch/TopSearchBox.vue";
import IslandShow from "../views/Show/IslandShow.vue";
import ProjectShow from "../views/Show/ProjectShow.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
      path: "/othermypage/:id",
      name: "othermypage",
      component: OtherMyPage,
    },
    {
      path: "/mypageforscout/:islandId/:userId",
      name: "mypageforscout",
      component: MyPageForScout,
    },
    {
      path: "/islandEdit/:id",
      name: "islandEdit",
      component: IslandEdit,
    },
    {
      path: "/projectEdit/:id",
      name: "projectEdit",
      component: ProjectEdit,
    },
    {
      path: "/islandadmissionrequest/:islandId/:userId",
      name: "islandadmissionrequest",
      component: IslandAdmissionRequest,
    },
    {
      path: "/islandRegister",
      name: "islandRegister",
      component: IslandRegisterView,
    },
    {
      path: "/projectadmissionrequest/:userId/:projectId",
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
      path: "/recruitUserRegister/:id",
      name: "recruitUserRegister",
      component: RecruitUserRegister,
    },
    {
      path: "/projectRegister",
      name: "projectRegister",
      component: ProjectRegisterView,
    },
    {

      path: "/recruitIslandRegister/:id",
      name: "recruitIslandRegister",
      component: RecruitIslandRegister,
    },
    {
      path: "/islandReqList",
      name: "islandReqList",
      component: IslandReqList,
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
      path: "/scoutShow/:islandId/:projectId",
      name: "scoutShow",
      component: ScoutShow,
    },
    {
      path: "/joinIsland",
      name: "joinIsland",
      component: () => import("../views/JoinIsland.vue"),
    },
    {
      path: "/joinProject/:id",
      name: "joinProject",
      component: () => import("../views/JoinProject.vue"),
    },
    {
      path: "/userScout",
      name: "userScout",
      component: () => import("../views/userScout.vue"),
    },
    {
      path: "/islandChat/:id",
      name: "islandChat",
      component: () => import("../views/chat/islandChat.vue"),
    },
    {
      path: "/projectChat/:id",
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
      path: "/scoutIsland/:projectId",
      name: "scoutIsland",
      component: ScoutIsland,
    },
    {
      path: "/scoutPeople/:islandId",
      name: "scoutPeople",
      component: ScoutPeople,
    },
    {
      path: "/topSearchBox",
      name: "topSearchBox",
      component: TopSearchBox,
    },
    {
      path: "/top",
      name: "top",
      component: Top,
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
  ],
});

export default router;

import { createRouter, createWebHistory, RouterView } from 'vue-router';
import { createStore } from 'vuex';
import { mount } from '@vue/test-utils';
import MyPageEdit from "./MypageEdit.vue";
import MyPage from "./MyPage.vue";

let wrapper;
let router;


//Vue Routerの設定
const routes = [
  {
    path: "/mypage",
    name: "mypage",
    component: MyPage,
  },
  {
    path: "/mypage/edit",
    name: "mypageEdit",
    component: MyPageEdit,
  },
];


const store = createStore({
  state: {
    user: {
      loggedIn: false,
    },
  },
  mutations: {
    login(state) {
      state.user.loggedIn = true;
    },
  },
});

beforeEach(() => {
  beforeEach(() => {
    // テストの前にログイン状態にする
    store.commit('login');
  });

  router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
  });

  wrapper = mount(MyPageEdit, {
    global: {
      plugins: [router],
    },
  });
});

describe("MyPageEdit", () => {
  it("戻るボタンクリック時にMyPageに遷移", async () => {
    const button = wrapper.find(".edit__button_cansel");

    await button.trigger("click");

    await router.isReady();

    expect(router.currentRoute.value.path).toBe("/mypage");
  });
});

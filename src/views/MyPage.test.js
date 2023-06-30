// import { shallowMount } from '@vue/test-utils';
// import MyPage from '@/views/MyPage.vue';
// import { createRouter, createWebHistory } from 'vue-router';
// import login from "@/views/login.vue"
// import { beforeEach } from 'vitest'

// const router = createRouter({
//   history: createWebHistory(),
//   routes: [
//     // テスト用のルートをここに定義する
//     { path: '/', component: login },
//   ],
// });

import { createRouter, createWebHistory, RouterView } from 'vue-router';
import { mount } from '@vue/test-utils';
import Mypage from './Mypage.vue';
import IslandShow from


let wrapper;
let router;


// Vue Routerの設定
const routes = [
  {
    path: "/islandShow/:id",
    name: "islandShow",
    component: IslandShow,
  },
];

it("島の名前が表示されているか", () => {
  const title = wrapper.find('.request__input');
  expect(title.exists()).toBe(true);
});


// describe('MyPage', () => {
//   beforeEach(() => {
//     document.body.innerHTML = '<div id="app"></div>'
//   })
//   test('login function sets user data correctly', async () => {
//     const wrapper = shallowMount(MyPage);
//     const mockLoggedInUser = {
//       uid: 'test-user-id',
//       name: 'John Doe',
//       icon: 'path/to/icon',
//       job: 'Developer',
//       comment: 'Hello, World!',
//     };

//     // ログイン関数を実行する前の状態を確認
//     expect(wrapper.vm.$data.User).toEqual({
//       name: '',
//       icon: '',
//       job: '',
//       comment: '',
//     });

//     // ログイン関数を実行
//     await wrapper.vm.login(mockLoggedInUser);

//     // ログイン関数の実行後の状態を確認
//     expect(wrapper.vm.$data.User).toEqual({
//       name: 'John Doe',
//       icon: 'path/to/icon',
//       job: 'Developer',
//       comment: 'Hello, World!',
//     });
//   });
// });

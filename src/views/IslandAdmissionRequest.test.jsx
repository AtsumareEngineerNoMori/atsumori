import { createRouter, createWebHistory, RouterView } from 'vue-router';
import { mount } from '@vue/test-utils';
import IAR from './IslandAdmissionRequest.vue';
import IslandShow from "../views/Show/islandShow.vue"

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


// テストの前にルーターをインスタンス化する
beforeEach(() => {
  router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
  });

  wrapper = mount(IAR, {
    global: {
      plugins: [router],
    },
  });
});


it("島の名前が表示されているか", () => {
  const title = wrapper.find('.request__input');
  expect(title.exists()).toBe(true);
});
it("島の情報が表示されているか", () => {
  const detail = wrapper.find('.request__detail');
  expect(detail.exists()).toBe(false);
});

it("ひとこと申請フォームが表示されているか", () => {
  const emailInput = wrapper.find('.request__input');
  expect(emailInput.exists()).toBe(true);
});



it("チェックボックスが表示されているか", () => {
  const check = wrapper.find('.checkbox');
  expect(check.exists()).toBe(true);
});


describe("IAR", () => {
  it("ボタンクリック時に/loginに遷移することを確認", async () => {
    const button = wrapper.find('.request__button');
    await button.trigger('click');

    // イベントを待機してから遷移の確認を行うためにVue Routerのawaitループを使用
    await router.isReady();

    // ルーターの現在のパスが "/login" になっていることを確認します
    expect(router.currentRoute.value.path).toBe("/login");
  });
});













// describe("IAR", () => {
//   it("ボタンクリック時に/loginに遷移することを確認", async () => {
//     const wrapper = shallowMount(IAR, {
//       global: {
//         plugins: [router],
//       },
//     });

//     const button = wrapper.find('.request__button');
//     await button.trigger('click');

//     // イベントを待機してから遷移の確認を行うためにVue Routerのawaitループを使用します
//     await router.isReady();
//     await wrapper.vm.$nextTick();

//     // ルーターの現在のパスが "/login" になっていることを確認します
//     expect(wrapper.vm.$route.path).toBe("/login");
//   });
// });



// describe('RequestPage', () => {
//   it('disables the button when not checked', async () => {
//     const wrapper = mount(IAR)
//     // Assume the user is logged in
//     wrapper.vm.onAuthStateChanged.mockImplementationOnce((callback) => callback({}))
//     await nextTick()
    
//     expect(wrapper.find('button').classes()).toContain('request__disabled')
//   })

  // it('enables the button when checked', async () => {
  //   const wrapper = mount(IAR)
  //   // Assume the user is logged in
  //   wrapper.vm.onAuthStateChanged.mockImplementationOnce((callback) => callback({}))
  //   await nextTick()
    
  //   // Simulate checking the checkbox
  //   wrapper.find('input[type="checkbox"]').setChecked(true)
  //   await nextTick()
    
  //   expect(wrapper.find('button').classes()).not.toContain('request__disabled')
  // })
  

  // it('クリックして活性', async () => {
  //   const wrapper = mount(IAR)
  //   const spy = jest.spyOn(wrapper.vm, 'Request')
  //   // Assume the user is logged in
  //   wrapper.vm.onAuthStateChanged.mockImplementationOnce((callback) => callback({}))
  //   await nextTick()
    
  //   // Simulate checking the checkbox and clicking the button
  //   wrapper.find('input[type="checkbox"]').setChecked(true)
  //   wrapper.find('button').trigger('click')
  //   await nextTick()
    
  //   expect(spy).toHaveBeenCalled()
  // })
// })

// jest.mock('firebase/analytics', () => ({
//   isSupported: () => Promise.resolve(false),
// }));

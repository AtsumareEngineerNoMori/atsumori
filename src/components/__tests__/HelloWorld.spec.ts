// import { describe, it, expect } from 'vitest'

// import { mount } from '@vue/test-utils'
// import HelloWorld from '../HelloWorld.vue'

// describe('HelloWorld', () => {
//   it('renders properly', () => {
//     const wrapper = mount(HelloWorld, { props: { msg: 'Hello Vitest' } })
//     expect(wrapper.text()).toContain('Hello Vitest')
//   })

// })



import { test } from 'vitest'

test('テスト', ({ expect }) => {
  expect(1 + 1).toBe(2)
})

// import { mount } from "@vue/test-utils";
// import MyPage from "../../views/MyPage.vue";
// import { nextTick } from "vue";

// jest.mock('vue-router', () => ({
//   useRouter: jest.fn(() => ({ push: jest.fn() }))
// }));

// // API呼び出しをモックする
// global.fetch = jest.fn(() =>
//   Promise.resolve({
//     ok: true,
//     status: 200,
//     json: () => Promise.resolve({ 
//       name: "Test User",
//       icon: "iconUrl",
//       job: "Job",
//       comment: "Test Comment"
//     }),
//   })  
// ) as any;

// describe("MyPage.vue", () => {
//   it("ユーザー情報が正しく表示される", async () => {
//     const wrapper = mount(MyPage);
//     await nextTick();

//     expect(wrapper.find(".mypage__item").text()).toContain("Test User");
//     expect(wrapper.find(".mypage__item").text()).toContain("Job");
//     expect(wrapper.find(".mypage__item p").text()).toContain("Test Comment");
//   });
// });

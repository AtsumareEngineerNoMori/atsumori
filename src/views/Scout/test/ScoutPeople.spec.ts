import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import ScoutPeople from "@/views/Scout/ScoutPeople.vue";
import { useRoute } from "vue-router";

vi.mock("vue-route", () => ({
  useRoute: vi.fn(() => ({
    params: {
      isLandsId: "1",
    },
  })),
}));

// // テストファイルの先頭に追加
// vi.mock('@/views/Scout/ScoutPeople.vue', () => ({
//     ...vi.requireActual('@/views/Scout/ScoutPeople.vue'),
//     fetchUsers: vi.fn().mockResolvedValue([
//       { id: 1, name: '父' },
//       { id: 2, name: '母' },
//       { id: 3, name: '子ども' },
//     ]),
//   }));

// テストファイルの先頭に追加
vi.mock('@/views/Scout/ScoutPeople.vue', () => {
    const { ref } = require('vue');
    const fetchUsers = vi.fn().mockResolvedValue([
      { id: 1, name: '父' },
      { id: 2, name: '母' },
      { id: 3, name: '子ども' },
    ]);
  
    return {
      ...vi.requireActual('@/views/Scout/ScoutPeople.vue'),
      fetchUsers: fetchUsers,
      users: ref([]),
      filteredUsers: ref([]),
      results: ref(false),
      errorMessage: ref(''),
    };
  });

describe("ScoutPeople", () => {
  it("検索フォーム・ボタンが正しく表示されること", () => {
    const wrapper = mount(ScoutPeople);
    expect(wrapper.find("input[type='search']").exists()).toBe(true);
    expect(wrapper.find("input[type='submit']").exists()).toBe(true);
  });

  it("20文字以上入力でエラーメッセージ表示されること", async () => {
    const wrapper = mount(ScoutPeople);
    await wrapper
      .find('input[type="search"]')
      .setValue("20文字より多いキーワードを入力aaaaaaaaaaaaaaaaa");
    await wrapper.find("form").trigger("submit.prevent");
    expect(wrapper.find(".search_errmsg").text()).toBe(
      "20文字以内で入力してください"
    );
  });

  it("検索結果がない場合にメッセージ表示されること", async () => {
    const wrapper = mount(ScoutPeople, {
      props: {
        users: [], // 空の配列を渡すことで検索結果がない状態を再現
      },
    });
    await wrapper.find("input[type='search']").setValue("キーワード");
    await wrapper.find("form").trigger("submit.prevent");

    await wrapper.vm.$nextTick();

    const message = wrapper.find(".search_no p").text();
    expect(message).toBe("検索結果はありません");
  });

  it("該当するデータがある場合表示されること", async () => {
    // const wrapper = mount(ScoutPeople);

    // // テストデータの設定
    // const users = [
    //   { id: 1, name: "父" },
    //   { id: 2, name: "母" },
    //   { id: 3, name: "子ども" },
    // ];
    // wrapper.vm.users = users;
//     const fetchUsersMock = vi.fn();
//     fetchUsersMock.mockResolvedValue([
//       { id: 1, name: '父' },
//       { id: 2, name: '母' },
//       { id: 3, name: '子ども' },
//     ]);

//     // mount時にfetchUsersMockを注入
//     const wrapper = mount(ScoutPeople, {
//       global: {
//         mocks: {
//           fetchUsers: fetchUsersMock,
//         },
//       },
//     });

//     // キーワードの入力と検索ボタンのクリック
//     const keywordInput = wrapper.find('input[name="search"]');
//     await keywordInput.setValue("父");
//     const submitButton = wrapper.find('input[name="submit"]');
//     await submitButton.trigger("click");

//     // フィルタリングされたユーザーが表示されることを確認
//     const filteredUsers = wrapper.vm.filteredUsers;
//     expect(filteredUsers).toEqual([{ id: 1, name: "父" }]);
//   });
const wrapper = mount(ScoutPeople);

// キーワードの入力と検索ボタンのクリック
const keywordInput = wrapper.find('input[name="search"]');
await keywordInput.setValue('父');
const submitButton = wrapper.find('input[name="submit"]');
await submitButton.trigger('click');

// フィルタリングされたユーザーが表示されることを確認
const filteredUsers = wrapper.vm.filteredUsers;
expect(filteredUsers).toEqual([{ id: 1, name: '父' }]);
});
});

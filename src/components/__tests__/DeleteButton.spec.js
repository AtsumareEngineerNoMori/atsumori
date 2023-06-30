// テスト実行時にDeleteButton.vueの34行目をコメントアウトする
import DeleteButton from "../button/DeleteButton.vue";
import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";

// モック関数
global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ id: 1, userId: "userId", islandId: 1 }),
  })
);

describe("deleteButton", () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })
  it("退会ボタン表示(管理していない島)", async () => {
    const wrapper = mount(DeleteButton, {
      props: {
        userId: "userId",
        islandId: 1,
        admin: false,
        url: "deleteJoinIslands",
      },
    });
    // コンポーネントの描画が完了するまで待機
    await wrapper.vm.$nextTick();

    // ボタンが存在するか
    expect(wrapper.find(".list__button").exists()).toBe(true);
  });

  it("退会ボタン非表示(管理している島)", async () => {
    const wrapper = mount(DeleteButton, {
      props: {
        userId: "userId",
        islandId: 1,
        admin: true,
        url: "deleteJoinIslands",
      },
    });
    // コンポーネントの描画が完了するまで待機
    await wrapper.vm.$nextTick();

    // ボタンが存在するか
    expect(wrapper.find(".list__button").exists()).toBe(false);
  });

  it("クリックされたら関数が呼ばれること", async () => {
    const wrapper = mount(DeleteButton, {
      props: {
        userId: "userId",
        islandId: 1,
        url: "deleteJoinIslands",
      },
    });

    // コンポーネントの描画が完了するまで待機
    await wrapper.vm.$nextTick();

    console.log(wrapper.text());

    // ボタンが存在するか
    expect(wrapper.find(".list__button").exists()).toBe(true);

    // ボタンクリック
    await wrapper.find(".list__button").trigger("click");

    // 関数が1回呼ばれることを確認
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
});

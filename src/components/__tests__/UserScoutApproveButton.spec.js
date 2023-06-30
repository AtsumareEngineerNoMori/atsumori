
import UserScoutApproveButton from "../button/UserScoutApproveButton.vue";
import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";

global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ id: 1, userId: "userId", islandId: 1 }),
  })
);

describe("UserScoutApproveButton", () => {
  it("クリックされたら関数が呼ばれること", async () => {
    const wrapper = mount(UserScoutApproveButton, {
      props: {
        userId: "userId",
        islandId: 1,
      },
    });

    // コンポーネントの描画が完了するまで待機
    await wrapper.vm.$nextTick();

    // ボタンが存在するか
    expect(wrapper.find(".scout__buttons-approveButton").exists()).toBe(true);

    // ボタンクリック
    await wrapper.find(".scout__buttons-approveButton").trigger("click");

    // 関数が1回呼ばれることを確認
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
});

import { describe, it, expect, vi } from "vitest";
import { mount, VueWrapper } from "@vue/test-utils";
import TopSearchBox from "../Search/TopSearch/TopSearchBox.vue";
import { createRouter, createWebHistory } from "vue-router";

describe("TopSearchBox", () => {
  it("filter選択チェック", async () => {
    const wrapper: VueWrapper<any> = mount(TopSearchBox);
    const buttons = wrapper.findAll(".search_select");
    const filter2Button = buttons[1];

    await filter2Button.trigger("click");

    expect(wrapper.vm.selectedFilter).toBe("filter2");
    expect(wrapper.vm.searchType).toBe("project");
  });

  it("バリデーションチェック", async () => {
    const wrapper: VueWrapper<any> = mount(TopSearchBox);
    const input = wrapper.find('input[type="search"]'); // 入力フォームの要素を取得

    // 20文字を超える文字列を入力
    await input.setValue("20文字超えるのでエラーメッセージ表示させる");
    await wrapper.find("form").trigger("submit");
    await wrapper.vm.$nextTick();

    // エラーメッセージが表示されることを確認
    expect(wrapper.find(".search_errmsg").exists()).toBe(true);
    expect(wrapper.find(".search_errmsg").text()).toBe(
      "20文字以内で入力してください"
    );
  });

  //遷移先URLチェック
  it("検索すると遷移が行われること", async () => {
    const router = createRouter({
      history: createWebHistory(),
      routes: [],
    });

    const wrapper = mount(TopSearchBox, {
      global: {
        plugins: [router],
      },
    });

    const pushSpy = vi.spyOn(router, "push");

    const input = wrapper.find('input[type="search"]');
    input.setValue("キーワード");

    const form = wrapper.find("form");
    await form.trigger("submit.prevent");
    expect(pushSpy).toHaveBeenCalledWith(
      "/searchIslandResult?search=キーワード"
    );
  });
});

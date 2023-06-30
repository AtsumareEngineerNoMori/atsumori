import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import SearchProResult from "../SearchProResult.vue";

describe("SearchProResult", () => {
  it("再検索用のフォームとボタンが表示されること", () => {
    const mockRoute = {
      query: {
        search: "キーワード",
      },
    };
    const wrapper = mount(SearchProResult, {
      global: {
        mocks: {
          $route: mockRoute,
        },
      },
    });

    const searchForm = wrapper.find("form");
    const searchButton = wrapper.find('input[type="submit"]');

    expect(searchForm.exists()).toBe(true);
    expect(searchButton.exists()).toBe(true);
  });

  it('データがない場合"検索結果はありません"が表示されること', async () => {
    const wrapper = mount(SearchProResult, {
      global: {
        mocks: {
          $route: {
            query: {},
          },
        },
      },
    });

    await wrapper.vm.$nextTick();

    const noResultsMessage = wrapper.find(".search_no p");

    expect(noResultsMessage.exists()).toBe(true);
    expect(noResultsMessage.text()).toBe("検索結果はありません");
  });

  it("検索結果が表示されること", async () => {
    const mockRoute = {
      query: {
        search: "キーワード",
      },
    };
    const wrapper = mount(SearchProResult, {
      global: {
        mocks: {
          $route: mockRoute,
        },
      },
    });

    await wrapper.vm.$nextTick();
    const noResultsMessage = wrapper.find(".search_no p");

    expect(noResultsMessage.exists()).toBe(true);
    expect(noResultsMessage.text()).toBe("検索結果はありません");
  });
});

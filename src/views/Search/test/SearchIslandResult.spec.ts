import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import SearchIslandResult from "../SearchIslandResult.vue";
// import { createRouter, createWebHistory } from "vue-router";
// import { useRoute } from "vue-router";

describe("SearchIslandResult", () => {
  it("再検索用のフォームとボタンが表示されること", () => {
    const mockRoute = {
      query: {
        search: "キーワード",
      },
    };
    const wrapper = mount(SearchIslandResult, {
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
    const wrapper = mount(SearchIslandResult, {
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
    const wrapper = mount(SearchIslandResult, {
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
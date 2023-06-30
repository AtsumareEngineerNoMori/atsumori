//データがある場合とない場合とloading中の表示確認
import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import UserScout from "../../views/UserScout.vue";
import Loading from "../Loading.vue";
import { getListData } from "../../getData";

// モック化
vi.mock("../../getData", () => {
  return {
    getListData: vi.fn(),
  };
});

describe("UserScout", () => {
  it("データがある場合はリスト表示されること", async () => {
    // データ
    const mockScoutList = [
      {
        id: 1,
        userId:"userId",
        islandId: 1,
        islands: {
          id: 1,
          icon: "island-icon.png",
          islandName: "島A",
          islandDescription: "島Aの説明文",
          adminId: "adminUserId",
          createDate: new Date(),
        },
      }
    ];

    // モック関数で返して欲しいデータを定義しscoutListに代入
    const scoutList = await getListData.mockResolvedValue(mockScoutList);

    const scoutListLength = true;
    const loading = false;

    const wrapper = mount(UserScout, {
      setup() {
        return {
          scoutList,
          scoutListLength,
          loading,
        };
      },
    });

    // データ取得後の処理が実行されるまで待機
    await wrapper.vm.$nextTick();
    console.log(wrapper.text())

    // 取得後Loadingが表示されないこと
    expect(wrapper.findComponent(Loading).exists()).toBe(false);

    // 「プロジェクトに参加してみよう」ボタンが表示されていないこと
    expect(wrapper.find(`[data-testid="noDataBtn"]`).exists()).toBe(false);

    // リスト表示がされていること
    expect(wrapper.find(".list__list").exists()).toBe(true);
  });

  it("データがない場合は「プロジェクトに参加してみよう」と表示されること", async () => {
    const mockScoutList = [];

    // islandId
    const route = {
      params: {
        id: 1,
      },
    };

    // モック関数で返して欲しいデータを定義しjoinListに代入
    const scoutList = await getListData.mockResolvedValue(mockScoutList);

    const scoutListLength = false;
    const loading = false;

    const wrapper = mount(UserScout, {
      setup() {
        return {
          scoutList,
          scoutListLength,
          loading,
        };
      },
    });

    // データ取得後の処理が実行されるまで待機
    await wrapper.vm.$nextTick();

    // 取得後Loadingコンポーネントが表示されないこと
    expect(wrapper.findComponent(Loading).exists()).toBe(false);
    // リスト表示されないこと
    expect(wrapper.find(".list__item").exists()).toBe(false);
    // プロジェクトに参加してみよう」ボタンが表示されていること
    expect(wrapper.find(`[data-testid="noDataBtn"]`).exists()).toBe(true);
  });
});

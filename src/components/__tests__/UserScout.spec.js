//データがある場合とない場合とloading中の表示確認
import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import UserScout from "../../views/UserScout.vue";
import flushPromises from "flush-promises";
import {app} from "../../main"
// import Loading from "../Loading.vue";
// import { getListData } from "../../getData";

// モック化
// vi.mock("../../getData", () => {
//   return {
//     getListData: vi.fn(),
//   };
// });

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

const mockGetCookie = vi.fn(() => "myId");

global.fetch = vi.fn(() =>
  Promise.resolve({ json: () => Promise.resolve(mockScoutList) })
);

describe("UserScout", () => {
  beforeEach(() => {
    // $cookies.get()メソッドをモック化
    vi.spyOn(app.$cookies, "get").mockImplementation(mockGetCookie);
  });
  afterEach(() => {
    vi.clearAllMocks();
  });
  it("scoutList取得前、Loadingコンポーネントが表示されること", () => {
    const wrapper = mount(UserScout)
    expect(wrapper.find(`[data-testid="loading"]`).exists()).toBe(true)
  })
  it("scoutListの取得後、Loadingコンポーネントが表示されないこと", async () => {
    const wrapper = mount(UserScout);
    await flushPromises();
    expect(wrapper.find(`[data-testid="loading"]`).exists()).toBe(false);
  });
  it("scoutList取得後、リスト表示されること", async () => {
    // モック関数で返して欲しいデータを定義しscoutListに代入
    // const scoutList = await getListData.mockResolvedValue(mockScoutList);

    // const scoutListLength = true;
    // const loading = false;

    const wrapper = mount(UserScout);

    // データ取得後の処理が実行されるまで待機
    await flushPromises();

    // // 「プロジェクトに参加してみよう」ボタンが表示されていないこと
    // expect(wrapper.find(`[data-testid="noDataBtn"]`).exists()).toBe(false);

    // リスト表示がされていること
    expect(wrapper.find(".list__list").exists()).toBe(true);
  });

  it("scoutListの取得後、「招待はありません」ボタンが表示されないこと", async () => {
    const wrapper = mount(UserScout);
    await flushPromises();
    console.log("DOMをみるよ");
    console.log(wrapper.html());
    expect(wrapper.find(`[data-testid="noDataBtn"]`).exists()).toBe(false);
  });

  it("http://localhost:3000/myScout/?userId=myIdに対してfetchが1回走っていること", () => {
    mount(UserScout);
    expect(fetch).toBeCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:3000/myScout/?userId=myId"
    );
  });

//   it("データがない場合は「プロジェクトに参加してみよう」と表示されること", async () => {
//     const mockScoutList = [];

//     // islandId
//     const route = {
//       params: {
//         id: 1,
//       },
//     };

//     // モック関数で返して欲しいデータを定義しjoinListに代入
//     const scoutList = await getListData.mockResolvedValue(mockScoutList);

//     const scoutListLength = false;
//     const loading = false;

//     const wrapper = mount(UserScout, {
//       setup() {
//         return {
//           scoutList,
//           scoutListLength,
//           loading,
//         };
//       },
//     });

//     // データ取得後の処理が実行されるまで待機
//     await wrapper.vm.$nextTick();

//     // 取得後Loadingコンポーネントが表示されないこと
//     expect(wrapper.findComponent(Loading).exists()).toBe(false);
//     // リスト表示されないこと
//     expect(wrapper.find(".list__item").exists()).toBe(false);
//     // プロジェクトに参加してみよう」ボタンが表示されていること
//     expect(wrapper.find(`[data-testid="noDataBtn"]`).exists()).toBe(true);
//   });
});


describe("UserScoutデータなし", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  it("scoutList取得前、Loadingコンポーネントが表示されること", () => {
    const wrapper = mount(UserScout)
    expect(wrapper.find(`[data-testid="loading"]`).exists()).toBe(true)
  })
  it("scoutListの取得後、Loadingコンポーネントが表示されないこと", async () => {
    const wrapper = mount(UserScout);
    await flushPromises();
    expect(wrapper.find(`[data-testid="loading"]`).exists()).toBe(false);
  });
  it("scoutListの取得後、リスト表示されないこと", async () => {
    const wrapper = mount(UserScout);
    await flushPromises();
    expect(wrapper.find(".list__list").exists()).toBe(false);
  });
  it("scoutListの取得後、「招待はありません」ボタンが表示されること", async () => {
    const wrapper = mount(UserScout);
    await flushPromises();
    console.log("DOMをみるよ");
    console.log(wrapper.html());
    expect(wrapper.find(`[data-testid="noDataBtn"]`).exists()).toBe(true);
  });
  it("http://localhost:3000/myScout/?userId=myIdに対してfetchが1回走っていること", () => {
    mount(UserScout);
    expect(fetch).toBeCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:3000/myScout/?userId=myId"
    );
  });
})

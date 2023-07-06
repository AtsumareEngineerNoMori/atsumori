import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import JoinIsland from "../../views/JoinIsland.vue";
import flushPromises from "flush-promises";
import { app } from "../../main";

const mockJoinList = [
  {
    id: 1,
    userId: "userId",
    islandId: 1,
    islands: {
      id: 1,
      icon: "island-icon.png",
      islandName: "島A",
      islandDescription: "島Aの説明文",
      adminId: "userId",
      createDate: new Date(),
    },
    admin: true,
  },
  {
    id: 2,
    userId: "userId",
    islandId: 2,
    islands: {
      id: 2,
      icon: "island-icon.png",
      islandName: "島B",
      islandDescription: "島Bの説明文",
      adminId: "adminUserId",
      createDate: new Date(),
    },
    admin: false,
  },
];

// const mockedPush = vi.fn();

// モック化
// vi.mock("vue-router", () => ({
//   useRouter: () => ({
//     push: mockedPush,
//   })
// }));
// vi.mock("$cookies", () => {
//   return {
//     default: () => ({
//       get: vi.fn().mockResolvedValue("myId"),
//     }),
//   };
// });

const mockGetCookie = vi.fn(() => "myId");

global.fetch = vi.fn(() =>
  Promise.resolve({ json: () => Promise.resolve(mockJoinList) })
);

describe("JoinIsland", () => {
  beforeEach(() => {
    // $cookies.get()メソッドをモック化
    vi.spyOn(app.$cookies, "get").mockImplementation(mockGetCookie);
  });
  afterEach(() => {
    vi.clearAllMocks();
  });
  it("ログイン状態であること", () => {
    const wrapper = mount(JoinIsland);
    // モック化したメソッドが呼び出されたこと
    expect(mockGetCookie).toHaveBeenCalledWith("myId");
    // コンポーネントのマウント時に取得したデータが正しく表示されること
    expect(wrapper.vm.uid).toBe("myId");
  });
  it("joinList取得前、Loadingコンポーネントが表示されること", () => {
    const wrapper = mount(JoinIsland);
    expect(wrapper.find(`[data-testid="loading"]`).exists()).toBe(true);
  });
  it("joinList取得後、Loadingコンポーネントが表示されないこと", async () => {
    const wrapper = mount(JoinIsland);
    console.log(`前${wrapper.text()}`);
    await flushPromises();
    console.log(`後${wrapper.text()}`);
    expect(wrapper.find(`[data-testid="loading"]`).exists()).toBe(false);
  });
  it("joinList取得後、リスト表示されること", async () => {
    const wrapper = mount(JoinIsland);
    // データ取得後の処理が実行されるまで待機
    await flushPromises();
    // リスト表示されていること
    expect(wrapper.find(".list__list").exists()).toBe(true);
  });
  it("http://localhost:3000/myIslands/?userId=myIdに対してfetchが1回走っていること", () => {
    mount(JoinIsland);
    expect(fetch).toBeCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:3000/myIslands/?userId=myId"
    );
  });
});

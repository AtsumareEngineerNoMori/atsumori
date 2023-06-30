import { mount, shallowMount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import JoinIsland from "../../views/JoinIsland.vue";
import Loading from "../Loading.vue";
import { getListData } from "../../getData";
import * as getData from "../../getData";

// モック化
vi.mock("../../getData", () => {
  return {
    getListData: vi.fn(),
  };
});

describe("JoinIsland", () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })
  it("データがある場合リスト表示されること", async () => {

    // const spy = vi.spyOn(getListData,'getData')

    // データ
    const mockJoinList = [
      {
        id: 1,
        userId: "xfECbt7q0OapKf3yRWd344qy7Gy2",
        islandId: 1,
        islands: {
          id: 1,
          icon: "island-icon.png",
          islandName: "島A",
          islandDescription: "島Aの説明文",
          adminId: "xfECbt7q0OapKf3yRWd344qy7Gy2",
          createDate: new Date(),
        },
        admin: true,
      },
    ];

    // spy.mockResolvedValue(mockJoinList)

    const joinList = await getListData.mockResolvedValue(mockJoinList);
    // const joinList = mockJoinList;
    const uid = "xfECbt7q0OapKf3yRWd344qy7Gy2";
    // const loading = false;
    const joinListLength = true;

    const wrapper = mount(JoinIsland, {
      setup() {
        return {
          joinList,
          uid,
          // loading,
          joinListLength,
        };
      },
    });

    // データ取得後の処理が実行されるまで待機
    await wrapper.vm.$nextTick();

    console.log(wrapper.text());
    // expect(getListData.getListData("myIslands", "userId", "userId")).toBe(mockJoinList)

    // 取得後Loadingが表示されないこと
    expect(wrapper.findComponent(Loading).exists()).toBe(false);
    // リスト表示されていること
    expect(wrapper.find(".list__list").exists()).toBe(true);
  });
});

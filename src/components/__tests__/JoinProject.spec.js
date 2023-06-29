import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import JoinProject from "../../views/JoinProject.vue";
import Loading from "../Loading.vue";
import { getListData } from "../../getData";

// モック化
vi.mock("../../getData", () => {
  return {
    getListData: vi.fn(),
  };
});
    const route = {
      params: {
        id: 1,
      },
    };
    const mockJoinList = [
      {
        id: 1,
        islandId: 1,
        projectId: 1,
        projects: {
          id: 1,
          icon: "project-icon.png",
          projectName: "プロジェクトA",
          projectDescription: "プロジェクトAの説明文",
          adminId: "adminUserId",
          createDate: new Date(),
          adminIslandId: 1,
        },
      },
      {
        id: 2,
        islandId: 1,
        projectId: 2,
        projects: {
          id: 2,
          icon: "project-icon.png",
          projectName: "プロジェクトB",
          projectDescription: "プロジェクトBの説明文",
          adminId: "adminUserId",
          createDate: new Date(),
          adminIslandId: 1,
        },
      },
    ];

describe("test",()=>{
  it("データがある場合はリスト表示されること", async()=>{
    const spyPost = await vi.spyOn(axios, 'post').mockResolvedValue(mockJoinList)
    const wrapper =  mount(JoinProject, {
            setup() {
              return {
                route,
              };
            }
          })
          console.log("nextTick前")
          // console.log(wrapper.vm)
          await wrapper.vm.$nextTick();

          setTimeout(() => {
            console.log("Delayed for 1 second.");
          }, "2000")
          const class1 =wrapper.find(".list__item")
          console.log(class1)
          console.log("nextTick後")

          expect(axios.post).toBeCalledTimes(1)
    // expect(wrapper.find(".list__item").exists()).toBe(true)
    // expect(wrapper.vm.$data.joinList).toBe(mockJoinList)
  })
  // it("",())
});

describe("JoinProject", () => {
  it("データがある場合はリスト表示されること", async () => {
    // データ
    const mockJoinList = [
      {
        id: 1,
        islandId: 1,
        projectId: 1,
        projects: {
          id: 1,
          icon: "project-icon.png",
          projectName: "プロジェクトA",
          projectDescription: "プロジェクトAの説明文",
          adminId: "adminUserId",
          createDate: new Date(),
          adminIslandId: 1,
        },
      },
      {
        id: 2,
        islandId: 1,
        projectId: 2,
        projects: {
          id: 2,
          icon: "project-icon.png",
          projectName: "プロジェクトB",
          projectDescription: "プロジェクトBの説明文",
          adminId: "adminUserId",
          createDate: new Date(),
          adminIslandId: 1,
        },
      },
    ];

    // islandId
    const route = {
      params: {
        id: 1,
      },
    };

    // モック関数で返して欲しいデータを定義しjoinListに代入
    // const joinList = mockJoinList;
    const joinList = await getListData.mockResolvedValue(mockJoinList);

    const joinListLength = true;
    // const loading = false;

    const wrapper = mount(JoinProject, {
      setup() {
        return {
          joinList,
          joinListLength,
          // loading,
          route,
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
    const mockJoinList = [];

    // islandId
    const route = {
      params: {
        id: 1,
      },
    };

    // モック関数で返して欲しいデータを定義しjoinListに代入
    const joinList = await getListData.mockResolvedValue(mockJoinList);

    // const joinListLength = false;
    // const loading = false;

    const wrapper = mount(JoinProject, {

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


テスト
it
const spyPost = await vi.spyOn(axios, 'post').mockResolvedValue([])
expect(wrapper.findComponent(Loading).exists()).toBe(false);
it
const spyPost = await vi.spyOn(axios, 'post').mockResolvedValue([])
expect(wrapper.find(`[data-testid="noDataBtn"]`).exists()).toBe(true);
it
const spyPost = await vi.spyOn(axios, 'post').mockResolvedValue([])
expect(wrapper.find(`[data-testid="noDataBtn"]`).exists()).toBe(true);


getListData mock化
nextTick
list値を見る

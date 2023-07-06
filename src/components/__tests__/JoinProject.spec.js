import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import JoinProject from "../../views/JoinProject.vue";
import flushPromises from "flush-promises";

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

const mockedPush = vi.fn();

// モックの宣言
vi.mock("vue-router", () => ({
  useRouter: () => ({
    push: mockedPush,
  }),
  useRoute: () => {
    return {
      params: { id: 1 },
    };
  },
}));
global.fetch = vi.fn(() =>
  Promise.resolve({ json: () => Promise.resolve(mockJoinList) })
);

describe("JoinProjectデータあり", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  it("joinList取得前、Loadingコンポーネントが表示されること", () => {
    const wrapper = mount(JoinProject)
    expect(wrapper.find(`[data-testid="loading"]`).exists()).toBe(true)
  })
  it("joinListの取得後、Loadingコンポーネントが表示されないこと", async () => {
    const wrapper = mount(JoinProject);
    console.log(`next前${wrapper.text()}`);
    await flushPromises();
    console.log(`next後${wrapper.text()}`);
    expect(wrapper.find(`[data-testid="loading"]`).exists()).toBe(false);
  });
  it("joinListの取得後、リスト表示されること", async () => {
    const wrapper = mount(JoinProject);
    await flushPromises();
    console.log(wrapper.text());
    expect(wrapper.find(".list__list").exists()).toBe(true);
  });
  it("joinListの取得後、「プロジェクトに参加してみよう」ボタンが表示されないこと", async () => {
    const wrapper = mount(JoinProject);
    await flushPromises();
    console.log("DOMをみるよ");
    console.log(wrapper.html());
    expect(wrapper.find(`[data-testid="noDataBtn"]`).exists()).toBe(false);
  });
  it("http://localhost:3000/ourProjects/?islandId=1に対してfetchが1回走っていること", () => {
    mount(JoinProject);
    expect(fetch).toBeCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:3000/ourProjects/?islandId=1"
    );
  });
});

describe("JoinProjectデータなし", () =>{
  afterEach(() => {
    vi.clearAllMocks();
  });
  it("joinList取得前、Loadingコンポーネントが表示されること", () => {
    const wrapper = mount(JoinProject)
    expect(wrapper.find(`[data-testid="loading"]`).exists()).toBe(true)
  })
  it("joinListの取得後、Loadingコンポーネントが表示されないこと", async () => {
    const wrapper = mount(JoinProject);
    await flushPromises();
    expect(wrapper.find(`[data-testid="loading"]`).exists()).toBe(false);
  });
  it("joinListの取得後、リスト表示されないこと", async () => {
    const wrapper = mount(JoinProject);
    await flushPromises();
    expect(wrapper.find(".list__list").exists()).toBe(false);
  });
  it("joinListの取得後、「プロジェクトに参加してみよう」ボタンが表示されること", async () => {
    const wrapper = mount(JoinProject);
    await flushPromises();
    console.log("DOMをみるよ");
    console.log(wrapper.html());
    expect(wrapper.find(`[data-testid="noDataBtn"]`).exists()).toBe(true);
  });
  it("http://localhost:3000/ourProjects/?islandId=1に対してfetchが1回走っていること", () => {
    mount(JoinProject);
    expect(fetch).toBeCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:3000/ourProjects/?islandId=1"
    );
  });
})

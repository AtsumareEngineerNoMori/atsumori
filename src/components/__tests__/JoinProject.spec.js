import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import JoinProject from "../../views/JoinProject.vue";

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

describe("JoinProject", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  it("joinListの取得後、Loadingコンポーネントが表示されないこと", async () => {
    const wrapper = mount(JoinProject);
    await wrapper.vm.$nextTick();
    expect(wrapper.find(".loading").exists()).toBe(false);
  });
  it("joinListの取得後、リスト表示されること", async () => {
    const wrapper = mount(JoinProject);
    await wrapper.vm.$nextTick();
    expect(wrapper.find(".list__item").exists()).toBe(true);
  });
  it("joinListの取得後、プロジェクトに参加してみよう」ボタンが表示されないこと", async () => {
    const wrapper = mount(JoinProject);
    await wrapper.vm.$nextTick();
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

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
  it("取得後Loadingコンポーネントが表示されないこと", () => {
    const wrapper = mount(JoinProject);
    expect(wrapper.find(".loading").exists()).toBe(false);
  });
  it("リスト表示されないこと", () => {
    const wrapper = mount(JoinProject);
    expect(wrapper.find(".list__item").exists()).toBe(false);
  });
  it("プロジェクトに参加してみよう」ボタンが表示されていること", () => {
    const wrapper = mount(JoinProject);
    expect(wrapper.find(`[data-testid="noDataBtn"]`).exists()).toBe(true);
  });
  it("http://localhost:3000/ourProjects/?islandId=1に対してfetchが走っていること", () => {
    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:3000/ourProjects/?islandId=1"
    );
  });
});

import { describe, it, expect, test, vi, beforeEach } from "vitest";

import { mount } from "@vue/test-utils";
import { useRouter } from "vue-router";
import { userJudge } from "../../userJudge";
import { ref } from "vue";

import ProjectShow from "../../views/Show/ProjectShow.vue";
import SideMember from "../../components/projectShow/SideMember.vue";
import ShowBtn from "../../components/projectShow/ShowBtn.vue";

vi.mock("vue-router");
useRouter.mockReturnValue({
  push: vi.fn(),
});

describe("SideMember", () => {
  beforeEach(() => {
    useRouter().push.mockReset();
  });
  it("メンバー欄", async () => {
    const wrapper = mount(SideMember, {
      props: {
        projectId: 1,
        userJudges: 1,
        islandData: [
          {
            id: 1,
            icon: "https://firebasestorage.googleapis.com/v0/b/atsumareengineernomori.appspot.com/o/island%2F%E3%81%8B%E3%81%B5%E3%82%99.png?alt=media&token=9c63e7b5-263f-4f72-bece-faecd14456a9",
            islandName: "カブ",
            islandDescription: "💰💰",
            adminId: "xfECbt7q0OapKf3yRWd344qy7Gy2",
            createDate: "2023-05-24T06:08:26.341Z",
          },
        ],
      },
    });
    await wrapper.vm.$nextTick();

    // メンバーの表示確認
    const islandElement = wrapper.find(".member__content__name");
    expect(islandElement.text()).toBe("カブ");

    // ボタンのクリックイベントをシミュレートして動作を確認
    await wrapper.find("#scout").trigger("click");
    // パラメータを指定して呼び出されたかどうかの確認
    expect(useRouter().push).toHaveBeenCalledWith({
      name: "scoutIsland",
      params: { projectId: 1 },
    });
  });

  it("許可待ちメンバー", async () => {
    const requestProjects = [
      {
        id: 1,
        islandId: 1,
        islands: {
          adminId: "xfECbt7q0OapKf3yRWd344qy7Gy2",
          createDate: "2023-05-24T06:08:26.341Z",
          icon: "https://firebasestorage.googleapis.com/v0/b/atsumareengineernomori.appspot.com/o/island%2F%E3%81%8B%E3%81%B5%E3%82%99.png?alt=media&token=9c63e7b5-263f-4f72-bece-faecd14456a9",
          id: 1,
          islandDescription: "💰💰",
          islandName: "カブ",
        },
        projectId: 1,
      },
    ];
    const wrapper = mount(SideMember, {
      setup() {
        return {
          requestProjects,
          props: {
            projectId: 1,
            userJudges: 1,
            islandData: [
              {
                id: 1,
                icon: "https://firebasestorage.googleapis.com/v0/b/atsumareengineernomori.appspot.com/o/island%2F%E3%81%8B%E3%81%B5%E3%82%99.png?alt=media&token=9c63e7b5-263f-4f72-bece-faecd14456a9",
                islandName: "カブ",
                islandDescription: "💰💰",
                adminId: "xfECbt7q0OapKf3yRWd344qy7Gy2",
                createDate: "2023-05-24T06:08:26.341Z",
              },
            ],
          },
        };
      },
    });
    await wrapper.vm.$nextTick();

    // 許可待ちメンバーの表示確認
    const name = wrapper.find(".requestProject");
    expect(name.text()).toBe("カブ");
  });
});

describe("showBtn", () => {
  beforeEach(() => {
    useRouter().push.mockReset();
  });
  it("チャットボタン", async () => {
    const wrapper = mount(ShowBtn, {
      props: {
        projectId: 1,
        myId: "xfECbt7q0OapKf3yRWd344qy7Gy2",
        userJudges: 1,
      },
    });
    await wrapper.vm.$nextTick();

    // 表示確認
    const buttonElement = wrapper.find("#chat");
    expect(buttonElement.text()).toBe("チャット");

    // ボタンのクリックイベントをシミュレートして動作を確認
    await wrapper.find("#chat").trigger("click");
    // パラメータを指定して呼び出されたかどうかの確認
    expect(useRouter().push).toHaveBeenCalledWith({
      name: "projectChat",
      params: { id: 1 },
    });
  });
});

describe("userJudge", () => {
  const adminId = "A";
  const joinIds = ["A", "B", "c"];
  test("admin", () => {
    expect(userJudge(adminId, joinIds, "A")).toBe(1);
  });
  test("admin", () => {
    expect(userJudge(adminId, joinIds, "B")).toBe(2);
  });
  test("admin", () => {
    expect(userJudge(adminId, joinIds, "D")).toBe(3);
  });
});

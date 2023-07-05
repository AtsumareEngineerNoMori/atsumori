import { describe, it, expect, test, vi, beforeEach } from "vitest";

import { mount } from "@vue/test-utils";
import { useRouter } from "vue-router";
import { userJudge } from "../../userJudge";
import { ref } from "vue";

import islandShow from "../../views/Show/islandShow.vue";
import SideMember from "../../components/islandShow/SideMember.vue";
import ShowBtn from "../../components/islandShow/ShowBtn.vue";
import SideScout from "../../components/islandShow/SideScout.vue";

vi.mock("vue-router");
useRouter.mockReturnValue({
  push: vi.fn(),
});

beforeEach(() => {
  useRouter().push.mockReset();
});

describe("SideMember", () => {
  it("メンバー欄", async () => {
    const wrapper = mount(SideMember, {
      props: {
        islandId: 1,
        userJudges: 1,
        userData: [
          {
            comment: "だなも〜〜",
            email: "tanukichi@rakus.co.jp",
            icon: "https://firebasestorage.googleapis.com/v0/b/atsumareengineernomori.appspot.com/o/icon%2Fha.png?alt=media&token=145c0742-89c6-4fdd-8702-6ab6b80d5308",
            id: "xfECbt7q0OapKf3yRWd344qy7Gy2",
            job: "WEB",
            name: "たぬきち",
          },
        ],
      },
    });
    await wrapper.vm.$nextTick();

    // メンバーの表示確認
    const userElement = wrapper.find(".member__content__name");
    expect(userElement.text()).toBe("たぬきち");

    // ボタンのクリックイベントをシミュレートして動作を確認
    await wrapper.find("button").trigger("click");
    // パラメータを指定して呼び出されたかどうかの確認
    expect(useRouter().push).toHaveBeenCalledWith({
      name: "scoutPeople",
      params: { islandId: 1 },
    });
  });

  it("許可待ちメンバー", async () => {
    const requestIslands = [
      {
        userId: "xfECbt7q0OapKf3yRWd344qy7Gy2",
        islandId: 1,
        comment: "a",
        id: 1,
        users: {
          comment: "だなも〜〜",
          email: "tanukichi@rakus.co.jp",
          icon: "https://firebasestorage.googleapis.com/v0/b/atsumareengineernomori.appspot.com/o/icon%2Fha.png?alt=media&token=145c0742-89c6-4fdd-8702-6ab6b80d5308",
          id: "xfECbt7q0OapKf3yRWd344qy7Gy2",
          job: "WEB",
          name: "たぬきち",
        },
      },
    ];
    const wrapper = mount(SideMember, {
      setup() {
        return {
          requestIslands,
          props: {
            islandId: 1,
            userJudges: 1,
            userData: [
              {
                comment: "だなも〜〜",
                email: "tanukichi@rakus.co.jp",
                icon: "https://firebasestorage.googleapis.com/v0/b/atsumareengineernomori.appspot.com/o/icon%2Fha.png?alt=media&token=145c0742-89c6-4fdd-8702-6ab6b80d5308",
                id: "xfECbt7q0OapKf3yRWd344qy7Gy2",
                job: "WEB",
                name: "たぬきち",
              },
            ],
          },
        };
      },
    });
    await wrapper.vm.$nextTick();

    // 許可待ちメンバーの表示確認
    const name = wrapper.find(".requestIsland");
    expect(name.text()).toBe("たぬきち");

    // console.log(wrapper.html());
  });
});

describe("showBtn", () => {
  it("チャットボタン", async () => {
    const wrapper = mount(ShowBtn, {
      props: {
        islandId: 1,
        myId: "myUserId",
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
      name: "islandChat",
      params: { id: 1 },
    });
  });

  it("申請ボタン", async () => {
    const wrapper = mount(ShowBtn, {
      props: {
        islandId: 1,
        myId: "myUserId",
        userJudges: 3,
      },
    });
    await wrapper.vm.$nextTick();

    // 表示確認
    const buttonElement = wrapper.find("#request");
    expect(buttonElement.text()).toBe("移住申請");

    // ボタンのクリックイベントをシミュレートして動作を確認
    await wrapper.find("#request").trigger("click");
    // パラメータを指定して呼び出されたかどうかの確認
    expect(useRouter().push).toHaveBeenCalledWith({
      name: "islandadmissionrequest",
      params: { islandId: 1, userId: "myUserId" },
    });
  });
});

describe("scout", () => {
  it("スカウトあり", async () => {
    const scoutProjects = [
      {
        id: 1,
        islandId: 1,
        projectId: 1,
        projects: {
          projectName: "A",
          projectDescription: "A",
          adminId: "xfECbt7q0OapKf3yRWd344qy7Gy2",
          createDate: "2023-05-24T06:29:49.906Z",
          icon: "https://firebasestorage.googleapis.com/v0/b/atsumareengineernomori.appspot.com/o/project%2Fha.png?alt=media&token=6141dc6e-714a-4257-91e2-88fcd6d436ad",
          adminIslandId: 1,
          id: 1,
        },
      },
    ];
    const scoutIsShow = true;

    const wrapper = mount(SideScout, {
      setup() {
        return {
          scoutProjects,
          scoutIsShow,
        };
      },
    });
    await wrapper.vm.$nextTick();

    // 表示確認
    const title = wrapper.find(".scout__title");
    const projectName = wrapper.find(".scout__content__name");
    expect(title.text()).toBe("スカウトが来ています！");
    expect(projectName.exists()).toBe(true);
  });

  it("スカウトなし", async () => {
    const scoutIsShow = false;
    const wrapper = mount(SideScout, {
      setup() {
        return {
          scoutIsShow,
        };
      },
    });
    await wrapper.vm.$nextTick();

    // 表示確認
    const title = wrapper.find(".scout__title");
    expect(title.text()).toBe("スカウトは来ていません");
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

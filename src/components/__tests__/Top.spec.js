import { mount } from "@vue/test-utils";
import Top from "../Top/TopShow.vue";
import { describe, it, expect } from "vitest";

describe("Top", () => {
  it("witchがislandの場合、島のデータが正しく表示されることを確認する", async () => {
    const wrapper = mount(Top, {
      props: {
        table: "recruitIslandsTop",
        witch: "island",
        title: "新着島",
      },
      setup() {
        return {
          props: {
            table: "recruitIslandsTop",
            witch: "island",
            title: "新着島",
          },
          islands: [
            {
              islandName: "カブ",
              islandDescription: "💰💰",
              adminId: "xfECbt7q0OapKf3yRWd344qy7Gy2",
              createDate: "2023-05-24T06:08:26.341Z",
              icon: "https://firebasestorage.googleapis.com/v0/b/atsumareengineernomori.appspot.com/o/island%2F%E3%81%8B%E3%81%B5%E3%82%99.png?alt=media&token=9c63e7b5-263f-4f72-bece-faecd14456a9",
              id: 1,
            },
            {
              islandName: "ギター",
              islandDescription: "♪♪",
              adminId: "kdUAEOfLkUU75mn5rLmVmOip85i1",
              createDate: "2023-05-24T06:18:44.174Z",
              icon: "https://firebasestorage.googleapis.com/v0/b/atsumareengineernomori.appspot.com/o/island%2Fha.png?alt=media&token=10b4db92-8536-44a6-be94-0541b2b84dc0",
              id: 2,
            },
          ],
        };
      },
    });

    // データの取得を待つ
    await wrapper.vm.$nextTick();

    // 島のデータが正しく表示されていることを検証する
    const islandItems = wrapper.findAll(".top-new-set-item");
    const islandTitle = wrapper.find(".top-new-set-title");
    // expect(islandItems).toHaveLength(2); // 表示される島の数に応じて調整する
    expect(islandItems[0].find('img[name="island"]').attributes("src")).toBe(
      "https://firebasestorage.googleapis.com/v0/b/atsumareengineernomori.appspot.com/o/island%2F%E3%81%8B%E3%81%B5%E3%82%99.png?alt=media&token=9c63e7b5-263f-4f72-bece-faecd14456a9"
    );
    expect(islandItems[0].find(".top-new-set-name").text()).toBe("カブ");
    expect(islandItems[1].find('img[name="island"]').attributes("src")).toBe(
      "https://firebasestorage.googleapis.com/v0/b/atsumareengineernomori.appspot.com/o/island%2Fha.png?alt=media&token=10b4db92-8536-44a6-be94-0541b2b84dc0"
    );
    expect(islandItems[1].find(".top-new-set-name").text()).toBe("ギター");
    expect(islandTitle.find(".top-new-set-title").text()).toBe("新着島");
  });

  it("witchがprojectの場合、プロジェクトのデータが正しく表示されることを確認する", async () => {
    const wrapper = mount(Top, {
      props: {
        table: "recruitProjectsTop",
        witch: "project",
        title: "新着プロジェクト",
      },
      setup() {
        return {
          props: {
            table: "recruitProjectsTop",
            witch: "project",
            title: "新着プロジェクト",
          },
          projects: [
            {
              projectName: "海",
              projectDescription: "海好きあつまれ〜〜",
              adminId: "xfECbt7q0OapKf3yRWd344qy7Gy2",
              createDate: "2023-05-24T08:16:32.369Z",
              icon: "https://firebasestorage.googleapis.com/v0/b/atsumareengineernomori.appspot.com/o/project%2Fwaikiki-beach-g326f6f2d2_640.jpg?alt=media&token=bccc140d-ce3a-4f0a-ad48-89afc8177eb7",
              adminIslandId: 1,
              id: 1,
            },
            {
              projectName: "恐竜",
              projectDescription: "化石発掘〜🦖",
              adminId: "xfECbt7q0OapKf3yRWd344qy7Gy2",
              createDate: "2023-05-24T08:17:37.194Z",
              icon: "https://firebasestorage.googleapis.com/v0/b/atsumareengineernomori.appspot.com/o/project%2Fkaseki_kyoryu2.png?alt=media&token=d6fa6698-ac35-4ba0-82b0-761f92b926e2",
              adminIslandId: 1,
              id: 2,
            },
          ],
        };
      },
    });

    // データの取得を待つ
    await wrapper.vm.$nextTick();

    // プロジェクトのデータが正しく表示されていることを検証する
    const projectItems = wrapper.findAll(".top-new-set-item");
    // expect(projectItems).toHaveLength(2); // 表示されるプロジェクトの数に応じて調整する
    expect(projectItems[0].find('img[name="project"]').attributes("src")).toBe(
      "icon1.png"
    );
    expect(projectItems[0].find(".top-new-set-name").text()).toBe(
      "プロジェクト1"
    );
    expect(projectItems[1].find('img[name="project"]').attributes("src")).toBe(
      "icon2.png"
    );
    expect(projectItems[1].find(".top-new-set-name").text()).toBe(
      "プロジェクト2"
    );
  });
});

// fetchをモック化してデータを設定
// global.fetch = vi.fn().mockResolvedValueOnce({
//   json: vi.fn().mockResolvedValueOnce([
//     { id: 1, icon: "icon1.png", projectName: "島1" },
//     { id: 2, icon: "icon2.png", projectName: "島2" },
//   ]),
// });

// global.fetch = () =>
//   Promise.resolve({
//     json: () =>
//       Promise.resolve([
//         { id: 1, icon: "icon1.png", islandName: "島1" },
//         { id: 2, icon: "icon2.png", islandName: "島2" },
//       ]),
//   });

import { mount } from "@vue/test-utils";
import ProjectRegister from "../../views/register/ProjectRegister.vue";
import { describe, it, expect } from "vitest";

describe("ProjectRegister", () => {
  it("島が登録されていない場合、島の登録ページへのリンクが表示されること", () => {
    const islands = []; // 空の島の配列をセット
    const wrapper = mount(ProjectRegister, {
      data() {
        return {
          islands: islands,
        };
      },
    });

    const link = wrapper.find("a");
    expect(link.exists()).toBeTruthy();
    expect(link.text()).toBe("まずは島を登録しよう");
    expect(link.attributes("href")).toBe("/IslandRegister");
  });

  it("島が登録されている場合、フォームが表示されること", () => {
    const islands = [
      { id: 1, islandName: "Island 1" },
      { id: 2, islandName: "Island 2" },
    ]; // 登録された島の配列をセット
    const wrapper = mount(ProjectRegister, {
      data() {
        return {
          islands: islands,
        };
      },
    });

    const form = wrapper.find("form");
    expect(form.exists()).toBeTruthy();
  });

  it("プロジェクト名が入力されていない場合、エラーメッセージが表示されること", () => {
    const islands = [{ id: 1, islandName: "Island 1" }];
    const wrapper = mount(ProjectRegister, {
      data() {
        return {
          islands: islands,
        };
      },
    });

    const form = wrapper.find("form");
    form.trigger("submit.prevent");

    const nameError = wrapper.find(".val-name");
    expect(nameError.exists()).toBeTruthy();
    expect(nameError.text()).toBe("プロジェクトの名前を入力してください");
  });

  it("プロジェクト名が20文字を超える場合、エラーメッセージが表示されること", () => {
    const islands = [{ id: 1, islandName: "Island 1" }];
    const wrapper = mount(ProjectRegister, {
      data() {
        return {
          islands: islands,
          project: {
            name: "This is a very long project name that exceeds the character limit",
            description: "",
          },
        };
      },
    });

    const form = wrapper.find("form");
    form.trigger("submit.prevent");

    const nameError = wrapper.find(".val-name");
    expect(nameError.exists()).toBeTruthy();
    expect(nameError.text()).toBe("20文字以下で入力してください");
  });

  it("最初に参加する島が選択されていない場合、エラーメッセージが表示されること", () => {
    const islands = [{ id: 1, islandName: "Island 1" }];
    const wrapper = mount(ProjectRegister, {
      data() {
        return {
          islands: islands,
        };
      },
    });

    const form = wrapper.find("form");
    form.trigger("submit.prevent");

    const selectError = wrapper.find(".val-select");
    expect(selectError.exists()).toBeTruthy();
    expect(selectError.text()).toBe("最初に参加する島を選択してください");
  });

  it("プロジェクトの情報が入力されていない場合、エラーメッセージが表示されること", () => {
    const islands = [{ id: 1, islandName: "Island 1" }];
    const wrapper = mount(ProjectRegister, {
      data() {
        return {
          islands: islands,
        };
      },
    });

    const form = wrapper.find("form");
    form.trigger("submit.prevent");

    const infoError = wrapper.find(".val-infomation");
    expect(infoError.exists()).toBeTruthy();
    expect(infoError.text()).toBe("プロジェクトの情報を入力してください");
  });

  it("プロジェクトの情報が255文字を超える場合、エラーメッセージが表示されること", () => {
    const islands = [{ id: 1, islandName: "Island 1" }];
    const wrapper = mount(ProjectRegister, {
      data() {
        return {
          islands: islands,
          project: {
            name: "Project 1",
            description:
              "This is a very long project description that exceeds the character limit. This is a very long project description that exceeds the character limit. This is a very long project description that exceeds the character limit. This is a very long project description that exceeds the character limit.",
          },
        };
      },
    });

    const form = wrapper.find("form");
    form.trigger("submit.prevent");

    const infoError = wrapper.find(".val-infomation2");
    expect(infoError.exists()).toBeTruthy();
    expect(infoError.text()).toBe("255文字以下で入力してください");
  });

  it("プロジェクトが正しく登録されること", () => {
    const islands = [{ id: 1, islandName: "Island 1" }];
    const wrapper = mount(ProjectRegister, {
      data() {
        return {
          islands: islands,
          project: {
            name: "Project 1",
            description: "This is a project description",
          },
          selectIsland: "1",
        };
      },
    });

    const form = wrapper.find("form");
    form.trigger("submit.prevent");

    // ここでプロジェクト登録のAPIリクエストが成功したかを検証するためのモックやスパイを使用する必要があります
    // プロジェクトが正しく登録された場合、ルーターが正しいパスにリダイレクトすることを検証する必要があります
  });
});

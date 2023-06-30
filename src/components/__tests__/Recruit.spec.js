import { mount } from "@vue/test-utils";
import Recruit from "../Register/Recruit.vue";
import { describe, it, expect } from "vitest";

describe("Recruit", () => {
  it("募集タイトルが未入力の場合、エラーメッセージが表示されること", () => {
    const wrapper = mount(Recruit);

    const form = wrapper.find("form");
    form.trigger("submit.prevent");

    const titleError = wrapper.find(".recruitVal");
    expect(titleError.exists()).toBeTruthy();
    expect(titleError.text()).toBe("募集タイトルを入力してください");
  });

  it("募集タイトルが20文字を超える場合、エラーメッセージが表示されること", () => {
    const wrapper = mount(Recruit);

    const titleInput = wrapper.find(
      ".RecruitIslandRegister-details-recruitTitleSet-input"
    );
    titleInput.setValue(
      "This is a very long recruit title that exceeds the character limit"
    );

    const form = wrapper.find("form");
    form.trigger("submit.prevent");

    const titleError = wrapper.find(".recruitVal");
    expect(titleError.exists()).toBeTruthy();
    expect(titleError.text()).toBe("20文字以下で入力してください");
  });

  it("募集職種が未選択の場合、エラーメッセージが表示されること", () => {
    const wrapper = mount(Recruit);

    const form = wrapper.find("form");
    form.trigger("submit.prevent");

    const selectError = wrapper.find(".recruitVal");
    expect(selectError.exists()).toBeTruthy();
    expect(selectError.text()).toBe("募集職種を選択してください");
  });

  it("募集要項が未入力の場合、エラーメッセージが表示されること", () => {
    const wrapper = mount(Recruit);

    const form = wrapper.find("form");
    form.trigger("submit.prevent");

    const infomationError = wrapper.find(".recruitVal");
    expect(infomationError.exists()).toBeTruthy();
    expect(infomationError.text()).toBe("募集要項を入力してください");
  });

  it("募集要項が255文字を超える場合、エラーメッセージが表示されること", () => {
    const wrapper = mount(Recruit);

    const infomationInput = wrapper.find(
      ".RecruitIslandRegister-details-infomationSet-text"
    );
    infomationInput.setValue(
      "This is a very long recruit information that exceeds the character limit. This is a very long recruit information that exceeds the character limit. This is a very long recruit information that exceeds the character limit. This is a very long recruit information that exceeds the character limit."
    );

    const form = wrapper.find("form");
    form.trigger("submit.prevent");

    const infomationError = wrapper.find(".recruitVal");
    expect(infomationError.exists()).toBeTruthy();
    expect(infomationError.text()).toBe("255文字以下で入力してください");
  });

  it("フォームが正しく入力された場合、プロジェクトが登録されること", () => {
    const wrapper = mount(Recruit);

    const titleInput = wrapper.find(
      ".RecruitIslandRegister-details-recruitTitleSet-input"
    );
    titleInput.setValue("Test Project");

    const jobInput = wrapper.find(
      '.RecruitIslandRegister-details-jobSet-job input[type="radio"][value="WEB"]'
    );
    jobInput.setChecked();

    const infomationInput = wrapper.find(
      ".RecruitIslandRegister-details-infomationSet-text"
    );
    infomationInput.setValue("Test recruit information");

    const form = wrapper.find("form");
    form.trigger("submit.prevent");
    // expect();
  });
});

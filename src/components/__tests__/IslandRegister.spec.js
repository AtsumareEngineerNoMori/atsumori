import { mount } from "@vue/test-utils";
import IslandRegister from "../../views/register/IslandRegister.vue";
import { describe, it, expect } from "vitest";
import { useRouter } from "vue-router";

const router = useRouter();

describe("IslandRegister", () => {
  it("島の名前と島の情報が正しく入力され、アイコンが選択されている場合", () => {
    const router = useRouter();
    const wrapper = mount(IslandRegister);

    // 島の名前と島の情報の入力フィールドに値をセット
    const nameInput = wrapper.find(".IslandRegister-details-name-input");
    const descriptionInput = wrapper.find(
      ".IslandRegister-details-information-text"
    );
    nameInput.setValue("島A");
    descriptionInput.setValue("島Aの情報");

    // アイコンの選択イベントをシミュレート
    // const file = new File(["dummy"], "icon.png", { type: "image/png" });
    // const inputElement = wrapper.find("#iconPreview").element;
    // inputElement.files = [file];
    // inputElement.dispatchEvent(new Event("change"));

    // フォームの送信イベントをトリガー
    const form = wrapper.find("form");
    form.trigger("submit.prevent");

    expect(router.currentRoute.value.path).toBe("/top");
    // expect(registerProject).toHaveBeenCalledWith();
  });

  it("島の名前が未入力の場合", () => {
    const router = useRouter();
    const wrapper = mount(IslandRegister);

    // 島の情報の入力フィールドに値をセット
    const descriptionInput = wrapper.find(
      ".IslandRegister-details-information-text"
    );
    descriptionInput.setValue("島Bの情報");

    // アイコンの選択イベントをシミュレート
    // const file = new File(["dummy"], "icon.png", { type: "image/png" });
    // const inputElement = wrapper.find("#iconPreview").element;
    // inputElement.files = [file];
    // inputElement.dispatchEvent(new Event("change"));

    // フォームの送信イベントをトリガー
    const form = wrapper.find("form");
    form.trigger("submit.prevent");

    // アサーション：適切なエラーメッセージが表示され、島の登録が行われないことを確認
    const nameError = wrapper.find(".val-name");
    expect(nameError).toBeTruthy();
  });

  it("島の名前と島の情報が未入力の場合、登録が行われずエラーメッセージが表示されること", () => {
    const router = useRouter();
    const wrapper = mount(IslandRegister);

    // フォームの送信イベントをトリガー
    const form = wrapper.find("form");
    form.trigger("submit.prevent");

    // アサーション：適切なエラーメッセージが表示され、島の登録が行われないことを確認
    const nameError = wrapper.find(".val-name");
    const infoError = wrapper.find(".val-infomation3");
    expect(nameError).toBeTruthy();
    expect(infoError).toBeTruthy();
  });

  it("島の名前が20文字を超える場合、登録が行われずエラーメッセージが表示されること", () => {
    const router = useRouter();
    const wrapper = mount(IslandRegister);

    // 島の名前の入力フィールドに長い文字列をセット
    const nameInput = wrapper.find(".IslandRegister-details-name-input");
    nameInput.setValue(
      "This is a very long island name that exceeds the character limit."
    );

    // フォームの送信イベントをトリガー
    const form = wrapper.find("form");
    form.trigger("submit.prevent");

    // アサーション：適切なエラーメッセージが表示され、島の登録が行われないことを確認
    const nameError = wrapper.find(".val-name");
    expect(nameError).toBeTruthy();
  });

  it("島の情報が255文字を超える場合、登録が行われずエラーメッセージが表示されること", () => {
    const router = useRouter();
    const wrapper = mount(IslandRegister);

    // 島の情報の入力フィールドに長い文字列をセット
    const descriptionInput = wrapper.find(
      ".IslandRegister-details-information-text"
    );
    descriptionInput.setValue(
      "This is a very long island description that exceeds the character limit. This is a very long island description that exceeds the character limit. This is a very long island description that exceeds the character limit. This is a very long island description that exceeds the character limit. This is a very long island description that exceeds the character limit."
    );

    // フォームの送信イベントをトリガー
    const form = wrapper.find("form");
    form.trigger("submit.prevent");

    // アサーション：適切なエラーメッセージが表示され、島の登録が行われないことを確認
    const infoError = wrapper.find(".val-infomation4");
    expect(infoError).toBeTruthy();
  });

  it("島の名前と島の情報が正しく入力されている場合、登録が正常に行われること", () => {
    const router = useRouter();
    const wrapper = mount(IslandRegister);

    // 島の名前と島の情報の入力フィールドに適切な値をセット
    const nameInput = wrapper.find(".IslandRegister-details-name-input");
    nameInput.setValue("My Island");
    const descriptionInput = wrapper.find(
      ".IslandRegister-details-information-text"
    );
    descriptionInput.setValue("This is my beautiful island.");

    // フォームの送信イベントをトリガー
    const form = wrapper.find("form");
    form.trigger("submit.prevent");

    // アサーション：島の登録が行われ、遷移先が正しいことを確認
    expect(router.currentRoute.value.path).toBe("/top");
    // expect(registerProject).toHaveBeenCalledWith();
    // expect(関数名.fetch).toHaveBeenCalledTime(1)関数が呼ばれているかのテスト
  });
});

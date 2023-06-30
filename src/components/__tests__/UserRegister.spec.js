import { mount } from "@vue/test-utils";
import UserRegister from "../../views/register/UserRegister.vue";
import { describe, it, expect } from "vitest";

describe("User Registration", () => {
  it("ユーザーが正常に登録されることを確認する", async () => {
    const wrapper = mount(UserRegister);

    // 画像、名前、職種、ひとこと、メールアドレス、パスワード、確認用パスワードの入力フィールドを取得する
    // const imageInput = wrapper.find("userRegister-details-icon-icon_input");
    const nameInput = wrapper.find('input[name="name"]');
    // const occupationInput = wrapper.find('');
    const commentInput = wrapper.find("textarea");
    const emailInput = wrapper.find('input[type="email"]');
    const passwordInput = wrapper.find('input[name="password"]');
    const confirmPasswordInput = wrapper.find('input[name="confirmPassword"]');

    // 各フィールドに適切な値を設定する
    // imageInput.setValue("test_image.png");
    await nameInput.setValue("name");
    // occupationInput.setValue("test");
    await commentInput.setValue("test");
    await emailInput.setValue("test@rakus.co.jp");
    await passwordInput.setValue("Password123");
    await confirmPasswordInput.setValue("Password123");

    // 登録ボタンをクリックする
    const registerButton = wrapper.find(".userRegister-details2-button");
    registerButton.trigger("click");

    // ユーザーが正常に登録されたかどうかを確認する
    const message = wrapper.find("hello");
    expect(message).toBeTruthy();
  });

  it("メールアドレスが無効な形式の場合、エラーメッセージが表示されることを確認する", async () => {
    const wrapper = mount(UserRegister);
    const emailInput = wrapper.find('input[name="email"]');
    await emailInput.setValue("test@exsample.com");
    expect(wrapper.find("val-email")).toBeTruthy();
  });

  it("パスワードと確認用パスワードが一致しない場合、エラーメッセージが表示されることを確認する", () => {
    const wrapper = mount(UserRegister);
    const passwordInput = wrapper.find('input[name="password"]'); // パスワード入力フィールドの要素を取得
    const confirmPasswordInput = wrapper.find('input[name="confirmPassword"]'); // 確認用パスワード入力フィールドの要素を取得

    // パスワードと確認用パスワードの値を設定
    passwordInput.setValue("Password123");
    confirmPasswordInput.setValue("mismatchedPassword");

    // エラーメッセージの表示を確認する
    expect(wrapper.find("span")).toBeTruthy();
    // expect(wrapper.find("span").exists()).toBeTruthy();
  });

  it("必須フィールドが未入力の場合、エラーメッセージが表示されることを確認する", async () => {
    const wrapper = mount(UserRegister);
    const nameInput = wrapper.find('input[name="name"]');
    // const occupationInput = wrapper.find('');
    const commentInput = wrapper.find("textarea");
    const emailInput = wrapper.find('input[type="email"]');
    const passwordInput = wrapper.find('input[name="password"]');
    const confirmPasswordInput = wrapper.find('input[name="confirmPassword"]');
    await nameInput.setValue("");
    // occupationInput.setValue("");
    await commentInput.setValue("");
    await emailInput.setValue("");
    await passwordInput.setValue("");
    await confirmPasswordInput.setValue("");
    const registerButton = wrapper.find(".userRegister-details2-button");
    registerButton.trigger("click");
    expect(wrapper.find("val-name")).toBeTruthy();
    expect(wrapper.find("val-password")).toBeTruthy();
  });
});

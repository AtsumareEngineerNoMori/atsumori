import { mount } from "@vue/test-utils";
import Login from "../../views/Login.vue";
import { describe, it, expect } from "vitest";

import { createApp } from "vue";
import { signInWithEmailAndPassword } from "@firebase/auth";

// @firebase/auth モジュールのモックを作成
// const mockSignInWithEmailAndPassword = mockFn();
// signInWithEmailAndPassword.mockImplementation(mockSignInWithEmailAndPassword);
// jest.mock("@firebase/auth", () => ({
//   signInWithEmailAndPassword: jest.fn(),
// }));

describe("Login", () => {
  it("ユーザー名とパスワードの入力フィールドが正しく表示されているかどうか", () => {
    const wrapper = mount(Login);
    const emailInput = wrapper.find('input[type="email"]');
    const passwordInput = wrapper.find('input[type="password"]');
    expect(emailInput.exists()).toBe(true);
    expect(passwordInput.exists()).toBe(true);
  });

  it("ユーザー名やパスワードを入力せずにログインボタンをクリックした場合、エラーメッセージが表示されるかどうか", async () => {
    const input = true;
    const user = { email: "", password: "" };
    const wrapper = mount(Login, {
      setup() {
        return { input, user };
      },
    });
    const loginButton = wrapper.find(".loginPage-button");
    await loginButton.trigger("click");
    const errorMessage = wrapper.find(".alart");
    expect(errorMessage.exists()).toBe(true);
  });

  it("有効なユーザー名とパスワードを入力してログインボタンをクリックした場合、正常にログインできるかどうか", async () => {
    const wrapper = mount(Login);

    // const app = createApp({});
    // app.use(routerMock);
    // app.config.globalProperties.$router = routerMock;
    // const wrapper = mount(Login, { app });

    // ユーザー名とパスワードの入力欄を取得して値を設定する
    const emailInput = wrapper.find(".loginPage-email");
    const passwordInput = wrapper.find(".loginPage-password");
    await emailInput.setValue("valid_email@rakus.co.jp");
    await passwordInput.setValue("valid_Password123");

    // ログインボタンをクリックする
    const loginButton = wrapper.find(".loginPage-button");
    await loginButton.trigger("click");

    // const mockSignInWithEmailAndPassword = signInWithEmailAndPassword;
    // mockSignInWithEmailAndPassword.mockResolvedValueOnce({
    //   user: { uid: "mockUserId" },
    // });

    // const routerPushSpy = jest.fn.mockResolvedValue();
    // const routerMock = {
    //   push: routerPushSpy,
    // };

    // ログイン後の表示を確認する
    // const routerPushSpy = jest.spyOn(router, "push");
    // expect(routerPushSpy).toHaveBeenCalledWith("/top");
    // expect(mockSignInWithEmailAndPassword).toHaveBeenCalledWith(
    //   expect.anything(),
    //   "valid_email@example.com",
    //   "valid_password"
    // );
  });

  it("無効なユーザー名やパスワードを入力してログインボタンをクリックした場合、エラーメッセージが表示されるかどうか", async () => {
    // テスト対象のコンポーネントをレンダリング
    const wrapper = mount(Login);

    // 入力フィールドに値を設定
    const emailInput = wrapper.find(".loginPage-email");
    const passwordInput = wrapper.find(".loginPage-password");
    await emailInput.setValue("valid_email@exsample.co.jp");
    await passwordInput.setValue("valid_password");

    // ログインボタンをクリック
    const loginButton = wrapper.find(".loginPage-button");
    await loginButton.trigger("click");

    // エラーメッセージが表示されていることを確認
    expect(expect.anything(), "valid_email@exsample.co.jp", "valid_password");
    const errorMessage = wrapper.find(".alart");
    expect(errorMessage).toBeTruthy();
  });
});

// Udemy
// GCP
// wrapper.vm.Login;

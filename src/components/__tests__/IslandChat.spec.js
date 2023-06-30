//データの有無→データがある場合はgetData関数が呼び出されてデータ取得できること、ない場合は".chat__messageWrapper-noDataTitle"が表示されること
// firstGetAllData関数が呼び出されて全件取得できること
// 送信ボタンクリックしてsubmit関数がよびだされること
// submit関数が呼び出されて1~120文字以内であれば成功、そうでなければエラーメッセージが表示されるか
// メッセージが追加されると、画面が自動的にスクロールして最新のメッセージが表示されることを確認します。
// さらに読み込むボタンクリックで、loadMore関数が呼び出され、getAllData関数が正しく呼び出され、全データが取得されること

import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import IslandChat from "../../views/chat/IslandChat.vue";
import MyChat from "../chat/MyChat.vue";
import OtherChat from "../chat/OtherChat.vue";
import { getIdData } from "../../getData";

describe("IslandChat", () => {
  it("データがある場合", async () => {

    const route = {
      params: {
        id: 1,
      }
    }
    const wrapper = await mount(IslandChat, {
      setup() {
        return {
          chatList: [
            {
              createDate: new Date(),
              icon: "user-icon.png",
              islandId: 1,
              message: "こんにちは",
              userId: "userId",
              name: "たろう",
            },
          ],
          islandData: [
            {
              id: 1,
              icon: "island-icon.png",
              islandName: "島A",
              islandDescription: "島Aの説明文",
              adminId: "adminUserId",
              createDate: new Date(),
            },
          ],
          route
        }
      },
    });

    await wrapper.vm.$nextTick();
    console.log(wrapper.text())
    // 「メッセージがありません」と表示されないこと
    expect(wrapper.find(`[data-testid="noDataMessage"]`).exists()).toBe(false);
    // リスト表示されること
    expect(wrapper.find(`[data-testid="dataList"]`).exists()).toBe(true);
  });
});

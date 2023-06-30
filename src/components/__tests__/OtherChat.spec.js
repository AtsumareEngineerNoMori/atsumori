import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import OtherChat from "../chat/OtherChat.vue";

describe("OtherChat", () => {
  it("受け取ったpropsが表示されること", async() => {
    const wrapper = mount(OtherChat, {
      props: {
        chat: {
          createDate: new Date(),
          icon: "chatIcon.png",
          islandId: 1,
          message: "Hello",
          userId: "userId",
          name: "guest",
        },
      },
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.find(".chat__messageWrapper-message").exists()).toBe(true);
  });

});

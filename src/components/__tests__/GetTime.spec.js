import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import GetTime from "../date/GetTime.vue";

describe("GetTime", () => {
  it("受け取ったpropsが表示されること", async () => {
    const wrapper = mount(GetTime, {
      props: { createDate: new Date() },
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.find(".time").exists()).toBe(true);
  });
});

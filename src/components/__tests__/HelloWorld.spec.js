import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import HelloWorld from '../HelloWorld.vue'

describe('HelloWorld', () => {
  it('renders properly', () => {
    const wrapper = mount(HelloWorld, { props: { msg: 'Hello Vitest' } })
    expect(wrapper.text()).toContain('Hello Vitest')
  })
})

// import { shallowMount } from "@vue/test-utils";
// import HelloWorld from "../HelloWorld.vue";

// describe("HelloWorld.vue", () => {
//   test("renders props.msg when passed", () => {
//     const msg = "new message";
//     const wrapper = shallowMount(HelloWorld, {
//       propsData: { msg },
//     });
//     expect(wrapper.text()).toMatch(msg);
//   });
// });

// import { mount } from "@vue/test-utils";
// // import HelloWorld from "@/components/HelloWorld.vue";
// // import HelloWorld from "../../src/components/HelloWorld.vue";
// import HelloWorld from "../HelloWorld.vue";


// describe("HelloWorld.vue", () => {
//   test("renders props.msg when passed", () => {
//     const msg = "new message";
//     const wrapper = mount(HelloWorld, {
//       propsData: { msg },
//     });
//     expect(wrapper.text()).toMatch(msg);
//   });
// });


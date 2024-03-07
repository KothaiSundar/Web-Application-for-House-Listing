import { shallowMount } from "@vue/test-utils";
import Houses from "@/components/Houses.vue";


describe("Houses.vue", () => {
  test("component mounts successfully", () => {
    const wrapper = shallowMount(Houses);
    expect(wrapper.exists()).toBe(true);
  });
});

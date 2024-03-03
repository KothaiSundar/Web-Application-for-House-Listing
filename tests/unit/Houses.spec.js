import { shallowMount } from "@vue/test-utils";
import Houses from "@/components/Houses.vue";

describe("Houses.vue", () => {
  test("component mounts successfully", () => {
    const wrapper = shallowMount(Houses);
    expect(wrapper.exists()).toBe(true);
  });
});

// import { mount } from "@vue/test-utils";
// import Houses from "@/components/Houses.vue";
// import housingApiService from "@/services/HousingApiServices";

// jest.mock("@/services/HousingApiServices");4

// describe("Houses.vue", () => {
//   it("fetches houses on mount", async () => {
//     // Mock the API response
//     const mockHouses = [
//       { id: 1, location: { street: "Main", houseNumber: "123" } },
//     ];
//     housingApiService.getAllHouses.mockResolvedValue({ data: mockHouses });

//     const wrapper = mount(Houses);

//     // Assert that API was called
//     expect(housingApiService.getAllHouses).toHaveBeenCalled();

//     // Wait for the component to update
//     await wrapper.vm.$nextTick();

//     // Assert that the houses data was set
//     expect(wrapper.vm.houses).toEqual(mockHouses);
//   });

//   // Other tests...
// });

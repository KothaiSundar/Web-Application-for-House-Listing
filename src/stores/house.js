import { defineStore } from "pinia";

export const useHouseStore = defineStore("house", {
  state: () => ({
    currentListing: null,
  }),
  getters: {
    getCurrentListing(state) {
      return state.currentListing;
    },
  },
  actions: {
    setListing(listing) {
      this.currentListing = listing;
    },
    clearListing() {
      this.currentListing = null;
    },
  },
  // Set up persistence with the plugin
  persist: {
    enabled: true,
    strategies: [
      {
        storage: sessionStorage, // or localStorage
        paths: ["currentListing"],
      },
    ],
  },
});

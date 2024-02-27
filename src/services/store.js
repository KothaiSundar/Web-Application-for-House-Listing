import { defineStore } from "pinia";

export const useHouseStore = defineStore("house", {
  state: () => ({
    currentListing: null,
  }),
  actions: {
    setListing(listing) {
      this.currentListing = listing;
    },
    clearListing() {
      this.currentListing = null;
    },
  },
});

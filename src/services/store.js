import { defineStore } from "pinia";

export const useHouseStore = defineStore("house", {
  state: () => ({
    currentListing:
      JSON.parse(sessionStorage.getItem("currentListing")) || null,
  }),
  actions: {
    setListing(listing) {
      this.currentListing = listing;
      sessionStorage.setItem("currentListing", JSON.stringify(listing));
    },
    clearListing() {
      console.log("clear listing inside");

      this.currentListing = null;
      sessionStorage.removeItem("currentListing");
    },
  },
});

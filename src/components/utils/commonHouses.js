import { useHouseStore } from "../../services/store";
import housingApiService from "../../services/HousingApiServices";
export default {
  data() {
    return {
      showDeleteModal: false, // associated with delete icon, if true delete popup page will be displayed
      searchQuery: "", // to store search bar user query
      searchMessage: "", // result of number of houses
      sortBy: "price", // by default to view sorted houses by price
      sortByAsc: true,
      houses: [], // initially setting house details as empty array, loaded on mounted action
    };
  },
  watch: {
    showDeleteModal(value) {
      if (value) {
        // When showDeleteModal is true, add the no-scroll class to prevent the background from scrolling
        document.body.classList.add("no-scroll");
      } else {
        // When showDeleteModal is false, remove the no-scroll class to allow scrolling again
        document.body.classList.remove("no-scroll");
      }
    },

    // when we search any house attibuted in search bar this method is called
    searchQuery(newQuery) {
      if (!newQuery) {
        this.searchMessage = "";
      }
    },
  },

  mounted() {
    // Fetch the house data when the component created
    this.fetchHouses();
  },

  computed: {
    filteredAndSortedHouses() {
      // house containder depends on this method to display result filtered on sorting
      let result = this.filterHouses(this.houses);
      result = this.sortHouses(result);
      return result;
    },
  },

  methods: {
    async fetchHouses() {
      try {
        const response = await housingApiService.getAllHouses();

        if (response.status !== 200) {
          throw new Error("Failed to get houses ");
        }
        this.houses = response.data;
      } catch (error) {
        window.alert(
          "Error fetching houses: " + error.message + ", try after some time!!"
        );
      }
    },

    // if create clicked, directed to houseform
    createHouse() {
      const houseStore = useHouseStore();
      houseStore.clearListing();
      this.$router.push({ name: "Create" });
    },

    //if edit icon clicked, directed to houseform page
    editHouse(houseId) {
      // checking if the houseid if same, to fetch the details of the house
      const listing = this.houses.find((house) => house.id === houseId);
      const houseStore = useHouseStore();
      houseStore.setListing(listing);
      this.$router.push({ name: "Edit" });
    },

    showDeletePopup(houseId) {
      if (houseId) {
        this.selectedHouseId = houseId;
        this.showDeleteModal = true;
      }
    },

    setSortCriteria(criteria) {
      if (this.sortBy === criteria) {
        // same sort caiteria , just change sort order
        this.sortByAsc = !this.sortByAsc;
      } else {
        this.sortBy = criteria;
        this.sortByAsc = true; //set default to true as criteria is change. i.e from price to size
      }
    },

    // if clear icon clicked this method is called and clearing query and message
    clearSearch() {
      this.searchQuery = "";
      this.searchMessage = "";
      this.fetchHouses();
    },

    //directed to house details page if we click any houselayout
    goToHouseDetails(houseId) {
      this.$router.push({
        name: "HouseDetails",
        params: { id: houseId },
      });
    },

    filterHouses(toFilterList) {
      if (!this.searchQuery) {
        return toFilterList;
      }

      const filtered = toFilterList.filter((house) =>
        house.location.city
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase())
      );
      // Update search message based on results
      if (!this.searchQuery) {
        this.searchMessage = "";
      } else if (filtered.length > 0) {
        this.searchMessage = `${filtered.length} result(s) found`;
      } else {
        this.searchMessage = "";
      }
      return filtered; // Return unfiltered houses by default
    },

    sortHouses(toSortList) {
      // Use a computed property to return the houses sorted by the selected criteria
      if (this.sortBy === "price") {
        return toSortList.slice().sort((a, b) => {return this.sortByAsc ? a.price - b.price : b.price - a.price;});
      } else if (this.sortBy === "size") {
        return toSortList.slice().sort((a, b) => {return this.sortByAsc ? a.size - b.size : b.size - a.size;});
      }
      return toSortList; // Return unsorted houses by default
    },
  },
};

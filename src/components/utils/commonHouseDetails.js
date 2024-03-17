import { useHouseStore } from "../../stores/house";
import housingApiService from "../../services/HousingApiServices";
export default {
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      showDeleteModal: false, // associated with delete icon, if true delete popup page will be displayed
      selectedHouseId: null, //initially setting houseId to null for calling delele popup
      house: null, // store house details object
      loading: true, //store loading message
      error: null, //stoe error message
    };
  },

  created() {
    this.houseId = this.id;
    this.fetchHouseDetails();
  },

  watch: {
    showDeleteModal(value) {
      console.log("watch " + value);
      if (value) {
        // When showDeleteModal is true, add the no-scroll class to prevent the background from scrolling
        document.body.classList.add("no-scroll");
      } else {
        // When showDeleteModal is false, remove the no-scroll class to allow scrolling again
        document.body.classList.remove("no-scroll");
      }
    },
  },

  methods: {
    // if back icon is clicked, directed to houses page
    goBack() {
      this.$router.push({ name: "Houses" });
    },

    // this method fetch house details through API
    async fetchHouseDetails() {
      try {
        let houseResponse = await housingApiService.getHouseById(this.houseId);
        if (houseResponse.status !== 200) {
          window.alert(
            `Unable to fetch House details for HouseId: ${this.houseId} `
          );
          return;
        }
        if (
          Array.isArray(houseResponse.data) &&
          houseResponse.data.length > 0
        ) {
          this.house = houseResponse.data[0];
        } else {
          window.alert(
            `Unable to fetch House details for HouseId: ${this.houseId} `
          );
        }
      } catch (error) {
        window.alert(
          `Error fetching houses details with : ${error.message}, try after some time!!`
        );
      }
    },

    showDeletePopup(houseId) {
      if (houseId) {
        this.selectedHouseId = houseId;
        this.showDeleteModal = true;
      }
    },

    editHouse(houseId) {
      const houseStore = useHouseStore();
      houseStore.setListing(this.house);
      this.$router.push({ name: "Edit" });
    },
  },
};

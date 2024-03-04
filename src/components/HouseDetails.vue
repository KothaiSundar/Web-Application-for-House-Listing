<template>
  <div class="house-detail-page" :class="{ 'no-scroll': showDeleteModal }">

    <section class="house-details-layout layout">

      <div class="navigation-bar">

        <div class="navigation-content">
          <button @click="goBack" class="back-icon">

            <img src="./assets/ic_back_grey@3x.png" alt="back">
          </button>

          <div class="back-to-overview back-button">
            Back to overview
          </div>

        </div>

      </div>

      <div class="house-detailed-layout">


        <div class="house-details">

          <div v-if="house" class="details-layout">

            <div class="house-image">
              <img :src="house.image" alt="House image" />
            </div>

            <div class="house-info">
              <div class="house-titlebar">
                <h1>{{ `${house.location.street} ${house.location.houseNumber}` }}</h1>
                <span class="house-actions" v-if="house.madeByMe">
                  <img src="./assets/ic_edit@3x.png" alt="Edit" class="icon edit-icon"
                    @click.stop="editHouse(house.id)" />
                  <img src="./assets/ic_delete@3x.png" alt="Delete" class="icon delete-icon"
                    @click.stop="showDeletePopup(house.id)" />
                </span>
              </div>
              <p class="house-location">
                <img class="icon" src="./assets/ic_location@3x.png" alt="location">
                <span class="listing-info">{{ `${house.location.zip} ${house.location.city}` }}</span>
              </p>


              <ul class="house-area listing-info">
                <li>
                  <img class="icon" src="./assets/ic_price@3x.png" alt="price_icon">
                  <span>{{ house.price.toLocaleString() }}</span>
                </li>
                <li>
                  <img class="icon" src="./assets/ic_size@3x.png" alt="size_icon">
                  <span>{{ house.size }} m²</span>
                </li>
                <li>
                  <img class="icon" src="./assets/ic_construction_date@3x.png" alt="construction_icon">
                  <span>Built in {{ house.constructionYear }}</span>
                </li>
              </ul>

              <ul class="house-attributes">
                <li>
                  <img class="icon" src="./assets/ic_bed@3x.png" alt="bed_icon">
                  <span>{{ house.rooms.bedrooms }}</span>
                </li>
                <li>
                  <img class="icon" src="./assets/ic_bath@3x.png" alt="bath_icon">
                  <span>{{ house.rooms.bathrooms }}</span>
                </li>
                <li>
                  <img class="icon" src="./assets/ic_garage@3x.png" alt="garage_icon">
                  <span>{{ house.hasGarage ? 'Yes' : 'No' }}</span>
                </li>
              </ul>

              <p class="house-description body-text">{{ house.description }}</p>


            </div>

          </div>

          <div v-else class="loading">
            Loading details...
          </div>

        </div>
        <div class="house-recommended">
          <h2>Recommended for you</h2>
        </div>

      </div>


    </section>

  </div>


  <delete-popup v-if="showDeleteModal" :houseId="selectedHouseId" @close="showDeleteModal = false"></delete-popup>

</template>

<script>

import housingApiService from '../services/HousingApiServices'
import { useHouseStore } from '../services/store';
import DeletePage from '../components/Delete.vue';
export default {
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  components: {
    'delete-popup': DeletePage
  },

  data() {
    return {
      showDeleteModal: false,    // associated with delete icon, if true delete popup page will be displayed
      selectedHouseId: null,     //initially setting houseId to null for calling delele popup
      house: null,              // store house details object  
      loading: true,              //store loading message
      error: null,               //stoe error message
    };
  },


  created() {

    this.houseId = this.$route.params.id;
    this.fetchHouseDetails();
  },


  watch: {

    showDeleteModal(value) {
      console.log("watch " + value);
      if (value) {
        // When showDeleteModal is true, add the no-scroll class to prevent the background from scrolling
        document.body.classList.add('no-scroll');
      } else {
        // When showDeleteModal is false, remove the no-scroll class to allow scrolling again
        document.body.classList.remove('no-scroll');
      }
    }
  },

  methods: {

    // if back icon is clicked, directed to houses page
    goBack() {
      this.$router.push({ name: 'Houses' });
    },

    // this method fetch house details through API
    async fetchHouseDetails() {

      try {
        let houseResponse = await housingApiService.getHouseById(this.houseId);

        if (houseResponse.status !== 200) {
          window.alert(`Unable to fetch House details for HouseId: ${this.houseId} `);
          return;
        }

        if (Array.isArray(houseResponse.data) && houseResponse.data.length > 0) {
          this.house = houseResponse.data[0];
        } else {
          window.alert(`Unable to fetch House details for HouseId: ${this.houseId} `);
        }


      }
      catch (error) {
        window.alert(`Error fetching houses details with : ${error.message}, try after some time!!`);
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
      this.$router.push({ name: 'HouseForm' });

    },
  },

};
</script>

<style scoped>
@import './assets/styles/houseDetails.css';
</style>
<template>
  <div class="houses-page">

    <section class="layout">

      <div class="top-bar">

        <div class="heading">
          <h1>Houses</h1>
          <button class="create-new-btn" @click.stop="createHouse()">+ CREATE NEW</button>
        </div>


        <div class="sorting">

          <div class="search-barInput">
            <img src="./assets/ic_search@3x.png" alt="search-icon" class="search-icon">
            <input type="text" placeholder="Search by City" class="search-bar input-field" v-model="searchQuery" />
            <img v-if="searchQuery" src="./assets/ic_clear@3x.png" alt="clear-icon" class="clear-class"
              @click="clearSearch" />

          </div>

          <div class="sort-buttons">
            <button class="sort-btn-price" :class="{ active: sortBy === 'price' }" @click="setSortCriteria('price')">
              Price
            </button>
            <button class="sort-btn-size" :class="{ active: sortBy === 'size' }" @click="setSortCriteria('size')">
              Size
            </button>
          </div>
        </div>

        <div class="search-result" v-if="searchMessage">
          <p class="listing-info">{{ searchMessage }}</p>
        </div>

      </div>

      <div class="houses-container">
        <div v-if="filteredAndSortedHouses.length > 0">

          <div class="house-card" v-for="house in filteredAndSortedHouses" :key="house.id"
            @click="goToHouseDetails(house.id)">
            <img :src="house.image" alt="House image" class="houses-image" />
            <div class="houses-info">
              <div class="houses-details">
                <h2>{{ `${house.location.street} ${house.location.houseNumber}` }}</h2>
                <p class="listing-info">€ {{ house.price.toLocaleString() }}</p>
                <p class="houses-address"> {{ `${house.location.zip} ${house.location.city}` }} </p>
                <p class="houses-icons">
                  <img class="icon" src="./assets/ic_bed@3x.png" alt="bed_icon">
                  <span>{{ house.rooms.bedrooms }} </span>
                  <img class="icon" src="./assets/ic_bath@3x.png" alt="bath_icon">
                  <span>{{ house.rooms.bathrooms }} </span>
                  <img class="icon" src="./assets/ic_size@3x.png" alt="size_icon">
                  <span>{{ house.size }} m²</span>
                </p>
              </div>
              <div class="houses-actions" v-if="house.madeByMe">
                <img src="./assets/ic_edit@3x.png" alt="Edit" class="icon edit-icon"
                  @click.stop="editHouse(house.id)" />
                <img src="./assets/ic_delete@3x.png" alt="Delete" class="icon delete-icon"
                  @click.stop="showDeletePopup(house.id)" />
              </div>
            </div>




          </div>
        </div>
        <div v-else class="noResults">
          <div class="noResultsContent">
            <img src="./assets/img_empty_houses@3x.png" alt="No results" class="no-results-image" />
            <p class="empty-message">No results found.<br>Please try another keyword.</p>
          </div>
        </div>
      </div>

    </section>


  </div>
  <delete-popup v-if="showDeleteModal" @houseDeleted="fetchHouses" :houseId="selectedHouseId"
    @close="showDeleteModal = false"></delete-popup>

</template>


<script>

import { useHouseStore } from '../services/store';
import housingApiService from '../services/HousingApiServices'
import DeletePage from '../components/Delete.vue';
export default {
  name: 'Houses',
  data() {
    return {
      showDeleteModal: false,   // associated with delete icon, if true delete popup page will be displayed
      searchQuery: '',          // to store search bar user query
      searchMessage: '',        // result of number of houses
      sortBy: 'price',           // by default to view sorted houses by price    
      houses: []                 // initially setting house details as empty array, loaded on mounted action
    };
  },
  watch: {
    showDeleteModal(value) {

      if (value) {
        // When showDeleteModal is true, add the no-scroll class to prevent the background from scrolling
        document.body.classList.add('no-scroll');
      } else {
        // When showDeleteModal is false, remove the no-scroll class to allow scrolling again
        document.body.classList.remove('no-scroll');
      }
    },

    // when we search any house attibuted in search bar this method is called
    searchQuery(newQuery) {
      if (!newQuery) {

        this.searchMessage = '';
      }
    },
  },


  mounted() {
    // Fetch the house data when the component created
    this.fetchHouses();
  },
  components: {
    'delete-popup': DeletePage
  },

  computed: {

    filteredAndSortedHouses() {
      // house containder depends on this method to display result filtered on sorting
      let result = this.filterHouses(this.houses);
      result = this.sortHouses(result);
      return result;
    }
  },

  methods: {

    async fetchHouses() {

      try {
        const response = await housingApiService.getAllHouses();

        if (response.status !== 200) {
          throw new Error('Failed to get houses ');
        }
        this.houses = response.data;
      }
      catch (error) {

        window.alert('Error fetching houses: ' + error.message + ", try after some time!!");
      }
    },

    // if create clicked, directed to houseform
    createHouse() {
      const houseStore = useHouseStore();
      houseStore.clearListing();
      this.$router.push({ name: 'HouseForm' });
    },

    //if edit icon clicked, directed to houseform page
    editHouse(houseId) {
      // checking if the houseid if same, to fetch the details of the house
      const listing = this.houses.find(house => house.id === houseId);

      const houseStore = useHouseStore();
      houseStore.setListing(listing);
      this.$router.push({ name: 'HouseForm' });
    },


    showDeletePopup(houseId) {

      if (houseId) {
        this.selectedHouseId = houseId;
        this.showDeleteModal = true;
      }

    },


    setSortCriteria(criteria) {
      this.sortBy = this.sortBy === criteria ? '' : criteria;

    },

    // if clear icon clicked this method is called and clearing query and message 
    clearSearch() {
      this.searchQuery = '';
      this.searchMessage = '';
      this.fetchHouses();
    },

    //directed to house details page if we click any houselayout
    goToHouseDetails(houseId) {
      this.$router.push({ name: 'HouseDetails', params: { id: houseId } });
    },


    filterHouses(toFilterList) {
      if (!this.searchQuery) {
        return toFilterList;
      }

      const filtered = toFilterList.filter(house =>
        house.location.city.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
      // Update search message based on results
      if (!this.searchQuery) {
        this.searchMessage = '';
      } else if (filtered.length > 0) {
        this.searchMessage = `${filtered.length} result(s) found`;
      }
      return filtered; // Return unfiltered houses by default
    },


    sortHouses(toSortList) {
      // Use a computed property to return the houses sorted by the selected criteria
      if (this.sortBy === 'price') {
        return toSortList.slice().sort((a, b) => a.price - b.price);
      } else if (this.sortBy === 'size') {
        return toSortList.slice().sort((a, b) => a.size - b.size);
      }
      return toSortList; // Return unsorted houses by default
    },


  }
};
</script>


<style scoped>
@import './assets/styles/houses.css';
</style>
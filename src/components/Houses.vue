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
                              <input
                              type="text"
                              placeholder="Search by City"
                              class="search-bar input-field"
                              v-model="searchQuery"
                              />
                              <img
                                  v-if="searchQuery"
                                  src="./assets/ic_clear@3x.png"
                                  alt="clear-icon"
                                  class="clear-class"
                                  @click="clearSearch"
                              />
                            
                      </div>
                          
                      <div class="sort-buttons">
                                  <button
                                      class="sort-btn-price"
                                      :class="{ active: sortBy === 'price' }"
                                      @click="setSortCriteria('price')"
                                  >
                                      Price
                                  </button>
                                  <button
                                      class="sort-btn-size"
                                      :class="{ active: sortBy === 'size' }"
                                       @click="setSortCriteria('size')"
                                  >
                                      Size
                                  </button>
                          </div>
                 </div>

                 <div class="search-result"  v-if="searchMessage">
                      <p class="listing-info">{{ searchMessage }}</p>
                 </div>
            
         </div>
  
          <div class="houses-container">
              <div v-if="filteredAndSortedHouses.length > 0">

                  <div class="house-card" v-for="house in filteredAndSortedHouses" :key="house.id" @click="goToHouseDetails(house.id)">
                      <img :src="house.image" alt="House image" class="houses-image"/>
                          <div class="houses-info">
                                  <div class="houses-details">
                                          <h2>{{ `${house.location.street} ${house.location.houseNumber}` }}</h2>
                                          <p class="listing-info">€ {{ house.price.toLocaleString() }}</p>
                                          <p class="houses-address"> {{ `${house.location.zip} ${house.location.city}` }} </p>
                                          <p class="houses-icons">
                                              <img class="icon" src="./assets/ic_bed@3x.png" alt="bed_icon">
                                              <span>{{ house.rooms.bedrooms }}  </span>
                                               <img class="icon" src="./assets/ic_bath@3x.png" alt="bath_icon">
                                               <span>{{ house.rooms.bathrooms }}  </span>
                                               <img class="icon" src="./assets/ic_size@3x.png" alt="size_icon"> 
                                               <span>{{ house.size }} m²</span>
                                          </p>
                                  </div>
                                  <div class="houses-actions" v-if="house.madeByMe">
                                          <img src="./assets/ic_edit@3x.png" alt="Edit" class="icon edit-icon"  @click.stop="editHouse(house.id)"/>
                                          <img src="./assets/ic_delete@3x.png" alt="Delete" class="icon delete-icon" @click.stop="showDeletePopup(house.id)"/>
                                  </div>
                          </div>
                          

                     

                  </div>
              </div>
              <div v-else class="noResults">
                  <div class="noResultsContent">
                  <img src="./assets/img_empty_houses@3x.png" alt="No results" class="no-results-image"/>
                  <p class="empty-message">No results found.<br>Please try another keyword.</p>
                </div>
              </div>
          </div>
  
        </section>
          
       
</div>
<delete-page v-if="showModal" @houseDeleted="fetchHouses" :houseId="selectedHouseId" @close="showModal = false"></delete-page>

</template>


<script>

import { useHouseStore } from '../services/store';
import housingApiService from '../services/HousingApiServices'
import DeletePage from '../components/Delete.vue'; 
export default {
  name: 'Houses',
  data() {
    return {
      showModal: false,
      searchQuery: '',
      searchMessage: '',
      sortBy: 'price',
      houses: [] 
    };
  },
  watch: {
       showModal(value) {
        console.log("watch "+value);
      if (value) {
        // When showModal is true, add the no-scroll class to prevent the background from scrolling
        document.body.classList.add('no-scroll');
      } else {
        // When showModal is false, remove the no-scroll class to allow scrolling again
        document.body.classList.remove('no-scroll');
      }
    },
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
      'delete-page': DeletePage
    },
  computed: {
    
    filteredAndSortedHouses() {
      console.log('inside filteredAndSortedHouses');

        let result = this.filterHouses(this.houses);
        result = this.sortHouses(result);
        return result;
    }
  },
  methods: {
    async fetchHouses() {
      console.log('inside fetchHouses');

      try {
        const response = await housingApiService.getAllHouses();
        console.log('data 1=> ', response);
        if (response.status !== 200) {
          throw new Error('Failed to delete ');
        }
        this.houses = response.data;
      } catch (error) {
        
        window.alert('Error fetching houses: ' + error.message + ", try after some time!!");
      }
    },
    createHouse() {
      const houseStore = useHouseStore();
      houseStore.clearListing();
      this.$router.push({ name: 'HouseForm' });
    },
    editHouse(houseId) {
      console.log('Editing house', houseId);

      console.log('Editing house', this.houses);
      const listing = this.houses.find(house => house.id === houseId);
      console.log('Editing house==', listing);

      const houseStore = useHouseStore();
      houseStore.setListing(listing);
      this.$router.push({ name: 'HouseForm' });
    },

    showDeletePopup(houseId) 
      {
        console.log('in delete in house page' + houseId);
        if (houseId)
         { // Check if houseId is not null or undefined
          this.selectedHouseId = houseId;
          this.showModal = true;
        }
         else 
         {
          console.error('houseId is null');
          // Handle the error case where houseId is null
        }
      },
      
    deleteHouse(houseId) {
      console.log('Deleting house', houseId);
      this.$router.push({ name: 'Delete', params: { id: houseId } });

    },
    setSortCriteria(criteria) {
        this.sortBy = this.sortBy === criteria ? '' : criteria;

    },
    clearSearch() {
      this.searchQuery = '';
      this.searchMessage = '';
      this.fetchHouses();
    },
    goToHouseDetails(houseId) {
      this.$router.push({ name: 'HouseDetails', params: { id: houseId } });
    },
    filterHouses(toFilterList) {
        if(!this.searchQuery) {
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
        } else {
          this.searchMessage = null;
        }
        return filtered;
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
    deleteListing(houseId) {
      // Call your API to delete the listing
      // If successful, close the modal
      try{
        console.log('hous to delete=', houseId);
      let response =  housingApiService.deleteHouse(houseId);
      
      } catch (error) {
        console.log("inside delte4");

        window.alert('Cant delete at the moment,because of error: ', error.message);
      }

      this.showModal = false;
    }
  }
};
</script>


<style scoped>
 @import './assets/styles/houses.css';
</style>
<template>
  <div class="houses-page-mobile">

    <section class="layout-mobile">

      <div class="top-bar-mobile">

        <div class="heading-mobile">
          <h1 class="heading-tag">Houses</h1>
          <button class="create-new-btn-mobile" @click.stop="createHouse()">
            <img src="./assets/ic_plus_grey@3x.png" alt="plus-icon">
          </button>
        </div>


        <div class="sorting-mobile">

          <div class="search-barInput-mobile">
            <img src="./assets/ic_search@3x.png" alt="search-icon" class="search-icon-mobile">
            <input type="text" placeholder="Search by City" class="search-bar-mobile input-field-mobile"
              v-model="searchQuery" />
            <img v-if="searchQuery" src="./assets/ic_clear@3x.png" alt="clear-icon" class="clear-class-mobile"
              @click="clearSearch" />

          </div>

          <div class="sort-buttons-mobile">
            <button class="sort-btn-price-mobile" :class="{ active: sortBy === 'price' }"
              @click="setSortCriteria('price')">
              Price
            </button>
            <button class="sort-btn-size-mobile" :class="{ active: sortBy === 'size' }"
              @click="setSortCriteria('size')">
              Size
            </button>
          </div>
        </div>

        <div class="search-result-mobile" v-if="searchMessage">
          <p class="listing-info-mobile">{{ searchMessage }}</p>
        </div>

      </div><!-- top-bar ends -->

      <div class="houses-container-mobile">
        <div v-if="filteredAndSortedHouses.length > 0">

          <div class="house-card-mobile" v-for="house in filteredAndSortedHouses" :key="house.id"
            @click="goToHouseDetails(house.id)">
            <img :src="house.image" alt="House image" class="houses-image-mobile" />
            <div class="houses-info-mobile">
              <div class="houses-details-mobile">
                <h2 class="headertag-second ">{{ `${house.location.street} ${house.location.houseNumber}` }}</h2>
                <p class="listing-info-mobile">€ {{ house.price.toLocaleString() }}</p>
                <p class="houses-address-mobile"> {{ `${house.location.zip} ${house.location.city}` }} </p>
                <p class="houses-icons-mobile">
                  <img class="icon-mobile" src="./assets/ic_bed@3x.png" alt="bed_icon">
                  <span class="icon-info-mobile">{{ house.rooms.bedrooms }} </span>
                  <img class="icon-mobile" src="./assets/ic_bath@3x.png" alt="bath_icon">
                  <span class="icon-info-mobile">{{ house.rooms.bathrooms }} </span>
                  <img class="icon-mobile" src="./assets/ic_size@3x.png" alt="size_icon">
                  <span class="icon-info-mobile">{{ house.size }} m²</span>
                </p>
              </div><!--  house-details ends -->
              <div class="houses-actions-mobile" v-if="house.madeByMe">
                <img src="./assets/ic_edit@3x.png" alt="Edit" class="icon edit-icon-mobile"
                  @click.stop="editHouse(house.id)" />
                <img src="./assets/ic_delete@3x.png" alt="Delete" class="icon delete-icon-mobile"
                  @click.stop="showDeletePopup(house.id)" />
              </div><!--  house-actions ends -->
            </div><!--  house-info ends -->



          </div><!--  house-card ends -->
        </div>
        <div v-else class="no-results-mobile">
          <div class="no-results-content-mobile">
            <img src="./assets/img_empty_houses@3x.png" alt="No results" class="no-results-image-mobile" />
            <p class="empty-message-mobile">No results found.<br>Please try another keyword.</p>
          </div>
        </div>
      </div><!--  house-container ends -->

    </section><!--  layout ends -->


  </div><!--  houses-page ends -->
  <delete-popup v-if="showDeleteModal" @houseDeleted="fetchHouses" :houseId="selectedHouseId"
    @close="showDeleteModal = false"></delete-popup>

</template>


<script>
import commonHouses from './utils/commonHouses';
import DeletePage from '../components/Delete.vue';
export default {
  name: 'Houses',
  ...commonHouses,

  components: {
    'delete-popup': DeletePage
  },

}

</script>


<style scoped>
@import './assets/styles/housesMobile.css';
@import './assets/styles/mobile.css';
</style>
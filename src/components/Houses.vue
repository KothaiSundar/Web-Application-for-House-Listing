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

      </div> <!-- top-bar ends -->

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
              </div><!--  house-details ends -->

              <div class="houses-actions" v-if="house.madeByMe">
                <img src="./assets/ic_edit@3x.png" alt="Edit" class="icon edit-icon"
                  @click.stop="editHouse(house.id)" />
                <img src="./assets/ic_delete@3x.png" alt="Delete" class="icon delete-icon"
                  @click.stop="showDeletePopup(house.id)" />
              </div><!--  house-actions ends -->
            </div><!--  house-info ends -->
          </div><!--  house-card ends -->
        </div>
        <div v-else class="no-results">
          <div class="no-results-content">
            <img src="./assets/img_empty_houses@3x.png" alt="No results" class="no-results-image" />
            <p class="empty-message">No results found.<br>Please try another keyword.</p>
          </div>
        </div>
      </div><!--  house-container ends -->
    </section><!--  layout ends -->
  </div> <!--  houses-page ends -->
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


<style>
@import './assets/styles/houses.css';
</style>

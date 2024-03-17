<template>
  <div class="house-detail-page" :class="{ 'no-scroll': showDeleteModal }">
    <section class="house-details-layout layout">
      <nav class="navigation-bar">
        <div class="navigation-content">
          <button @click="goBack" class="back-icon">
            <img src="./assets/ic_back_grey@3x.png" alt="back">
          </button>
          <div class="back-to-overview back-button">
            Back to overview
          </div>
        </div>
      </nav><!-- navigation bar ends -->

      <div class="house-detailed-layout">
        <div class="house-details">
          <div v-if="house" class="details-layout">
            <div class="house-image">
              <img :src="house.image" alt="House image" />
            </div>
            <div class="house-info">
              <div class="house-titlebar">
                <h1>{{ `${house.location.street} ${house.location.houseNumber}${house.location.houseNumberAddition &&
    house.location.houseNumberAddition !== 'undefined' ? ' ' + house.location.houseNumberAddition : ''}`
                  }}</h1>


                <span class="house-actions" v-if="house.madeByMe">
                  <img src="./assets/ic_edit@3x.png" alt="Edit" class="icon edit-icon"
                    @click.stop="editHouse(house.id)" />
                  <img src="./assets/ic_delete@3x.png" alt="Delete" class="icon delete-icon"
                    @click.stop="showDeletePopup(house.id)" />
                </span>
              </div><!-- house-titlebar ends -->
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
            </div><!-- house-info ends -->
          </div><!-- house-details ends -->

          <div v-else class="loading">
            Loading details...
          </div>
        </div>
        <div class="house-recommended">
          <h2>Recommended for you</h2>
        </div>

      </div><!-- house-detailed-layout ends -->

    </section><!-- house-detais-layout ends -->
    <delete-popup v-if="showDeleteModal" :houseId="selectedHouseId" @close="showDeleteModal = false"></delete-popup>

  </div><!-- house-detais-page ends -->
</template>

<script>
import DeletePopup from '../components/DeletePopup.vue';
import commonHouseDetails from './utils/commonHouseDetails';
export default {
  name: 'HouseDetails',
  ...commonHouseDetails,
  components: {
    'delete-popup': DeletePopup
  },
};
</script>

<style>
@import './assets/styles/houseDetails.css';
</style>

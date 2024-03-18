<template>
    <div class="house-detail-page">
      <section class="house-details-layout layout">
        <nav class="navigation-bar">
          <div class="navigation-content">
            <button @click="goBack" class="back-icon">
              <img src="../assets/images/ic_back_grey@3x.png" alt="back">
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
                  <house-action v-if="house.madeByMe" :house="house" />
  
                </div><!-- house-titlebar ends -->
                <p class="house-location">
                  <img class="icon" src="../assets/images/ic_location@3x.png" alt="location">
                  <span class="listing-info">{{ `${house.location.zip} ${house.location.city}` }}</span>
                </p>
                <ul class="house-area listing-info">
                  <li>
                    <img class="icon" src="../assets/images/ic_price@3x.png" alt="price_icon">
                    <span>{{ house.price.toLocaleString() }}</span>
                  </li>
                  <li>
                    <img class="icon" src="../assets/images/ic_size@3x.png" alt="size_icon">
                    <span>{{ house.size }} m²</span>
                  </li>
                  <li>
                    <img class="icon" src="../assets/images/ic_construction_date@3x.png" alt="construction_icon">
                    <span>Built in {{ house.constructionYear }}</span>
                  </li>
                </ul>
  
                <ul class="house-attributes">
                  <li>
                    <img class="icon" src="../assets/images/ic_bed@3x.png" alt="bed_icon">
                    <span>{{ house.rooms.bedrooms }}</span>
                  </li>
                  <li>
                    <img class="icon" src="../assets/images/ic_bath@3x.png" alt="bath_icon">
                    <span>{{ house.rooms.bathrooms }}</span>
                  </li>
                  <li>
                    <img class="icon" src="../assets/images/ic_garage@3x.png" alt="garage_icon">
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
  
    </div><!-- house-detais-page ends -->
  </template>
  
  <script>
  import DeletePopup from '../components/DeletePopup.vue';
  import EditDeleteActions from './EditDeleteActions.vue';
  import housingApiService from "../services/HousingApiServices";
  import InfoItem from './InfoItem.vue';
  
  export default {
    name: 'HouseDetails',
    components: {
      "house-action": EditDeleteActions,
      "info-item": InfoItem,
    },
    props: {
      id: {
        type: Number,
        required: true,
      },
    },
    data() {
      return {
        house: null, // store house details object
        loading: true, //store loading message
        error: null, //stoe error message
      };
    },
  
    created() {
      this.houseId = this.id;
      this.fetchHouseDetails();
    },
  
    methods: {
      // if back icon is clicked, directed to houses page
      goBack() {
        this.$router.push({ path: "/houses" });
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
    },
  };
  
  </script>
  
  <style>
  .house-detail-page {
    margin-top: 5rem;
    background-color: rgb(246, 246, 246);
    height: 100%;
    min-height: 100vh;
  
  }
  
  .house-details-layout {
    text-align: left;
  
  }
  
  .house-detailed-layout {
    display: flex;
    margin-top: 20px;
  }
  
  .navigation-bar {
    width: 100%;
    height: 6rem;
    padding-top: 1rem;
  }
  
  .navigation-content {
    padding: 0;
    margin: 0;
    height: 6rem;
  }
  
  .back-icon {
    background: none;
    border: none;
    cursor: pointer;
  }
  
  .back-icon img {
    height: 1.5rem;
  }
  
  .back-button {
    margin-left: 1rem;
  
  }
  
  .house-details {
    flex-basis: 70%;
    background-color: rgb(255, 255, 255);
    min-height: 90vh;
    margin-bottom: 50px;
    display: flex;
  }
  
  .house-image img {
    width: 100%;
    display: block;
    height: 550px;
    padding-right: 500px;
  }
  
  .house-info {
    padding-left: 2rem;
    padding-right: 2rem;
  }
  
  .house-titlebar {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .house-recommended {
    flex-basis: 40%;
    margin-left: 50px;
    height: 550px;
  }
  
  .house-location {
    display: flex;
    gap: 10px;
  }
  
  .house-area,
  .house-attributes {
    display: flex;
    padding: 0;
    margin: 0;
  }
  
  .house-area li,
  .house-attributes li {
    list-style: none;
    padding-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 10px;
    padding-right: 25px;
  }
  
  .house-description {
    text-align: justify;
  }
  
  @media screen and (min-height: 1000px) {
    .house-image img {
      width: 100%;
      display: block;
      height: 750px;
      padding-right: 100px;
    }
  
    .house-details {
      flex-basis: 70%;
      background-color: rgb(255, 255, 255);
      min-height: 70vh;
      margin-right: 50px;
      margin-bottom: 50px;
      display: flex;
    }
  
    .house-info {
      padding-top: 2rem;
      padding-left: 2rem;
      padding-right: 2rem;
    }
  
  }
  </style>
  
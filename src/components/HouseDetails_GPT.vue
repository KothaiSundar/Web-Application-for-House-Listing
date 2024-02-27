<template>
    <div class="house-details-page">
      <!-- <div class="back-to-overview" @click="goBack">← Back to overview</div> -->

      <div class="navigation-bar">
                      
                      <button @click="goBack" class="goBack">
                      <img src="./assets/ic_back_grey@3x.png" alt="back">
                      
                    </button>
                    <div class="BackToOverview">
                      Back to overview
                    </div>
            
              </div>


      <div class="house-details-container">
        <div class="house-image">
          <img :src="house.image" alt="House" />
        </div>
        <div class="house-details-content">
          <h1>{{ house.location.street }} {{ house.location.houseNumber }}</h1>
          <p class="house-location">{{ house.location.zip }} {{ house.location.city }}</p>
          <p class="house-price">€ {{ house.price.toLocaleString() }}</p>
          <p class="house-description">{{ house.description }}</p>
          <ul class="house-attributes">
            <li>{{ house.rooms.bedrooms }} Bedrooms</li>
            <li>{{ house.rooms.bathrooms }} Bathrooms</li>
            <li>{{ house.size }} m²</li>
            <li>Built in {{ house.constructionYear }}</li>
            <li>Garage: {{ house.hasGarage ? 'Yes' : 'No' }}</li>
          </ul>
          <!-- <div class="house-actions">
            <button @click="editListing(house.id)">Edit</button>
            <button @click="deleteListing(house.id)">Delete</button>
          </div> -->

          <div v-if="house.madeByMe" class="house-actions">
            <img src="./assets/ic_edit@3x.png" alt="Edit" @click="editHouse(house.id)" />
            <img src="./assets/ic_delete@3x.png" alt="Delete" @click="deleteHouse(house.id)" />
            </div>
        </div>
      </div>
      <div class="recommended-houses">
        <!-- Recommended houses go here -->
      </div>
    </div>
  </template>
  

  
  <style scoped>


.navigation-bar{
   
   width:100%;
  
   flex-basis: 30%;
   background-color:rgb(246,246,246);
   align-items: center;
   font-weight: bold;
   display: flex;
 
 }

 .navigation-bar .BackToOverview{

padding-left: 10px;
}

.goBack{
    border:none;
}

.goBack img{
    height: 20px;
   
  } 


/* === mine */
  .house-details-page {
    /* max-width: 800px;
    margin: auto;
    padding: 20px; */

    padding-top: 100px; 
    background-color:rgb(246,246,246);
    height: 100vh;
  }
  
  .back-to-overview {
    cursor: pointer;
    margin-bottom: 20px;
    color: #333;
    font-weight: bold;
  }
  
  .house-details-container {
    display: flex;
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    margin-bottom: 20px;


    /* //mine */
    /* display: flex;
  flex-direction: column; */

  /* max-width: max(800px, 80%); 
   width:100%; */
  }
  
  .house-image img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
  }
  
  .house-details-content {
    margin-left: 20px;
  }
  
  .house-details-content h1 {
    color: #ff3b30;
  }
  
  .house-location, .house-price, .house-description, .house-attributes {
    margin-top: 10px;
  }
  
  .house-attributes li {
    list-style-type: none;
  }
  
  .house-actions button {
    background: #ff3b30;
    color: white;
    border: none;
    padding: 10px 15px;
    margin-right: 10px;
    cursor: pointer;
    border-radius: 4px;
  }
  
  .recommended-houses {
  }
  </style>
  


  <script>
  export default {
    props: {
      houseId: Number,
    },
    data() {
      return {
        house: {}, // Should be fetched from an API
      };
    },
    created() {
      this.fetchHouseDetails();
    },
    methods: {
      goBack() {
        this.$router.push('-1'); // Assumes you have Vue Router set up
      },
      fetchHouseDetails() {
        // Implement API call to fetch house details by ID
        // This is a placeholder for the fetched data
        this.house = {
              "id": 2,
              "image": "https://api.intern.d-tt.nl/uploads/house1.jpg",
              "price": 123,
              "rooms": {
                  "bedrooms": 1,
                  "bathrooms": 1
              },
              "size": 500,
              "description": "oui",
              "location": {
                  "street": "street",
                  "houseNumber": 20,
                  "houseNumberAddition": null,
                  "city": "assas",
                  "zip": "asasdd"
              },
              "createdAt": "2020-05-07",
              "constructionYear": 2000,
              "hasGarage": false,
              "madeByMe": false
          };
      },
      editHouse(id) {
        // Navigate to edit listing page or show edit form
        console.log('Edit listing', id);
      },
      deleteHouse(id) {
        // Implement deletion logic
        console.log('Delete listing', id);
      },
    },
  };
  </script>
  
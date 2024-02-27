<template>
    <div class="house-detail-page">

      <div class="house-layout">

            <div class="navigation-bar">
                      
                      <button @click="goBack" class="goBack">
                      <img src="./assets/ic_back_grey@3x.png" alt="back">
                      
                    </button>
                    <div class="BackToOverview">
                      Back to overview
                    </div>
            
              </div>

             <div class="house-detailed-layout">
            
                    <div class="housedetails">

                            <div v-if="house" class="details-layout">

                                  <div class="house-image">
                                       <img :src="house.image" alt="House image" />
                                  </div>

                                  <div class="house-info">
                                        <h2>{{ `${house.location.street} ${house.location.houseNumber}` }}</h2>
                                        <p class="house-location">{{ `${house.location.zip} ${house.location.city}` }}</p>
                                        <p class="house-description">{{ house.description }}</p>
                                        <ul class="house-attributes">
                                          <li>{{ house.rooms.bedrooms }} Bedrooms</li>
                                          <li>{{ house.rooms.bathrooms }} Bathrooms</li>
                                          <li>{{ house.size }} m²</li>
                                          <li>Built in {{ house.constructionYear }}</li>
                                          <li>Garage: {{ house.hasGarage ? 'Yes' : 'No' }}</li>
                                        </ul>
                                      <div v-if="house.madeByMe" class="house-actions">
                                        <img src="./assets/ic_edit@3x.png" alt="Edit" @click="editHouse(house.id)" />
                                        <img src="./assets/ic_delete@3x.png" alt="Delete" @click="deleteHouse(house.id)" />
                                      </div>

                                  </div>

                            </div>

                          <div v-else class="loading">
                            Loading details...
                          </div>

                    </div>
                        <div class="house-recommended">

                        </div>
                  </div>
                   
              
      </div>
  </div>
  </template>
  
  <script>
  export default {
    props: {
      houseId: {
        type: Number,
        required: true,
      },
    },
    data() {
      return {
        house: null,
        loading: true,
        error: null,
      };
    },
    methods: {
      goBack() {
        this.$router.go(-1); 
      },
      fetchHouseDetails() {
        // Placeholder for API call to fetch house details
        // Simulating a fetch with a timeout
        setTimeout(() => {
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
          this.loading = false;
        }, 1000);
      },
      editHouse(id) {
        // Placeholder for edit logic
        alert(`Edit house with ID ${id}`);
      },
      deleteHouse(id) {
        // Placeholder for delete logic
        alert(`Delete house with ID ${id}`);
      },
    },
    created() {
      this.fetchHouseDetails();
    },
  };
  </script>
  
  <style scoped>
  /* Add your CSS styles here to match the design */
  .house-detail-page {
   
    padding-top: 100px; 
    background-color:rgb(246,246,246);
    height: 100vh;
   
  }

  .house-layout {
    margin: 0 auto;
   max-width: max(800px, 80%); 
    text-align: left;
   height: inherit;
    display: flex;
   flex-direction: column;
  


  
  }
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
  .house-detailed-layout{
    flex-basis: 70%;
  
    display: flex;
  }
 .housedetails{

  flex-basis: 70%;
  background-color: green;
  height: inherit;
 }
 .details-layout{
  background-color: white;
  /* height: inherit; */
 }
 .house-image img {
  width: 500px;
  display: block;
 height: 500px;
}
  .house-recommended{
   
flex-basis: 30%;
background-color: blue;
  }
  </style>

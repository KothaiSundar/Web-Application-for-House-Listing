<template>
    <div class="house-detail-page">

      <div class="house-layout">

            <div class="navigation-bar">
                      
                      <button @click="goBack" class="goBack">
                      <img src="./assets/ic_back_grey@3x.png" alt="back">
                      
                    </button>
                    <div class="back-to-overview">
                      <h2>Back to overview</h2>
                    </div>
            
              </div>

             <div class="house-detailed-layout">
            
                                    
                                <div class="housedetails">

                                            <div v-if="house" class="details-layout">

                                                  <div class="house-image">
                                                      <img :src="house.image" alt="House image" />
                                                  </div>

                                                  <div class="house-info">
                                                        <div class="house-titlebar">
                                                            <h1>{{ `${house.location.street} ${house.location.houseNumber}` }}</h1>
                                                            <span class="house-actions" v-if="house.madeByMe">
                                                                  <img src="./assets/ic_edit@3x.png" alt="Edit" class="icon edit-icon"  @click.stop="editHouse(house.id)"/>
                                                                  <img src="./assets/ic_delete@3x.png" alt="Delete" class="icon delete-icon" @click.stop="showModal = true"/>
                                                          </span>
                                                        </div>
                                                        <p class="house-location">
                                                         <img class="icon" src="./assets/ic_location@3x.png" alt="location">
                                                         <span>{{ `${house.location.zip} ${house.location.city}` }}</span> 
                                                        </p>
                                                        
                                                      
                                                        <!-- <p class="house-description">{{ house.description }}</p> -->
                                                        <ul class="house-area">
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

                                                        <p class="house-description">{{house.description}}</p>


                                                  </div><!-- end house info -->

                                            </div> <!-- end house detail -->

                                          <div v-else class="loading">
                                            Loading details...
                                          </div>

                                  </div>
                                        <div class="house-recommended">
                                                  <h2>Recommended for you</h2>
                                        </div>

                  </div>  <!-- end house detailed layout -->
                   
              
      </div>  <!-- end house layout -->

  </div>
  <!-- end house detail page -->

  </template>

  
<style scoped>
/* Add your CSS styles here to match the design */
/* @import './assets/styles/styles.css';*/ 
 /* @import './assets/styles/houseDetails.css';  */
.house-detail-page {
 
 margin-top:80px; 
 background-color:rgb(246,246,246);
 /* height: 100vh; */



}

.house-layout {
 margin: 0 auto;
max-width: max(800px, 80%); 
 text-align: left;
height: inherit;


}

.house-detailed-layout{
 display: flex;
  margin-top: 20px;
  
}

.navigation-bar{

width:100%;


align-items: center;
font-weight: bold;
display: flex; 
height: 80px;

} 

.goBack {
 background: none;
 border: none;
 cursor: pointer;
}
.back-to-overview {
 margin-left: 10px; 
 font-size: 16px; 
}


.goBack img{
 height: 20px;

} 
h2{
 font-family: 'Montserrat';
 font-weight:bold;
 font-size:22px;
}
.housedetails{
 
flex-basis: 70%;
background-color:white;
height: inherit;
margin-right: 50px;
margin-bottom: 50px;
}

.house-image img {
width: 100%;
display: block;
height: 550px;
padding-right: 100px;
}
.house-info{
  padding-left: 30px;
  padding-right: 30px;
}
.house-titlebar{
 display: flex;
 justify-content: space-between;
align-items: center;

}

.house-actions img{

 padding-right: 20px;
}
h1{
 font-family: 'Montserrat';
 font-weight: bold;
 font-size: 32px;
}
.house-recommended{

flex-basis: 30%;
/* background-color: blue; */

}

.house-location{
 display: flex;

 gap:10px;
}
.house-location span{
 font-family: 'Montserrat';
 font-weight: 600;
}
/* If .house-area and .house-attributes are not ul, add this */
.house-area, .house-attributes {
 display: flex;
 padding: 0; /* Removes default padding */
 margin: 0; /* Removes default margin */
 
}

/* Reset list styles and add flex display */
.house-area li, .house-attributes li {
 list-style: none; /* Removes bullet points */
 padding-bottom: 20px;
 display: flex;
 align-items: center;
 gap:  10px; 
 padding-right:25px;
 font-family: 'Montserrat';
 font-weight:600;


}

/* Style icons with consistent size and margins */
.icon {
 flex-shrink: 0; 
 width: 20px; /* Adjust the width as needed */
 height: 20px;
/* margin-right: 10px;  */
/* Adjust the space to the right of the icon */
}




.house-description {
 text-align: justify;
 line-height: 2;
 font-family: 'Open Sans'; 
 font-size: 18px;


}



</style>

  
  <script>

import housingApiService from '../services/HousingApiServices'

  export default {
    props: {
      id: {
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
      async fetchHouseDetails() {
        // Placeholder for API call to fetch house details
        // Simulating a fetch with a timeout
        let houseResponse = await housingApiService.getHouseById(this.houseId);
           console.log("jouses list",houseResponse);
         this.house=houseResponse.data[0];
         console.log("this house",this.house);
               // console.log('Detail log=>', this.house)
        // setTimeout(() => {
        //   this.house = {
        //       "id": 2,
        //       "image": "https://api.intern.d-tt.nl/uploads/house1.jpg",
        //       "price": 123,
        //       "rooms": {
        //           "bedrooms": 1,
        //           "bathrooms": 1
        //       },
        //       "size": 500,
        //       "description": "oui",
        //       "location": {
        //           "street": "street",
        //           "houseNumber": 20,
        //           "houseNumberAddition": null,
        //           "city": "assas",
        //           "zip": "asasdd"
        //       },
        //       "createdAt": "2020-05-07",
        //       "constructionYear": 2000,
        //       "hasGarage": false,
        //       "madeByMe": true
        //   };
        //   this.loading = false;
        // }, 1000);
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
      // Access the id parameter from the route
      this.houseId = this.$route.params.id;
      this.fetchHouseDetails(); // Call the method to fetch details
    },
    mounted() {
      // this.fetchHouseDetails();
    },
  };
  </script>
  
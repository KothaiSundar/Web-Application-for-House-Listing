<template >
   <div class="house-detail-page" :class="{'no-scroll': showModal}">


      <div class="house-details-layout">

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
                                                                  <img src="./assets/ic_delete@3x.png" alt="Delete" class="icon delete-icon" @click.stop="showDeletePopup(house.id)"/>
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
  <delete-page v-if="showModal" :houseId="selectedHouseId" @close="showModal = false"></delete-page>

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
      'delete-page': DeletePage
    },
    
    data() {
      return {
        showModal: false,
        selectedHouseId: "",
        house: null,
        loading: true,
        error: null,
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
    }
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
      
   
      editHouse(houseId) {
      
        // alert(`Edit house with ID ${houseId}`);
       
           console.log('Editing house', this.house);
        // const listing = this.house.find(house => house.id === houseId);
        const houseStore = useHouseStore();
        houseStore.setListing(this.house);
        this.$router.push({ name: 'HouseForm' });
      
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
  <style scoped>
  /* Add your CSS styles here to match the design */
  /* @import './assets/styles/styles.css';*/ 
  /* @import './assets/styles/houseDetails.css' */

  .house-detail-page {
   
   margin-top:5rem; 
   background-color:rgb(246,246,246);
  }
  
  .house-details-layout {
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
  height: 6rem;
  padding-top: 1rem;
  
  
  } 
  .navigation-content{
  
   
  padding:0;
  margin: 0;
    height: 6rem;
  
  }
  .back-icon {
   background: none;
   border: none;
   cursor: pointer;
  }
  
  
  
  .back-icon img{
    height: 1.5rem;
  
  } 
  .back-button{
    margin-left: 1rem;
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
  
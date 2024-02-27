<template>
    <div class="houses-page">
        
      <div class="houses-layout">

             <div class="top-bar">

                <div class="top-bar1">
                    <h1>Houses</h1>
                   <button class="create-new-btn">+ CREATE NEW</button>
                </div>
                

                    <div class="top-bar2">

                        <div class="search-barInput">
                            <img src="./assets/ic_search@3x.png" alt="search-icon" class="search-icon">
                           <input type="text" placeholder="Search for a house" class="search-bar"/>
                       </div>
                            <div class="sort-buttons">
                                    <button class="sort-btn">Price</button>
                                    <button class="sort-btn">Size</button>
                            </div>
                   </div>
              
           </div>
    
            <div class="houses-container">

                    <div class="house-card" v-for="house in houses" :key="house.id">
                        <img :src="house.image" alt="House image" class="house-image"/>
                            <div class="house-info">
                                    <div class="house-details">
                                            <h2>{{ `${house.location.street} ${house.location.houseNumber}` }}</h2>
                                            <p class="house-price">€ {{ house.price.toLocaleString() }}</p>
                                            <p class="house-address"> {{ `${house.location.zip} ${house.location.city}` }} </p>
                                            <p class="house-icon">
                                                <img class="icon" src="./assets/ic_bed@3x.png" alt="bed_icon">{{ house.rooms.bedrooms }}  
                                                 <img class="icon" src="./assets/ic_bath@3x.png" alt="bath_icon">{{ house.rooms.bathrooms }}  
                                                 <img class="icon" src="./assets/ic_size@3x.png" alt="size_icon"> {{ house.size }} m²
                                            </p>
                                    </div>
                                    <div class="house-actions" v-if="house.madeByMe">
                                            <img src="./assets/ic_edit@3x.png" alt="Edit" class="icon edit-icon" />
                                            <img src="./assets/ic_delete@3x.png" alt="Delete" class="icon delete-icon" />
                                    </div>
                            </div>

                    </div>

            </div>

    </div>
</div>

  </template>
  

  
  
<style scoped>
.houses-page {
  /* width: 100%; */
  /* max-width: max(800px, 80%); */
  padding-top: 100px; 
  background-color:rgb(246,246,246);
  height: 100vh;
}

.houses-layout {
    margin: 0 auto;
   max-width: max(800px, 80%); 
   width:100%;
   
}
.top-bar {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  flex-direction: column;
}
.top-bar1{
    display: flex;  
    justify-content: space-between;
}
.top-bar2{
    display: flex;
    margin-top: 20px;
    justify-content: space-between;
}
.create-new-btn{
    height: 50px;
    margin-top: 30px;
    width:200px;
    border: 5px;
    border-radius: 10px;
    font-size: 18px;
  
}
.search-barInput{
    height: 50px;
    background-color: rgb(232,232,232);
    width: 500px;
    border-radius: 10px;
   
    display: flex;
   align-items: center;
   padding-left: 20px;
  

}
.search-icon{
    height: 20px;
}
.search-bar {
  flex-grow: 1;
 margin-left: 20px;
 background-color: inherit;
border: none;
border-radius: 10px;

}

.create-new-btn {
  padding: 10px 20px;
  background-color: #ff3b30;
  color: white;
  border: none;
  cursor: pointer;
}

.sort-buttons .sort-btn {
  padding: 10px 20px;
  margin-left: 10px;
  background-color: #f0f0f0;
  border: none;
  cursor: pointer;
}

.houses-container {
  display: flex;
  flex-direction: column;

}

.house-card {
  display: flex;
  align-items: flex-start; /* Align items to the top */
  padding: 20px; 
  /* Padding inside each house card */
  margin-bottom: 20px; /* Space between listings */
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  background: #fff; /* White background for each card */
  /* height: 150px; */
}

.house-image {
  width: 150px;
  height: 150px;
  object-fit: cover;
  margin-right: 20px;
  border-radius: 8px;
}

.house-info {
    display: flex;
    justify-content: space-between;
    align-items: start;
    width: 100%;
 
}

.house-details {
    display: flex;
  flex-direction: column;
  text-align: left;
line-height: 7px;
  /* justify-content: space-between; */
  /* padding-right: 20px;  */
  /* Space between details and actions */
  /* margin-right: auto;  */
  /* Push the actions to the right */
  
}
.house-icon .icon{
    margin-left: 5px;
}
.house-price {
    font-weight: bold;
  color: #ff3b30;
  margin: 5px 0;
   /* Adjust space around price */
}

.house-actions {
    display: flex;
  flex-direction: column;
  align-items: flex-end;
}


.icon {
  width: 20px; /* Adjust the width as needed */
  height: 20px; /* Adjust the height as needed */
  cursor: pointer;
  margin-bottom: 5px; /* Space between the icons */
}



/* Reduce the size of the edit and delete buttons/containers *//* Adjust the layout of the actions */
.house-actions {
    flex-direction: row; /* Set direction to row for side-by-side icons */
  justify-content: flex-end; /* Align icons to the right */
  align-items: center; /* Vertically align icons */
}

/* Adjust the button style if they are actual buttons */
.edit-icon, .delete-icon {
  border: none;
  background: none;
  padding: 5px;
  width: 20px;
  height: 20px;
}

</style>

<script>
export default {
  name: 'Houses',
  data() {
    return {
      houses: [] // initial empty array for houses
    };
  },
  mounted() {
    // Fetch the house data when the component mounts
    this.fetchHouses();
  },
  methods: {
    async fetchHouses() {
      try {
      //   const response = await fetch('https://api.intern.d-tt.nl/uploads/houses');
      //   if (!response.ok) throw new Error('Failed to fetch');
      //   this.houses = await response.json();
      this.houses = [
  {
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
  },
  {
      "id": 3,
      "image": "https://api.intern.d-tt.nl/uploads/house2.jpg",
      "price": 969000,
      "rooms": {
          "bedrooms": 3,
          "bathrooms": 1
      },
      "size": 153,
      "description": "Dit bijzondere appartement is gelegen op de bel-etage en in het souterrain van een Rijks monumentaal grachten pand ter hoogte van de 'Negen-straatje'. Deze woning kenmerkt zich door de vele originele details die behouden zijn. Bij de renovatie is met de grootste aandacht zorg gedragen voor het conserveren van de oorspronkelijke stijlelementen. Met name in de monumentale stijlkamer aan de voorzijde van de woning. Terwijl de keuken dan weer modern en state of the art is.",
      "location": {
          "street": "Oud Heinstraat",
          "houseNumber": 23,
          "houseNumberAddition": "",
          "city": "Amsterdam",
          "zip": "1016 BV"
      },
      "createdAt": "2020-05-07",
      "constructionYear": 2020,
      "hasGarage": false,
      "madeByMe": true
  }];
      } catch (error) {
        console.error('Error fetching houses:', error);
      }
    },
    // Placeholder functions for edit and delete actions
    editHouse(houseId) {
      console.log('Editing house', houseId);
      // Implement the edit functionality
    },
    deleteHouse(houseId) {
      console.log('Deleting house', houseId);
      // Implement the delete functionality
    }
  }
};
</script>
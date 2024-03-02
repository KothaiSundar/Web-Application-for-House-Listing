<template>
    <div class="houses-page">
        
      <div class="houses-layout">

             <div class="top-bar">

                <div class="top-bar1">
                    <h1>Houses</h1>
                   <button class="create-new-btn" @click.stop="createHouse()">+ CREATE NEW</button>
                </div>
                

                    <div class="top-bar2">

                     

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
                            <p>{{ searchMessage }}</p>


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
              
           </div>
    
            <div class="houses-container">
                <div v-if="filteredAndSortedHouses.length > 0">

                    <div class="house-card" v-for="house in filteredAndSortedHouses" :key="house.id" @click="goToHouseDetails(house.id)">
                        <img :src="house.image" alt="House image" class="house-image"/>
                            <div class="house-info">
                                    <div class="house-details">
                                            <h2>{{ `${house.location.street} ${house.location.houseNumber}` }}</h2>
                                            <p class="listing-info">€ {{ house.price.toLocaleString() }}</p>
                                            <p class="house-address"> {{ `${house.location.zip} ${house.location.city}` }} </p>
                                            <p class="house-icons">
                                                <img class="icon" src="./assets/ic_bed@3x.png" alt="bed_icon">
                                                <span>{{ house.rooms.bedrooms }}  </span>
                                                 <img class="icon" src="./assets/ic_bath@3x.png" alt="bath_icon">
                                                 <span>{{ house.rooms.bathrooms }}  </span>
                                                 <img class="icon" src="./assets/ic_size@3x.png" alt="size_icon"> 
                                                 <span>{{ house.size }} m²</span>
                                            </p>
                                    </div>
                                    <div class="house-actions" v-if="house.madeByMe">
                                            <img src="./assets/ic_edit@3x.png" alt="Edit" class="icon edit-icon"  @click.stop="editHouse(house.id)"/>
                                            <img src="./assets/ic_delete@3x.png" alt="Delete" class="icon delete-icon" @click.stop="deleteHouse(house.id)"/>
                                    </div>
                            </div>
                            

                       

                    </div>
                </div>
                <div v-else class="no-results">
                    <img src="./assets/img_empty_houses@3x.png" alt="No results" class="no-results-image"/>
                    <p>No results found.<br>Please try another keyword.</p>
                </div>
            </div>
    
    </div>
</div>

  </template>
  

  <script>

  import { useHouseStore } from '../services/store';
  import housingApiService from '../services/HousingApiServices'
  
  export default {
    name: 'Houses',
    data() {
      return {
        showModal: false,
        searchQuery: '',
        searchMessage: '',
        sortBy: 'price',
        houses: [] // initial empty array for houses
      };
    },
    created() {
      // Fetch the house data when the component mounts
      this.fetchHouses();
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
          if (response.status != 200) throw new Error('Failed to fetch');
          this.houses = response.data;
        } catch (error) {
          console.error('Error fetching houses:', error);
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
          this.searchMessage = 'No results found';
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


.houses-page {

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
flex-direction: column;
margin-bottom: 20px;
align-items: center; 
}

.top-bar1, .top-bar2 {
display: flex;
justify-content: space-between;
width: 100%;
align-items: center;
padding: 15px;
}


.create-new-btn {
height: 50px;
  width:200px;
  border: 5px;
  border-radius: 10px;
  padding: 10px 20px;
background-color: #ff3b30;
color: white;
border: none;
cursor: pointer;
margin-top: 0;

}


.search-barInput{
  height: 50px;
  background-color: rgba(232,232,232);
  width: 500px;
  border-radius: 10px;
 
  display: flex;
 align-items: center;
 padding-left: 20px;


} 

.search-icon{
  height: 20px;

}
.search-bar::placeholder{
color:rgb(195,195,195);
}
.search-bar {
flex-grow: 1;
margin-left: 10px; /* Spacing between icon and input field */
background-color: transparent; 


border: none;
outline: none; /* Remove outline to match design */
}

.sort-buttons {
display: flex;
align-items: center;
width: 300px;
height: 50px;


}
.sort-btn-price{
flex-basis: 50%;
height: inherit;
border-radius: 10px 0px 0px 10px;
background-color: rgb(195,195,195);
border: none;

}
button{

color: white;

}
.sort-btn-size{
flex-basis: 50%;
height: inherit;
border-radius: 0px 10px 10px 0px;
border: none;
background-color: rgb(195,195,195);

}

.sort-btn-price.active, .sort-btn-size.active {

background-color: rgb(235,84,64); 

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
line-height: 1px;



}



.house-actions {
  display: flex;
flex-direction: column;
align-items: flex-end;
}

.house-address{
font-size: 18px;
font-family: 'Open sans';
color:rgb(195,195,195)
}
.icon {
width: 20px; 
height: 20px; 
cursor: pointer;

}
.house-icons{
display: flex;
align-items: center;

font-family: 'Open sans';
gap:15px;
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

.clear-class {
cursor: pointer;

width: 20px;
height: 20px;
}

.clear-class[style*="display: none;"] {
display: none;
} 


</style>
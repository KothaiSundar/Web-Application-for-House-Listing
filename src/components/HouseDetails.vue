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
                 <div class="edit-icons-mobile">
                    <button @click="goBack" class="back-icon-mobile">
                      <img src="../assets/images/ic_back_grey@3x.png" alt="back" class="back-icon-image">
                    </button>
                    <div class="edit-actions-mobile">
                      <span class="edit"><img src="./assets/ic_edit_white@3x.png" alt="Edit"
                        @click.stop="handleEdit" /></span>
                        <span class="delete"><img src="./assets/ic_delete_white@3x.png" alt="Delete" 
                        @click.stop="showDeletePopup(house.id)" />  
                      <delete-popup v-if="showDeleteModal" :houseId="selectedHouseId" @houseDeleted="$emit('onAfterDelete')"
                        @close="showDeleteModal = false"></delete-popup></span>
                    </div>
              </div> <!-- edit-icons-mobile ends -->
          </div><!-- house-image ends -->
            <div class="house-info">
              <div class="house-titlebar">
                <h1>{{ `${house.location.street} ${house.location.houseNumber}${house.location.houseNumberAddition &&
            house.location.houseNumberAddition !== 'undefined' ? ' ' + house.location.houseNumberAddition : ''}`
                  }}</h1>
                <house-action class="edit-actions-desktop" v-if="house.madeByMe" :house="house" />

              </div><!-- house-titlebar ends -->
              <p class="house-location">
                <img class="icon" src="../assets/images/ic_location@3x.png" alt="location">
                <span class="listing-info">{{ `${house.location.zip} ${house.location.city}` }}</span>
              </p>

              <ul class="house-area listing-info">
                <li v-for="(attribute, index) in propertyInfoList" :key="index">
                  <info-item :icon-src="attribute.iconSrc" :icon-alt="attribute.iconAlt" :text="attribute.text" />
                </li>
              </ul>

              <ul class="house-attributes">
                <li v-for="(item, index) in attributeItems" :key="index">
                  <info-item :icon-src="item.iconSrc" :icon-alt="item.iconAlt" :text="item.text" />
                </li>
              </ul>

              <p class="house-description body-text">{{ house.description }}</p>
            </div><!-- house-info ends -->
          </div><!-- house-details ends -->

          <div v-else class="loading">
            Loading details...
          </div>
        </div>

        <recommended-houses v-if="house" class="house-recommended" :house="house" />

      </div><!-- house-detailed-layout ends -->

    </section><!-- house-detais-layout ends -->

  </div><!-- house-detais-page ends -->
</template>

<script>
import EditDeleteActions from "./EditDeleteActions.vue";
import housingApiService from "../services/HousingApiServices";
import InfoItem from "./InfoItem.vue";
import RecommendedHouses from "./RecommendedHouses.vue";

export default {
  name: 'HouseDetails',
  components: {
    "house-action": EditDeleteActions,
    "info-item": InfoItem,
    "recommended-houses": RecommendedHouses,
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
  computed: {
    propertyInfoList() {
      return [
        {
          iconSrc: "ic_price@3x.png",
          iconAlt: "price icon",
          text: `${this.house.price.toLocaleString()}`
        },
        {
          iconSrc: "ic_size@3x.png",
          iconAlt: "size icon",
          text: `${this.house.size} m²`
        },
        {
          iconSrc: "ic_construction_date@3x.png",
          iconAlt: "construction icon",
          text: `Built in ${this.house.constructionYear}`
        }
      ];
    },
    attributeItems() {
      return [
        {
          iconSrc: "ic_bed@3x.png",
          iconAlt: "bed icon",
          text: `${this.house.rooms.bedrooms}`
        },
        {
          iconSrc: "ic_bath@3x.png",
          iconAlt: "bath icon",
          text: `${this.house.rooms.bathrooms}`
        },
        {
          iconSrc: "ic_garage@3x.png",
          iconAlt: "garage icon",
          text: this.house.hasGarage ? 'Yes' : 'No'
        }
      ];
    }
  },
  watch: {
    // Watch for changes in the route
    '$route.params.id'(newId) {
      this.fetchHouseDetails(newId);
    }
  },
  created() {
    this.houseId = this.id;
    this.fetchHouseDetails(this.houseId);
  },

  methods: {
    // if back icon is clicked, directed to houses page
    goBack() {
      this.$router.push({ path: "/houses" });
    },

    // this method fetch house details through API
    async fetchHouseDetails(houseId) {
      try {
        let houseResponse = await housingApiService.getHouseById(houseId);
        if (houseResponse.status !== 200) {
          window.alert(
            `Unable to fetch House details for HouseId: ${houseId} `
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

<style scoped>
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

.edit-actions-mobile,
.back-icon-mobile {
  display: none;
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

@media screen and (max-width: 768px) {
  .house-detail-page {
    max-width: 100%;
    height: 100%;
    padding: 0;
    margin-top: 0rem;
    margin-bottom: 5rem;
    height: 100%;
    min-height: 100vh;
    /* background-color: rgb(42, 165, 44); */
  }

  .layout {
    max-width: 90%;
    margin: 0 auto;
    margin-top: 0rem;
    /* background-color: blueviolet; */

  }

  .house-detailed-layout {
    background-color: #d21e33;
    margin-top: 0;
    display: flex;
    flex-direction: column;
  }

  .house-details {
    background-color: blueviolet;
    flex-basis: 70%;
    width: 100%;
  }

  .details-layout {
    width: 100%;
  }

  .navigation-bar,
  .edit-actions-desktop {
    display: none;

  }
  .edit-actions-mobile,
.back-icon-mobile {
  display: block;
}
  .house-image {
    position: relative;
    width: 100%;

  }

  .house-image img {
    width: 100%;
    display: block;
    height: 250px;
  }

  .edit-icons-mobile {
    position: absolute;
    background-color: chocolate;
    height: 50px;
    top: 10px;
    width: 100%;
   
  }

  .back-icon-mobile {
       width: 50%;
    background-color: blue;

  }

  .back-icon-mobile img {
    position: absolute;
    height: 20px;
    left: 20px;
    width: 20px;
  }
.edit-actions-mobile{
    display: flex;
    height: inherit;
    width: 50%;
 
  background-color: #00ffee;
  }
 .edit-actions-mobile img{
  width: 20px;
    height: 20px;
    gap:0px;

 }
 .edit{
  width: 20%;
  background-color: #d21e33;
  height: inherit;
  margin-left: 60%;
 }
 .delete{
  width: 20%;
  background-color: #1ed233;
 }

 

  .edit-icon,
  .delete-icon {
    display: none;
  }
 
  .house-info {
    /* background-color: blue; */
    padding-right: none;
    padding-left: 2rem;
    border-radius: 20px 20px 0px 0px;
  }

  .house-titlebar {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .house-recommended {
    padding-left: 0px;
    flex-basis: 30%;
    background-color: chocolate;
     }

  .house-location {
    display: flex;
    gap: 10px;
    margin-top: 0px;
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

}

@media screen and (max-width: 768px) {}
</style>

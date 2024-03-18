<template>
    <div v-if="recommendedHouses.length">
        <h2 class="recommended-heading">Recommended for you</h2>
        <div>
            <house-card v-for="house in recommendedHouses" :key="house.id" :house="house"
                customClass="recommended-houses-card" :enableHouseAction="false" />
        </div>
    </div>
</template>

<script>
import HouseCard from './HouseCard.vue';
import housingApiService from "../services/HousingApiServices.js"; // Adjust the path as needed

export default {
    name: 'RecommendedHouses',
    components: {
        HouseCard
    },
    props: {
        house: {
            type: Object,
            default: () => ({})
        }
    },
    watch: {
        house(newHouse, oldHouse) {
            if (newHouse && oldHouse && newHouse.id !== oldHouse.id) {
                this.fetchRecommendedHouses();
            }
        }
    },
    data() {
        return {
            recommendedHouses: []
        };
    },
    mounted() {
        this.fetchRecommendedHouses();
    },
    methods: {
        async fetchRecommendedHouses() {
            try {

                // Implement the logic to fetch recommended houses based on the current house
                // For example, you can use a service method and limit the result to 3
                this.recommendedHouses = await housingApiService.getHouseRecommendations(this.house.id);
            } catch (error) {
                console.error('Error fetching recommended houses:', error);
            }
        }
    }
};
</script>

<style>
.recommended-heading {
    margin-top: 0;
    padding-bottom: 10px;
}

.recommended-houses-card .house-card-details {
    margin-bottom: 20px;
    width: 400px;

}

.recommended-houses-card .houses-image {
    width: 100px;
    height: 100px;
    margin-right: 10px;

}

.recommended-houses-card .houses-details {
    line-height: 1px;
    width: 100%;
}

.recommended-houses-card .listing-info,
.recommended-house-location,
.houses-address {
    font-size: 14px;
}

.recommended-houses-card .icon {
    width: 15px;
    height: 15px;

}

.recommended-houses-card .houses-icons {
    gap: 8px;
    font-size: 14px;
}

@media screen and (max-width: 1200px) {

    .recommended-houses-card .houses-details,
    .house-card-details {

        position: sticky;
    }
}
</style>
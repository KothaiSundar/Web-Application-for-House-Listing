<script>
import DeletePage from '../components/DeletePopup.vue';
import HouseCard from '../components/HouseCard.vue';
import housingApiService from "../services/HousingApiServices";
import HousesTopBar from '@/components/HousesTopBar.vue';

export default {
    name: 'Houses',
    components: {
        'delete-popup': DeletePage,
        'house-card': HouseCard,
        'top-bar': HousesTopBar,
    },
    data() {
        return {

            searchQuery: "", // to store search bar user query
            searchMessage: "", // result of number of houses
            sortBy: "price", // by default to view sorted houses by price
            sortByAsc: true,
            houses: [], // initially setting house details as empty array, loaded on mounted action
        };
    },
    mounted() {
        // Fetch the house data when the component created
        this.fetchHouses();
    },

    computed: {
        filteredAndSortedHouses() {
            // house containder depends on this method to display result filtered on sorting
            let result = this.filterHouses(this.houses);
            result = this.sortHouses(result);
            return result;
        },
    },

    methods: {
        async fetchHouses() {
            try {
                const response = await housingApiService.getAllHouses();

                if (response.status !== 200) {
                    throw new Error("Failed to get houses ");
                }
                this.houses = response.data;
            } catch (error) {
                window.alert(
                    "Error fetching houses: " + error.message + ", try after some time!!"
                );
            }
        },

        updateSearchQuery(newQuery) {

            this.searchQuery = newQuery;
            if (!newQuery) {
                this.searchMessage = "";
            }
        },
        setSortCriteria(criteria) {
            if (this.sortBy === criteria) {
                // same sort criteria , just change sort order
                this.sortByAsc = !this.sortByAsc;
            } else {
                this.sortBy = criteria;
                this.sortByAsc = true; //set default to true as criteria is change. i.e from price to size
            }
        },

        // if clear icon clicked this method is called and clearing query and message
        clearSearch() {
            this.searchQuery = "";
            this.searchMessage = "";
            this.fetchHouses();
        },


        filterHouses(toFilterList) {
            if (!this.searchQuery) {
                return toFilterList;
            }

            const filtered = toFilterList.filter((house) =>
                house.location.city
                    .toLowerCase()
                    .includes(this.searchQuery.toLowerCase())
            );
            // Update search message based on results
            if (!this.searchQuery) {
                this.searchMessage = "";
            } else if (filtered.length > 0) {
                this.searchMessage = `${filtered.length} result(s) found`;
            } else {
                this.searchMessage = "";
            }
            return filtered; // Return unfiltered houses by default
        },

        sortHouses(toSortList) {
            // Use a computed property to return the houses sorted by the selected criteria
            if (this.sortBy === "price") {
                return toSortList.slice().sort((a, b) => {
                    return this.sortByAsc ? a.price - b.price : b.price - a.price;
                });
            } else if (this.sortBy === "size") {
                return toSortList.slice().sort((a, b) => {
                    return this.sortByAsc ? a.size - b.size : b.size - a.size;
                });
            }
            return toSortList; // Return unsorted houses by default
        },
    },
}
</script>

<template>
    <div class="houses-page">
        <section class="layout">

            <top-bar :sortBy="sortBy" :searchQuery="searchQuery" :searchMessage="searchMessage"
                @setSortCriteria="setSortCriteria" @updateSearchQuery="updateSearchQuery"
                @clearSearch="clearSearch"></top-bar>

            <div class="houses-container">
                <div v-if="filteredAndSortedHouses.length > 0">

                    <house-card v-for="house in filteredAndSortedHouses" :key="house.id" :house="house"
                        @onAfterDelete="fetchHouses"></house-card>
                </div>
                <div v-else class="no-results">
                    <div class="no-results-content">
                        <img src="../assets/images/img_empty_houses@3x.png" alt="No results" class="no-results-image" />
                        <p class="empty-message">No results found.<br>Please try another keyword.</p>
                    </div>
                </div>
            </div><!--  house-container ends -->
        </section><!--  layout ends -->
    </div> <!--  houses-page ends -->

</template>



<style scoped>
.houses-page {
    margin-top: 5rem;
    background-color: rgb(246, 246, 246);
    height: 100%;
    min-height: 100vh;

}

.houses-container {
    display: flex;
    flex-direction: column;
}

.clear-class {
    cursor: pointer;
    margin-right: 20px;
    width: 25px;
    height: 25px;
}

.clear-class[style*="display: none;"] {
    display: none;
}

.no-results {
    position: relative;
    display: flex;
    height: 100vh;
    align-items: center;
    justify-content: center;
}

.no-results-content {
    position: absolute;
    width: 500px;
    height: 50%;
    top: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

.no-results img {
    width: 400px;
    height: 200px;
}

.no-results-content p {
    margin-top: 40px;
}

@media (min-height: 600px) and (max-height: 750px) {
    .no-results-content {
        height: 200px;
        top: 60px;
    }

    .no-results img {
        height: 100px;
    }

}

@media (min-height: 500px) and (max-height: 600px) {
    .no-results-content {
        height: 200px;
    }

    .no-results img {
        height: 100px;
    }
}

@media (min-height: 300px) and (max-height: 500px) {
    .no-results-content {
        height: 100px;
    }

    .no-results img {
        height: 50px;
    }
}

@media screen and (max-width: 768px) {
    .houses-page {
        margin-top: 0;
        padding: 0;
        max-width: 100%;
        margin-bottom: 5rem;
    }

    .layout {
        max-width: 100%;
        margin: 0 auto;
    }
}

@media (min-width:301px) and (max-width: 430px) {

    .no-results-content {
        width: 250px;
    }

    .no-results img {
        width: 200px;
    }

}

@media (min-width:200px) and (max-width: 300px) {

    .no-results-content {
        width: 150px;
    }

    .no-results img {
        width: 100px;
    }

}

@media screen and (max-width: 280px) {
    .houses-page {
        min-width: 280px;
    }

    .create-new-btnnew img {
        height: 15px;
        width: 15px;
        margin-right: 0rem;
    }

    .search-icon {
        height: 15px;
        width: 15px;
    }

    .clear-class {
        height: 15px;
        width: 15px;
    }

    .sort-buttons {
        margin-top: 20px;
        height: 30px;
    }
}
</style>

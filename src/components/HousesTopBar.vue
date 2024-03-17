<template>
    <div class="top-bar">
        <div class="heading">
            <h1>HousesGen</h1>
            <button class="create-new-btn" @click.stop="createHouse()">+ CREATE NEW</button>
        </div>

        <div class="sorting">
            <div class="search-barInput">
                <img src="../assets/images/ic_search@3x.png" alt="search-icon" class="search-icon">
                <input type="text" id="searchByCity" placeholder="Search by City" class="search-bar input-field"
                    :value="localSearchQuery" @input="updateSearchQuery($event.target.value)">

                <img v-if="localSearchQuery" src="../assets/images/ic_clear@3x.png" alt="clear-icon" class="clear-class"
                    @click="clearSearch()" />
            </div>
            <div class="sort-buttons">
                <button class="sort-btn-price" :class="{ active: sortBy === 'price' }" @click="setSort('price')">
                    Price
                </button>
                <button class="sort-btn-size" :class="{ active: sortBy === 'size' }" @click="setSort('size')">
                    Size
                </button>
            </div>
        </div>
        <div class="search-result" v-if="searchMessage">
            <p class="listing-info">{{ searchMessage }}</p>
        </div>

    </div>
</template>
<script>
import { useHouseStore } from "../stores/house";

export default {
    name: 'TopBar',
    props: {
        searchMessage: String,
        searchQuery: String,
        sortBy: String
    },
    data() {
        return {
            localSearchQuery: this.searchQuery,
        };
    },
    emits: ['setSortCriteria', 'updateSearchQuery', 'clearSearch'],
    methods: {

        setSort(criteria) {
            this.$emit('setSortCriteria', criteria);
        },
        createHouse() {
            const houseStore = useHouseStore();
            houseStore.clearListing();
            this.$router.push({ name: "Create" });
        },
        updateSearchQuery(value) {
            this.localSearchQuery = value;
            this.$emit('updateSearchQuery', value);
        },
        clearSearch() {
            this.localSearchQuery = '';
            this.$emit('clearSearch');
        },
    },
    watch: {

        // when we search any house attibuted in search bar this method is called
        searchQuery(newQuery) {
            this.localSearchQuery = newQuery;
        },
    },
};


</script>

<style>
.top-bar {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    width: 100%;
}

.heading,
.sorting {
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    padding: 15px 0px 15px 0px;
}

.create-new-btn {
    height: 50px;
    width: 200px;
    border: 5px;
    border-radius: 10px;
    padding: 10px 20px;
    background-color: rgb(235, 84, 64);
    color: rgb(255, 255, 255);
    border: none;
    cursor: pointer;
    margin-top: 0;
}

.search-barInput {
    height: 50px;
    background-color: rgba(232, 232, 232);
    width: 500px;
    border-radius: 10px;

    display: flex;
    align-items: center;
    padding-left: 20px;
}

.search-icon {
    height: 20px;
}

.search-bar::placeholder {
    color: rgb(195, 195, 195);
}

.search-bar {
    flex-grow: 1;
    margin-left: 10px;
    background-color: transparent;
    border: none;
    outline: none;
}

.search-result {
    text-align: left;
    width: 300px;
    height: 60px;
}

.sort-buttons {
    display: flex;
    align-items: center;
    width: 300px;
    height: 50px;
}

.sort-btn-price,
.sort-btn-size {
    flex-basis: 50%;
    height: inherit;
    border-radius: 10px 0px 0px 10px;
    background-color: rgb(195, 195, 195);
    border: none;
}

button {
    color: rgb(255, 255, 255);
}

.sort-btn-size {
    flex-basis: 50%;
    height: inherit;
    border-radius: 0px 10px 10px 0px;
    border: none;
    background-color: rgb(195, 195, 195);
}

.sort-btn-price.active,
.sort-btn-size.active {
    background-color: rgb(235, 84, 64);
}
</style>

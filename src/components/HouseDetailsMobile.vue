<template>
    <div class="house-detail-page-mobile" :class="{ 'no-scroll': showDeleteModal }">
        <section class="house-details-layout-mobile">
            <div class="house-detailed-layout-mobile">
                <div class="house-details-mobile">
                    <div v-if="house" class="details-layout-mobile">
                        <div class="house-image-mobile">
                            <img :src="house.image" alt="House image" class="image-of-house" />

                            <div class="edit-icons-mobile">
                                <button @click="goBack" class="back-icon-mobile">
                                    <img src="./assets/ic_back_white@3x.png" alt="back" class="back-icon-image">
                                </button>
                                <span class="house-actions-mobile" v-if="house.madeByMe">
                                    <img src="./assets/ic_edit_white@3x.png" alt="Edit"
                                        class="icon-mobile edit-icon-mobile" @click.stop="editHouse(house.id)" />
                                    <img src="./assets/ic_delete_white@3x.png" alt="Delete"
                                        class="icon-mobile delete-icon-mobile"
                                        @click.stop="showDeletePopup(house.id)" />
                                </span>
                            </div>

                        </div>
                        <div class="house-info-mobile">
                            <div class="house-titlebar-mobile">
                                <h1 class="heading-tag ">{{ `${house.location.street} ${house.location.houseNumber}` }}
                                </h1>
                            </div><!-- house-titlebar ends -->
                            <p class="house-location-mobile">
                                <img class="icon-mobile" src="./assets/ic_location@3x.png" alt="location">
                                <span class="listing-info-mobile">{{ `${house.location.zip}
                                    ${house.location.city}` }}</span>
                            </p>
                            <ul class="house-area-mobile listing-info-mobile">
                                <li>
                                    <img class="icon-mobile" src="./assets/ic_price@3x.png" alt="price_icon">
                                    <span>{{ house.price.toLocaleString() }}</span>
                                </li>
                                <li>
                                    <img class="icon-mobile" src="./assets/ic_size@3x.png" alt="size_icon">
                                    <span>{{ house.size }} m²</span>
                                </li>
                                <li>
                                    <img class="icon-mobile" src="./assets/ic_construction_date@3x.png"
                                        alt="construction_icon">
                                    <span>Built in {{ house.constructionYear }}</span>
                                </li>
                            </ul>
                            <ul class="house-attributes-mobile">
                                <li>
                                    <img class="icon-mobile" src="./assets/ic_bed@3x.png" alt="bed_icon">
                                    <span>{{ house.rooms.bedrooms }}</span>
                                </li>
                                <li>
                                    <img class="icon-mobile" src="./assets/ic_bath@3x.png" alt="bath_icon">
                                    <span>{{ house.rooms.bathrooms }}</span>
                                </li>
                                <li>
                                    <img class="icon-mobile" src="./assets/ic_garage@3x.png" alt="garage_icon">
                                    <span>{{ house.hasGarage ? 'Yes' : 'No' }}</span>
                                </li>
                            </ul>

                            <p class="house-description-mobile body-text-mobile">{{ house.description }}</p>
                        </div><!-- house-info ends -->
                    </div><!-- house-details ends -->
                    <div v-else class="loading-mobile">
                        Loading details...
                    </div>

                </div>
                <div class="house-recommended-mobile">
                    <h2>Recommended for you</h2>
                </div>
            </div><!-- house-detailed-layout ends -->

        </section><!-- house-detais-layout ends -->
        <delete-popup v-if="showDeleteModal" :houseId="selectedHouseId" @close="showDeleteModal = false"></delete-popup>
    </div><!-- house-detais-page ends -->
</template>

<script>
import DeletePage from '../components/Delete.vue';
import commonHouseDetails from './utils/commonHouseDetails';
export default {
    name: 'HouseDetails',
    ...commonHouseDetails,
    components: {
        'delete-popup': DeletePage
    },
};
</script>

<style>
@import './assets/styles/houseDetailsMobile.css';
</style>
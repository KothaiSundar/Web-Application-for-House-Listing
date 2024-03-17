<script>
import HousesIcons from './HouseIcons.vue';
import EditDeleteActions from './EditDeleteActions.vue';

export default {
    name: 'HouseCard',
    components: {
        "houses-icons": HousesIcons,
        "house-action": EditDeleteActions,
    },
    props: {
        house: Object,
    },
    emits: ['onAfterDelete'],
    methods: {
        goToHouseDetails(houseId) {
            this.$router.push({
                name: "HouseDetails",
                params: { id: houseId },
            });
        },
        handleDelete(houseId) {
            this.onDelete(houseId);
        },
        handleEdit(houseId) {
            this.onEdit(houseId);
        },
    }
};
</script>

<template>
    <div class="house-card" @click="goToHouseDetails(house.id)">
        <img :src="house.image" alt="House image" class="houses-image" />
        <div class="houses-info">
            <div class="houses-details">
                <h2>{{ `${house.location.street} ${house.location.houseNumber}${house.location.houseNumberAddition &&
        house.location.houseNumberAddition !== 'undefined' ? ' ' + house.location.houseNumberAddition : ''}`
                    }}</h2>
                <p class="listing-info">€ {{ house.price.toLocaleString() }}</p>
                <p class="houses-address"> {{ `${house.location.zip} ${house.location.city}` }} </p>
                <houses-icons :bedrooms="house.rooms.bedrooms" :bathrooms="house.rooms.bathrooms"
                    :size="house.size"></houses-icons>
            </div><!--  house-details ends -->
            <house-action v-if="house.madeByMe" :house="house" @onAfterDelete="$emit('onAfterDelete')" />
        </div><!--  house-info ends -->
    </div><!--  house-card ends -->
</template>



<style>
.house-card {
    display: flex;
    align-items: flex-start;
    padding: 20px;

    margin-bottom: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background: rgb(255, 255, 255);

    border-radius: 10px;
}

.houses-image {
    width: 150px;
    height: 150px;
    object-fit: cover;
    margin-right: 20px;
    border-radius: 8px;
}

.houses-info {
    display: flex;
    justify-content: space-between;
    align-items: start;
    width: 100%;
}

.houses-details {
    display: flex;
    flex-direction: column;
    text-align: left;
    line-height: 5px;
}

.houses-address {
    font-size: 18px;
    font-family: "Open sans";
    color: rgb(195, 195, 195);
}
</style>

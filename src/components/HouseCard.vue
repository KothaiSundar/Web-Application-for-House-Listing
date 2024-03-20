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
        enableHouseAction: {
            type: Boolean,
            default: true
        },
        customClass: {
            type: String,
            default: ''
        }

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
    <div :class="['house-card', customClass]" @click="goToHouseDetails(house.id)">
        <div class="house-card-details">


            <img :src="house.image" alt="House image" class="houses-image" />
            <div class="houses-info">
                <div class="houses-details">
                    <h2 class="recommended-house-location house-location">{{ `${house.location.street}
                        ${house.location.houseNumber}${house.location.houseNumberAddition &&
            house.location.houseNumberAddition !== 'undefined' ? ' ' + house.location.houseNumberAddition :
            ''}`
                        }}</h2>
                    <p class="listing-info">€ {{ house.price.toLocaleString() }}</p>
                    <p class="houses-address"> {{ `${house.location.zip} ${house.location.city}` }} </p>
                    <houses-icons :bedrooms="house.rooms.bedrooms" :bathrooms="house.rooms.bathrooms"
                        :size="house.size"></houses-icons>
                </div><!--  house-details ends -->
                <house-action v-if="house.madeByMe && enableHouseAction" :house="house"
                    @onAfterDelete="$emit('onAfterDelete')" />
            </div><!--  house-info ends -->
        </div>
    </div><!--  house-card ends -->
</template>



<style>
.house-card-details {
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
    line-height: 7px;
}

@media (min-width:769px)and (max-width: 2000px) {
    .house-card-details {
        position: sticky;
    }
}

@media screen and (max-width: 768px) {
    .house-card {
        padding: 15px;
        margin-bottom: 50px;
        margin: 0;
    }

    .house-card-details {
        margin: auto;
    }

    .houses-image {
        width: 150px;
        height: 150px;
        margin-right: 20px;
    }

    .houses-details {
        line-height: 5px;
        width: 100%;
    }

    .house-location,
    .houses-address {
        font-size: 16px;
    }

    .houses-icons {
        padding-top: 10px;
        gap: 10px;
        font-size: 16px;
    }
}

@media screen and (max-width: 540px) {
    .house-card {
        padding: 10px;
        margin-bottom: 10px;
    }

    .houses-image {
        width: 140px;
        height: 140px;
        margin-right: 15px;
    }

    .houses-details {
        line-height: 5px;

    }

    .house-location,
    .houses-address {
        font-size: 14px;
    }

    .houses-icons {
        gap: 10px;
        font-size: 14px;
    }
}

@media screen and (max-width: 430px) {
    .house-card {
        padding: 8px;
        margin-bottom: 5px;
    }

    .houses-image {
        width: 130px;
        height: 130px;
        margin-right: 15px;
    }

    .houses-details {
        line-height: 5px;
    }

    .house-card-details {
        padding: 10px;
    }

    .houses-icons {
        gap: 8px;
    }

}

@media screen and (max-width: 414px) {

    .houses-image {
        width: 120px;
        height: 120px;
    }

    .houses-address {
        width: 150px;
    }

    .house-location,
    .houses-address {
        font-size: 14px;
    }

    .houses-icons {
        gap: 7px;
        font-size: 14px;
    }

}

@media screen and (max-width: 390px) {
    .house-card {
        padding: 5px;
        margin-bottom: 5px;
    }

    .houses-details {
        line-height: 1px;
    }

    .houses-image {
        width: 120px;
        height: 120px;
        margin-right: 10px;
    }

    .houses-icons {
        gap: 7px;
    }
}

@media screen and (max-width: 375px) {
    .house-card {
        padding: 5px;
        margin-bottom: 5px;
    }

    .houses-image {
        width: 110px;
        height: 110px;
        margin-right: 10px;
    }

    .houses-address {
        width: 140px;

    }
}

@media screen and (max-width: 285px) {
    .house-card {
        padding: 3px;
        margin-bottom: 8px;
    }

    .house-card-details {
        padding: 7px;
    }

    .houses-details {

        line-height: 0px;
    }

    .houses-image {
        width: 80px;
        height: 80px;
        margin-right: 8px;
    }

    .houses-address {
        width: 110px;

    }

    .house-location,
    .houses-address {
        font-size: 10px;
    }

    .houses-icons {
        padding-top: 2px;
        gap: 4px;
        font-size: 10px;
    }
}
</style>

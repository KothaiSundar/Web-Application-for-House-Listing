<script>
import DeletePage from '../components/DeletePopup.vue';
import { useHouseStore } from "../stores/house";

export default {
    name: 'EditDeleteActions',
    components: {
        'delete-popup': DeletePage,
    },
    props: {
        house: Object,
        isHouseDetailMobile: {
            type: Boolean,
            default: false
        },
    },
    emits: ['onAfterDelete'],
    data() {
        return {
            showDeleteModal: false, // associated with delete icon, if true delete popup page will be displayed
        };
    },
    watch: {
        showDeleteModal(value) {
            if (value) {
                // When showDeleteModal is true, add the no-scroll class to prevent the background from scrolling
                document.body.classList.add("no-scroll");
            } else {
                // When showDeleteModal is false, remove the no-scroll class to allow scrolling again
                document.body.classList.remove("no-scroll");
            }
        }
    },
    methods: {
        showDeletePopup(houseId) {
            if (houseId) {
                this.selectedHouseId = houseId;
                this.showDeleteModal = true;
            }
        },
        handleEdit() {
            const houseStore = useHouseStore();
            houseStore.setListing(this.house);
            this.$router.push({ name: "Edit" });
        },
    }
};
</script>

<template>
    <div>
        <span v-if="!isHouseDetailMobile" class="houses-actions">
            <img src="../assets/images/ic_edit@3x.png" alt="Edit" class=" edit-icon" @click.stop="handleEdit" />

            <img src="../assets/images/ic_delete@3x.png" alt="Delete" class="delete-icon"
                @click.stop="showDeletePopup(house.id)" />
        </span>

        <div v-if="isHouseDetailMobile" class="edit-actions-details-mobile">
            <span class="edit"><img src="../assets/images/ic_edit_white@3x.png" alt="Edit"
                    @click.stop="handleEdit" /></span>
            <span class="delete"><img src="../assets/images/ic_delete_white@3x.png" alt="Delete"
                    @click.stop="showDeletePopup(house.id)" />
            </span>
        </div>
        <delete-popup v-if="showDeleteModal" :houseId="selectedHouseId" @houseDeleted="$emit('onAfterDelete')"
            @close="showDeleteModal = false"></delete-popup>
    </div>
</template>

<style>
.houses-actions {
    display: flex;
    flex-direction: row;
}

.houses-actions img {
    padding-right: 20px;
}

.edit-icon,
.delete-icon {
    border: none;
    background: none;
    padding: 5px;
    width: 20px;
    height: 20px;
}

.edit-actions-details-mobile {
    display: none;
}

@media screen and (max-width: 768px) {

    .edit-icon,
    .delete-icon {
        padding: 0;
        padding-top: 5px;

        width: 20px;
        height: 20px;
    }

    .houses-actions img {
        padding-right: 10px;
    }

    .edit-actions-details-mobile {
        position: absolute;
        width: 70px;
        right: 5px;
        display: flex;

    }

    .edit-actions-details-mobile img {
        width: 20px;
        height: 20px;
    }

    .delete {
        margin-left: 20px;
    }

}

@media screen and (max-width: 430px) {

    .edit-icon,
    .delete-icon {

        width: 15px;
        height: 15px;

    }


}

@media screen and (max-width: 390px) {

    .edit-icon,
    .delete-icon {

        width: 10px;
        height: 10px;

    }

    .houses-actions img {
        padding-right: 8px;

    }

}
</style>

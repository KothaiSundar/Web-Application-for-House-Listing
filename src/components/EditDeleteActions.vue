<template>
    <div class="houses-actions">
        <img src="./assets/ic_edit@3x.png" alt="Edit" class="icon edit-icon" @click.stop="handleEdit" />
        <!-- <img src="./assets/ic_delete@3x.png" alt="Delete" class="icon delete-icon" @click.stop="$emit('delete')" /> -->
        <img src="./assets/ic_delete@3x.png" alt="Delete" class="icon delete-icon"
            @click.stop="showDeletePopup(house.id)" />
        <delete-popup v-if="showDeleteModal" :houseId="selectedHouseId" @houseDeleted="$emit('onAfterDelete')"
            @close="showDeleteModal = false"></delete-popup>
    </div>
</template>

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
            console.log('edit');
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

<style>
.houses-actions {
    display: flex;
    flex-direction: row;
}

.houses-actions img {
    padding-right: 20px;
    /* should not give this for mobile. it is not there */
}

.edit-icon,
.delete-icon {
    border: none;
    background: none;
    padding: 5px;
    width: 20px;
    height: 20px;
}
</style>
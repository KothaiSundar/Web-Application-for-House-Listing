<template>
  <section class="delete-page">
    <div class="delete-page-layout">
      <div class="delete-content">
        <h2>Delete listing</h2>
        <p class="body-text">Are you sure you want to delete this listing? This action cannot be undone.</p>
        <div class="options">
          <button class="choose-to-delete" @click.stop="deleteListing()">
            YES, DELETE
          </button>
          <button class="choose-to-delete" @click.stop="$emit('close')">
            GO BACK
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import housingApiService from '../services/HousingApiServices'
export default {
  props: {
    houseId: {
      type: [String, Number],
      required: true
    }
  },
  methods: {
    async deleteListing() {
      try {
        let deleteResposne = await housingApiService.deleteHouse(this.houseId);
        if (deleteResposne.status !== 200 && deleteResposne.status != 204) {
          throw new Error('Failed to delete ');
        }
        this.$router.replace('/houses');
      }
      catch (error) {
        window.alert('Error deleting house: ' + error.message + ", try after some time!!");
      }
      finally {
        this.$emit('close');
        this.$emit('houseDeleted');
      }
    }
  }
};
</script>

<style>
@import './assets/styles/deletePopup.css';
</style>
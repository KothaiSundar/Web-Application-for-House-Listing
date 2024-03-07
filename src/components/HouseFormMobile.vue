<template>

  <div class="house-form-page-mobile">
    <section class="house-form-layout-mobile">
      <div class="edit-listing-container-mobile">

        <nav class="navigation-bar-mobile">
          <div class="navigation-content-mobile">
            <button @click="goBack" class="back-icon-mobile">
              <img src="./assets/ic_back_grey@3x.png" class="icon-mobile-houseform icon-mobile" alt="back">
            </button>
            <h1 class="form-title-mobile heading-tag">{{ isEditMode ? 'Edit listing' : 'Create new listing' }}</h1>
          </div>
        </nav>


        <form @submit.prevent="submitForm" class="form-mobile">
          <div class="form-group-mobile">
            <label for="street-name-mobile">Street name*</label>
            <input type="text" id="street-name" v-model="houseDetail.location.street" required
              placeholder="Enter the street name" class="input-placeholder-mobile input-field-mobile">
          </div>

          <div class="form-group-mobile">
            <div class="sub-details-mobile">
              <div class="sub-details-group-left-mobile">
                <label for="house-number">House number*</label>
                <input type="number" id="house-number" v-model="houseDetail.location.houseNumber" required
                  placeholder="Enter house number" class="input-placeholder-mobile input-field-mobile">
                <p class="error-message-mobile">(In Number)</p>
              </div>
              <div class="sub-details-group-right-mobile">
                <label for="additional">Addtion (optional)</label>
                <input type="text" id="addtional" v-model="houseDetail.location.houseNumberAddition"
                  placeholder="e.g. A" class="input-placeholder-mobile input-field-mobile">
              </div>
            </div>
          </div>

          <div class="form-group-mobile">
            <label for="postal-code">Postal code*</label>
            <input type="text" id="postal-code" v-model="houseDetail.location.zip" required placeholder="e.g. 1000 AA"
              class="input-placeholder input-field">
          </div>

          <div class="form-group-mobile">
            <label for="city">City*</label>
            <input type="text" id="city" v-model="houseDetail.location.city" required placeholder="Amsterdam"
              class="input-placeholder input-field">
          </div>

          <div class="form-group-mobile-image">
            <label for="image" class="custom-file-upload-mobile">
              <div class="upload-text-mobile">Upload picture (PNG or JPG)*</div>
              <div class="upload-box-mobile" v-if="!houseDetail.image">
                <div class="upload-icon-mobile">
                  <img src="./assets/ic_plus_grey@3x.png" alt="plus-icon">
                </div>
              </div>
            </label>
            <input type="file" id="image" ref="fileInput" @change="handleFileUpload">
            <div v-if="isImageSelected || houseDetail.image" class="image-preview-mobile">
              <img :src="houseDetail.image" alt="Uploaded image" class="image-upload-mobile">
              <button type="button" @click="clearImage">
                <img src="./assets/ic_clear_white@3x.png" alt="clear-icon" class="clear-icon-mobile">
              </button>
            </div>
            <div v-if="imageUploadError" class="empty-mobile error-message-mobile">{{ imageUploadError }}</div>
          </div>

          <div class="form-group-mobile">
            <label for="price">Price*</label>
            <input type="text" id="price" v-model="houseDetail.price" required placeholder="e.g. $550,00"
              class="input-placeholder-mobile input-field-mobile">
            <p class="error-message-mobile">(In Number)</p>
          </div>

          <div class="form-group-mobile">
            <div class="sub-details-mobile">
              <div class="sub-details-group-left-mobile">
                <label for="size">Size*</label>
                <input type="number" id="size" v-model="houseDetail.size" required placeholder=" e.g. 60m2"
                  class="input-placeholder-mobile input-field-mobile">
                <p class="error-message-mobile">(In Number)</p>
              </div>
              <div class="sub-details-group-right-mobile">
                <label for="garage">Garage*</label>
                <select id="garage" v-model="houseDetail.hasGarage" required>
                  <option value="" disabled selected>Select</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
            </div>
          </div>

          <div class="form-group-mobile">
            <div class="sub-details-mobile">
              <div class="sub-details-group-left-mobile">
                <label for="bedroom">Bedrooms*</label>
                <input type="number" id="bedroom" v-model="houseDetail.rooms.bedrooms" required
                  placeholder="Enter amount" class="input-placeholder-mobile input-field-mobile">
                <p class="error-message-mobile">(In Number)</p>
              </div>
              <div class="sub-details-group-right-mobile">
                <label for="bathroom">Bathrooms*</label>
                <input type="number" id="bathroom" v-model="houseDetail.rooms.bathrooms" required
                  placeholder="Enter amount" class="input-placeholder-mobile input-field-mobile">
                <p class="error-message-mobile">(In Number)</p>
              </div>
            </div>

            <div class="form-group-mobile">
              <label for="construction-date">Construction date*</label>
              <input type="number" id="construction-date" v-model="houseDetail.constructionYear" required
                placeholder="e.g. 1900" class="input-placeholder-mobile input-field-mobile">
              <p class="error-message-mobile">(construction year should be above 1900 year)</p>
            </div>

            <div class="form-group-mobile">
              <label for="description">Description*</label>
              <textarea type="text" id="description" v-model="houseDetail.description" placeholder="Enter description"
                class="input-placeholder-mobile input-field-mobile" name="Address" rows="4">
                        </textarea>
              <div v-if="descriptionError" class="empty-mobile error-message-mobile">{{ descriptionError }}</div>
            </div>
          </div>

          <button type="submit" class="submit-button-mobile button-mobile">
            <div class="footer-mobile">POST</div>
          </button>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
// this component is used for both create and edit 
import commonHouseForm from './utils/commonHouseForm';
export default {
  name: 'HouseForm',
  ...commonHouseForm,
}
</script>

<style>
@import './assets/styles/houseFormMobile.css';
</style>
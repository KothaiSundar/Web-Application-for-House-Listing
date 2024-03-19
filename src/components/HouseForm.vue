<template>
  <div class="house-form-page">
    <section class="house-form-layout layout">
      <div class="edit-listing-container">

        <nav class="navigation-bar-house-form">
          <div class="navigation-content-house-form">
            <button @click="goBack" class="back-icon">
              <img src="./assets/ic_back_grey@3x.png" alt="back" class="icon">
            </button>
            <div class=" back-button desktop-only">
              Back to overview
            </div>

            <h1 class="form-title mobile-only">{{ isEditMode ? 'Edit listing' : 'Create new listing' }}
            </h1>


          </div>
        </nav>

        <h1 class="form-title desktop-only">{{ isEditMode ? 'Edit listing' : 'Create new listing' }}</h1>

        <form @submit.prevent="submitForm" class="form">

          <div class="form-group">
            <label for="street-name">Street name*</label>
            <input type="text" id="street-name" v-model="houseDetail.location.street" required
              placeholder="Enter the street name" class="input-placeholder input-field">
          </div>

          <div class="form-group">
            <div class="sub-details">
              <div class="sub-details-group-left">
                <label for="house-number">House number*</label>
                <input type="number" id="house-number" v-model="houseDetail.location.houseNumber" required
                  placeholder="Enter house number" class="input-placeholder input-field">
                <p class="error-message">(In Number)</p>
              </div>
              <div class="sub-details-group-right">
                <label for="additional">Addition (optional)</label>
                <input type="text" id="addtional" v-model="houseDetail.location.houseNumberAddition"
                  placeholder="e.g. A" class="input-placeholder input-field">
              </div>
            </div>
          </div>

          <div class="form-group">
            <label for="postal-code">Postal code*</label>
            <input type="text" id="postal-code" v-model="houseDetail.location.zip" required placeholder="e.g. 1000 AA"
              class="input-placeholder input-field">
          </div>

          <div class="form-group">
            <label for="city">City*</label>
            <input type="text" id="city" v-model="houseDetail.location.city" required placeholder="Amsterdam"
              class="input-placeholder input-field">
          </div>

          <div class="form-group-image">
            <label for="image" class="custom-file-upload">
              <div class="upload-text">Upload picture (PNG or JPG)*</div>
              <div class="upload-box" v-if="!houseDetail.image">
                <div class="upload-icon">
                  <img src="./assets/ic_plus_grey@3x.png" alt="plus-icon">
                </div>
              </div>
            </label>

            <input type="file" id="image" ref="fileInput" @change="handleFileUpload">

            <div v-if="isImageSelected || houseDetail.image" class="image-preview">
              <img :src="houseDetail.image" alt="Uploaded image" class="image-upload">
              <button type="button" @click="clearImage">
                <img src="./assets/ic_clear_white@3x.png" alt="clear-icon" class="clear-icon">
              </button>
            </div>

            <div v-if="imageUploadError" class="empty error-message">{{ imageUploadError }}</div>
          </div>

          <div class="form-group">
            <label for="price">Price*</label>
            <input type="text" id="price" v-model="houseDetail.price" required placeholder="e.g. $550,00"
              class="input-placeholder input-field">
            <p class="error-message">(In Number)</p>
          </div>

          <div class="form-group">
            <div class="sub-details">
              <div class="sub-details-group-left">
                <label for="size">Size*</label>
                <input type="number" id="size" v-model="houseDetail.size" required placeholder=" e.g. 60m2"
                  class="input-placeholder input-field">
                <p class="error-message">(In Number)</p>
              </div>
              <div class="sub-details-group-right">
                <label for="garage">Garage*</label>
                <select id="garage" v-model="houseDetail.hasGarage" required>
                  <option value="" disabled selected>Select</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
            </div>
          </div>

          <div class="form-group">
            <div class="sub-details">
              <div class="sub-details-group-left">
                <label for="bedroom">Bedrooms*</label>
                <input type="number" id="bedroom" v-model="houseDetail.rooms.bedrooms" required
                  placeholder="Enter amount" class="input-placeholder input-field">
                <p class="error-message">(In Number)</p>
              </div>
              <div class="sub-details-group-right">
                <label for="bathroom">Bathrooms*</label>
                <input type="number" id="bathroom" v-model="houseDetail.rooms.bathrooms" required
                  placeholder="Enter amount" class="input-placeholder input-field">
                <p class="error-message">(In Number)</p>
              </div>
            </div>

            <div class="form-group">
              <label for="construction-date">Construction date*</label>
              <input type="number" id="construction-date" v-model="houseDetail.constructionYear" required
                placeholder="e.g. 1900" class="input-placeholder input-field">
              <p class="empty error-message" v-show="constructionYearError">Construction year should be above 1900.</p>
            </div>

            <div class="form-group">
              <label for="description">Description*</label>
              <textarea type="text" id="description" v-model="houseDetail.description" placeholder="Enter description"
                class="input-placeholder input-field" name="Address" rows="6">
                      </textarea>
              <div v-if="descriptionError" class="empty error-message">{{ descriptionError }}</div>
            </div>
          </div>
          <button type="submit" class="submit-button">POST</button>
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

<style scoped>
.mobile-only {
  display: none;
}

.house-form-page {
  margin-top: 5rem;
  background-image: url(../assets/images/img_background@3x.png);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  width: 100vw;
}

.house-form-layout {
  text-align: left;
}

.edit-listing-container {
  width: 500px;
}

.navigation-bar-house-form {
  width: 100%;
  height: 5rem;
  padding-top: 1rem;
}

.navigation-content-house-form {
  padding: 0;
  margin: 0;
  height: 6rem;
  display: flex;
  align-items: center;
}

.back-icon {
  background: none;
  border: none;
  cursor: pointer;
}

.back-icon img {
  width: 1.5rem;
}

.back-button {
  margin-left: 2rem;
}

.form {
  max-width: 90%;
  padding-bottom: 5rem;
  position: relative;
}

.form-group {
  padding-bottom: 10px;
  padding-top: 10px;
}

.form-group label {
  display: block;
  padding-bottom: 20px;
}

.input-placeholder::placeholder {
  color: rgb(195, 195, 195);
  opacity: 1;
}

.form-group input[type="text"],
.form-group input[type="number"],
.form-group input[type="file"] {
  width: 90%;
  padding: 20px 20px;
  border-radius: 10px;
  padding-right: 5%;
  padding-left: 5%;
  border: none;
}

.sub-details {
  display: flex;
  width: 100%;
}

.sub-details-group-left {
  flex-basis: 48%;
}

.sub-details-group-right {
  flex-basis: 48%;
  margin-left: 5%;
}

.sub-details-group-right select {
  width: 100%;
  padding: 20px 20px;
  border-radius: 10px;

  border: none;
  border-radius: 10px;
}

.form-group #description {
  border: none;
  border-radius: 10px;
  width: 90%;
  padding: 20px 20px;
  border-radius: 10px;
  padding-right: 5%;
  padding-left: 5%;
}

.custom-file-upload {
  display: block;
  cursor: pointer;
}

.form-group-image {
  width: 180px;
  padding-bottom: 20px;
}

.upload-text {
  display: block;
  padding-bottom: 20px;
  width: 300px;
}

.upload-box {
  border: 2px dashed #ccc;

  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 150px;
}

.upload-icon img {
  height: 40px;
}

input[type="file"] {
  display: none;
}

.image-preview {
  width: 170px;
  height: 170px;
  position: relative;
}

.image-upload {
  margin-right: 20px;
  height: 150px;
  width: 150px;
  display: block;
  border-radius: 10px;
}

.clear-icon {
  height: 40px;
  width: 40px;
  position: absolute;
  top: 0;
  background-color: transparent;
  border: none;
  right: 5px;
}

button {
  background-color: transparent;
  border: none;
}

.submit-button {
  position: absolute;
  background: rgb(235, 84, 64);
  color: rgb(255, 255, 255);
  border: none;
  right: 0px;
  border-radius: 10px;
  cursor: pointer;
  width: 200px;
  height: 50px;
}

.error-message {
  color: rgb(74, 75, 76);
}

.empty {
  color: rgb(235, 84, 64);
}

.border-red {
  border: 1px solid rgb(235, 84, 64);
}

@media screen and (max-width: 768px) {

  .desktop-only {
    display: none;
  }

  .house-form-page {
    margin-bottom: 5rem;
    margin-top: 0rem;
  }

  .house-form-layout {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 5rem;
  }

  .edit-listing-container {
    width: 90%;
  }

  .navigation-bar-house-form {
    height: 3rem;
  }

  .navigation-content-house-form {
    height: 2rem;
    width: 100%;
    justify-content: center;

  }

  .back-icon {
    flex-basis: 10%;
    text-align: left;
  }

  .back-icon img {
    margin-top: 10px;
    width: 20px;
    height: 20px;
  }

  .mobile-only {
    margin-top: 0;
    display: block;

  }

  .form-title {
    flex-basis: 90%;
    text-align: center;
    padding-top: 2rem;
    margin-right: 2rem;
  }

  .form {
    position: none;
    max-width: 100%;
    margin-top: 10px;
  }

  .form-group label {
    padding-bottom: 10px;
  }

  .form-group input[type="text"],
  .form-group input[type="number"],
  .form-group input[type="file"] {
    padding: 15px 15px;
    border-radius: 5px;
    padding-right: 5%;
    padding-left: 5%;
  }

  .sub-details-group-right select {
    padding: 15px 15px;
    border-radius: 5px;
  }

  .form-group-image {
    padding-bottom: 0px;
  }

  .upload-text {
    padding-bottom: 10px;
  }

  .upload-box {
    width: 100px;
    height: 100px;
  }

  .upload-icon img {
    height: 20px;
  }

  .image-preview {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    width: 120px;
    height: 120px;
    position: none;
    margin-bottom: 10px;
  }

  .image-upload {
    height: 110px;
    width: 110px;
    border-radius: 10px;
    margin-right: 0;
  }

  .clear-icon {
    position: none;
    margin-left: -25px;
    height: 25px;
    width: 25px;
    cursor: pointer;
    z-index: 1;
  }

  .submit-button {
    position: none;
    width: 100%;
    max-width: 100%;
    height: 40px;
    border-radius: 5px;
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }
}

@media (min-width:100px) and (max-width: 300px) {
  .house-form-page {
    width: 100%;
    min-width: 300px;
  }

  .edit-listing-container {
    width: 100%;
    min-width: 100px;
    margin: 0 auto;

  }

  .form {
    max-width: 100%;
    min-width: 100px;
  }

  label {
    font-size: 10px;
  }
}
</style>
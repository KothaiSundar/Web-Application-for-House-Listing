<template>
    <div class="house-form-page">
      <div class="house-form-layout">
         <div class="edit-listing-container">

                      <div class="navigation-bar">
                      
                        <div class="navigation-content"> 
                        <button @click="goBack" class="back-icon">
                        <img src="./assets/ic_back_grey@3x.png" alt="back">
                        </button>

                        <div class=" back-button">
                          Back to overview
                        </div>
                        </div>
            
                    </div>

                    <h1 class="form-title">{{ isEditMode ? 'Edit listing' : 'Create new listing' }}</h1>
                  <form @submit.prevent="submitForm" class="form">

                    <div class="form-group">
                    <label for="street-name">Street name*</label>
                    <input type="text" id="street-name" v-model="listing.location.street" required
                    placeholder="Enter the street name" class="input-placeholder input-field">
                    
                    </div>

                    <div class="form-group">

                        <div class="sub-details">

                            <div class="sub-details-group-left">
                                <label for="house-number">House number*</label>
                                <input type="number" id="house-number" v-model="listing.location.houseNumber" required
                                placeholder="Enter house number" class="input-placeholder input-field">
                                <p class="error-message">(In Number)</p>
                               
                           </div>

                           <div class="sub-details-group-right">
                            <label for="additional">Addtion (optional)</label>
                            <input type="text" id="addtional" v-model="listing.location.houseNumberAddition" 
                            placeholder="e.g. A" class="input-placeholder input-field">
                      >
                          </div>
                       </div>

                    </div>

                   

                    <div class="form-group">
                    <label for="postal-code">Postal code*</label>
                    <input type="text" id="postal-code" v-model="listing.location.zip" required
                    placeholder="e.g. 1000 AA" class="input-placeholder input-field">
                   
                    </div>

                    <div class="form-group">
                    <label for="city">City*</label>
                    <input type="text" id="city" v-model="listing.location.city" required
                    placeholder="Amsterdam" class="input-placeholder input-field">
                   
                    </div>

                    <div class="form-group-image">
                              <label for="image" class="custom-file-upload">
                                <div class="upload-text">Upload picture (PNG or JPG)*</div>
                                <div class="upload-box" v-if="!listing.image">
                                  <div class="upload-icon">
                                    <img src="./assets/ic_plus_grey@3x.png" alt="plus-icon">
                                  </div>
                                </div>
                              </label>

                              <input type="file" id="image" ref="fileInput"  @change="handleFileUpload" :required="!isImageSelected && !listing.image">
                              
                              <div v-if="isImageSelected || listing.image" class="image-preview">
                                <img :src="listing.image" alt="Uploaded image" class="image-upload">
                                <button type="button" @click="clearImage">
                                    <img src="./assets/ic_clear_white@3x.png" alt="clear-icon" class="clear-icon">
                                </button>
                              </div>
                       </div>

                    <div class="form-group">
                        <label for="price">Price*</label>
                        <input type="text" id="price" v-model="listing.price" required
                        placeholder="e.g. $550,00" class="input-placeholder input-field">
                        <p class="error-message">(In Number)</p>
                       
                    </div>

                    <div class="form-group">

                        <div class="sub-details">

                          <div class="sub-details-group-left">
                                <label for="size">Size*</label>
                                <input type="number" id="size" v-model="listing.size" required
                                        placeholder=" e.g. 60m2" class="input-placeholder input-field">
                                        <p class="error-message">(In Number)</p>
                                        
                            </div>
                            <div class="sub-details-group-right">
                                <label for="garage">Garage*</label>
                                <select id="garage" v-model="listing.hasGarage" required>
                                 
                                   
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
                            <input type="number" id="bedroom" v-model="listing.rooms.bedrooms" required
                            placeholder="Enter amount" class="input-placeholder input-field">
                            <p class="error-message">(In Number)</p>
                          
                        </div>
                        <div class="sub-details-group-right">
                            <label for="bathroom">Bathrooms*</label>
                             <input type="number" id="bathroom" v-model="listing.rooms.bathrooms" required
                            placeholder="Enter amount" class="input-placeholder input-field">
                            <p class="error-message">(In Number)</p>
                           
                        </div>

                        </div>

                    <div class="form-group">
                        <label for="construction-date">Construction date*</label>
                        <input type="number" id="construction-date" v-model="listing.constructionYear" 
                       required
                        placeholder="e.g. 1900" class="input-placeholder input-field">
                        <p class="error-message">(construction year should be above 1900 year)</p>
                      
                    </div>

                    <div class="form-group">
                        <label for="description">Description*</label>
                        <textarea type="text" id="description" 
                        v-model="listing.description" 
                        @blur="validateDescription" @input="validateDescription" 
                          placeholder="Enter description" class="input-placeholder input-field" 
                          name="Address" rows="6">
                      </textarea>

                      <div v-if="descriptionError" class="empty error-message">{{ descriptionError }}</div>
                    </div>

            </div>
                <button type="submit" class="submit-button">POST</button>
      </form>
    </div>
</div>
</div>
  </template>
  
  <script>

import housingApiServices from '../services/HousingApiServices';
import { useHouseStore } from '../services/store';

  export default {
    data() {
      return {
        isEditMode: false,
        selectedFile: null,
        isImageSelected: false,
        listing: null,
        descriptionError: '',
      }
 
      
 

    },
    created() {
      console.log('created');
      this.initialiseState();
    },
    

    methods: {
      initialiseState() {
        const houseStore = useHouseStore();
            console.log("listing curret => ", houseStore.currentListing );
            if (houseStore.currentListing) {
              this.isEditMode = true;
              this.listing = houseStore.currentListing ;
            } 
            
            else {
              this.isEditMode = false;
              this.listing =  {"location" : {}, "rooms" : {}, "image":null};
            }
      },
      validateDescription() {
    if (!this.listing.description) {
      this.descriptionError = 'Required field missing.';
    } else {
      this.descriptionError = '';
    }
  },


      goBack() {
        this.clearState();
        this.$router.go(-1); 
      },

      async submitForm() {
        // this.validateDescription();
         this.descriptionError = ''; 
        // Reset the error message
                if (!this.listing.description) {
                  // If the description is empty, set the error message and return
                  this.descriptionError = 'Required field missing.';
                  return;
                }
            console.log(JSON.stringify(this.listing));
            try {
                  let response;
                  if(this.isEditMode) {
                      console.log('edit check =', this.listing.id);
                      response = await housingApiServices.editHouse(this.listing.id, this.listing);
                  }
                  else{
                      console.log('edit check =', this.listing);
                      response = await housingApiServices.createHouse(this.listing);
                  }
                  console.log('new house id', response);

                  //201 for creat and 204 for edit
                  if ((response.status === 201 || response.status === 204)) {

                      if(this.selectedFile) {
                          let houseId = response.data.id;
                          if(response &&  response.data.id ) {
                              houseId = response.data.id;
                          } 
                          else if(this.isEditMode) {
                              houseId = this.listing.id;
                          }
                          console.log('new house id==', houseId);
                          response = await housingApiServices.uploadHouseImage(houseId, this.selectedFile);

                          if (response.status === 200 || response.status === 204) {
                              console.log('Image uploaded successfully');
                              // Reset the error message if the upload is successful
                              this.errorMessage = '';
                          } else {
                              this.errorMessage = 'Image upload failed. Please try again.';
                              window.alert('Image upload failed with status:', response.status);
                          }
                      }
                      
                      this.clearState();
                      this.$router.push({ name: 'Houses' }); 

                  }
                  else {
                    console.log("error is   "+response);
                    window.alert("Error uploading edit content");
                  }
                

            } catch (error) {
                // throw error;
              console.error('An error occurred:', error);
              window.alert('something went wrong. Please try again after sometime!!');
            }
    },
      handleFileUpload(event) 
      {
        console.log("inside handleFileUpload");
        const file = event.target.files[0];
        if (file) {
        // Create a FileReader to read the file
            const reader = new FileReader();
            this.selectedFile = file;
            // Define what happens on file load
            reader.onload = (e) => {
                // Update listing.image with the base64 encoded string of the file
                this.listing.image = e.target.result;
                this.isImageSelected = true;
                console.log("pic preview create:" + this.listing.image);

            };

            // Read the file as a Data URL (base64)
            reader.readAsDataURL(file);
            this.selectedFile = event.target.files[0];
            console.log("after pic upload");

        }
      },
      clearImage() {
        console.log("clear image");
        this.listing.image = null;
        this.isImageSelected = false;
        this.selectedFile = null;
        this.$refs.fileInput.value = '';
      },
      clearState() {
        const houseStore = useHouseStore();
        houseStore.clearListing();
      }
    }
  };
  </script>
  
  <style scoped>

@import './assets/styles/styles.css';
@import './assets/styles/houseForm.css';
  

  </style>
  
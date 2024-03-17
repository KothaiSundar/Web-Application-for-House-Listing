import housingApiServices from "../../services/HousingApiServices";
import { useHouseStore } from "../../services/store";

export default {
  data() {
    return {
      isEditMode: false, // differentiate create and edit mode
      selectedFile: null, // used to store uploaded file
      isImageSelected: false, // used to preview image
      houseDetail: null, // used to store houseattributes
      descriptionError: "", // handle description error
      imageUploadError: "",
      constructionYear: null,
    };
  },
  computed: {
    constructionYearError() {
      // This will be a true or false value depending on the constructionYear input
      return (
        this.houseDetail.constructionYear &&
        this.houseDetail.constructionYear < 1901
      );
    },
  },

  //called when component is getting created
  created() {
    this.initialiseState();
  },
  methods: {
    initialiseState() {
      const houseStore = useHouseStore();

      if (houseStore.getCurrentListing) {
        this.isEditMode = true;
        this.houseDetail = houseStore.getCurrentListing;
      } else {
        this.isEditMode = false;
        //set empty default value.
        this.houseDetail = { location: {}, rooms: {}, image: null };
      }
    },

    // if we click back icon directed to one page
    goBack() {
      this.clearState();
      this.$router.go(-1);
    },

    async submitForm() {
      this.descriptionError = "";
      this.imageUploadError = "";

      if (!this.houseDetail.image) {
        this.imageUploadError = "Image required.";
        return;
      }
      if (!this.houseDetail.description) {
        this.descriptionError = "Required field missing.";
        return;
      }
      if (this.houseDetail.constructionYear < 1901) {
        // Handle the error, e.g., by showing an alert or setting an error message in the data
        alert("Construction year must be above 1900.");
        return;
      }

      try {
        let response;
        // if edit mode, setting house details
        if (this.isEditMode) {
          response = await housingApiServices.editHouse(
            this.houseDetail.id,
            this.houseDetail
          );
        }
        // if create, house details will be null
        else {
          response = await housingApiServices.createHouse(this.houseDetail);
        }

        if (response.status === 201 || response.status === 204) {
          let houseId;
          if (response && response.data.id) {
            houseId = response.data.id;
          } else if (this.isEditMode) {
            houseId = this.houseDetail.id;
          }
          if (this.selectedFile) {
            response = await housingApiServices.uploadHouseImage(
              houseId,
              this.selectedFile
            );

            if (response.status !== 200 && response.status !== 204) {
              window.alert("Image upload failed with status:", response.status);
              return;
            }
          }
          this.clearState();
          //reload houses page
          if (houseId) {
            this.$router.push({
              name: "HouseDetails",
              params: { id: houseId },
            });
          } else {
            this.$router.push({ name: "Houses" });
          }
        } else {
          window.alert("Error uploading housing detail!!");
        }
      } catch (error) {
        window.alert(
          `Saving Hosing details failed : ${error.message}, Please try again!!`
        );
      }
    },

    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        this.selectedFile = file;

        reader.onload = (e) => {
          this.houseDetail.image = e.target.result;
          this.isImageSelected = true;
        };
        reader.readAsDataURL(file);
        this.selectedFile = event.target.files[0];
      }
    },

    clearImage() {
      this.houseDetail.image = null;
      this.isImageSelected = false;
      this.selectedFile = null;

      // this is set to clear uploaded image, so that same image can be uploaded
      this.$refs.fileInput.value = "";
    },

    clearState() {
      const houseStore = useHouseStore();
      houseStore.clearListing();
    },
  },
};

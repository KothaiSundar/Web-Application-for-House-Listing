import axios from "axios";

// Set up the base URL and API key from environment variables
// const API_BASE_URL = process.env.HOUSING_APP_API_BASE_URL;
// const API_KEY = process.env.HOUSING_APP_API_KEY;
const API_BASE_URL = "https://api.intern.d-tt.nl/api/houses";
const API_KEY = "ji1kyAep4Ubh2EZ5HOn7auSPIR_rLKD-";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "X-Api-Key": API_KEY,
    "Content-Type": "application/json",
  },
});

export default {
  async createHouse(listing) {
    try {
      const formData = new FormData();
      formData.append("price", listing.price);
      formData.append("bedrooms", listing.rooms.bedrooms);
      formData.append("bathrooms", listing.rooms.bathrooms);
      formData.append("size", listing.size);
      formData.append("streetName", listing.location.street);
      formData.append("houseNumber", listing.location.houseNumber);
      formData.append("numberAddition", listing.location.houseNumberAddition);
      formData.append("zip", listing.location.zip);
      formData.append("city", listing.location.city);
      formData.append("constructionYear", listing.constructionYear);
      formData.append("hasGarage", listing.hasGarage);
      formData.append("description", listing.description);

      const response = await apiClient.post("", formData);

      return response;
    } catch (error) {
      throw error;
    }
  },
  async editHouse(houseId, listing) {
    const formData = new FormData();
    formData.append("price", listing.price);
    formData.append("bedrooms", listing.rooms.bedrooms);
    formData.append("bathrooms", listing.rooms.bathrooms);
    formData.append("size", listing.size);
    formData.append("streetName", listing.location.street);
    formData.append("houseNumber", listing.location.houseNumber);
    formData.append("numberAddition", listing.location.houseNumberAddition);
    formData.append("zip", listing.location.zip);
    formData.append("city", listing.location.city);
    formData.append("constructionYear", listing.constructionYear);
    formData.append("hasGarage", listing.hasGarage);
    formData.append("description", listing.description);

    const response = await apiClient.post(`/${houseId}`, formData);
    return response;
  },

  async deleteHouse(houseId) {
    const response = await apiClient.delete(`/${houseId}`);

    return response;
  },

  async uploadHouseImage(houseId, imageFile) {
    try {
      const formData = new FormData();
      formData.append("image", imageFile);

      const response = await apiClient.post(`/${houseId}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  async getHouseById(houseId) {
    try {
      const response = await apiClient.get(`/${houseId}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  async getAllHouses() {
    try {
      const response = await apiClient.get("");
      return response;
    } catch (error) {
      throw error;
    }
  },
};

import axios from "axios";

const API_BASE_URL = "https://api.intern.d-tt.nl/api/houses";
// this has to be read from secret via properties file
const API_KEY = "ji1kyAep4Ubh2EZ5HOn7auSPIR_rLKD-";
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "X-Api-Key": API_KEY,
    "Content-Type": "application/json",
  },
});

function createHouseFormData(listing) {
  const formData = new FormData();
  formData.append("price", listing.price);
  formData.append("bedrooms", listing.rooms.bedrooms);
  formData.append("bathrooms", listing.rooms.bathrooms);
  formData.append("size", listing.size);
  formData.append("streetName", listing.location.street);
  formData.append("houseNumber", listing.location.houseNumber);
  formData.append(
    "numberAddition",
    listing.location.houseNumberAddition
      ? listing.location.houseNumberAddition
      : ""
  );
  formData.append("zip", listing.location.zip);
  formData.append("city", listing.location.city);
  formData.append("constructionYear", listing.constructionYear);
  formData.append("hasGarage", listing.hasGarage);
  formData.append("description", listing.description);

  return formData;
}

function logError(description, error) {
  const header = error?.response?.headers;
  const params = [`Error: ${description}`];
  if (header) {
    params.push(`Header: ${header}`);
  }
  console.error(...params, error);
}

async function handleApiCall(apiCall, errorMsg) {
  try {
    const response = await apiCall();
    return response;
  } catch (error) {
    logError(errorMsg, error);
    throw new Error(errorMsg);
  }
}

export default {
  async createHouse(listing) {
    const errorMsg =
      "Unable to create house at the moment. Please try after sometime!!";
    const formData = createHouseFormData(listing);
    return handleApiCall(() => apiClient.post("", formData), errorMsg);
  },

  async editHouse(houseId, listing) {
    const errorMsg = `Unable to edit the house: ${houseId} at the moment. Please try after sometime!!`;
    const formData = createHouseFormData(listing);
    return handleApiCall(
      () => apiClient.post(`/${houseId}`, formData),
      errorMsg
    );
  },

  async deleteHouse(houseId) {
    const errorMsg = `Unable to delete the house: ${houseId} at the moment. Please try after sometime!!`;
    return handleApiCall(() => apiClient.delete(`/${houseId}`), errorMsg);
  },

  async uploadHouseImage(houseId, imageFile) {
    const formData = new FormData();
    formData.append("image", imageFile);
    const errorMsg = `Unable to upload image for the house: ${houseId} at the moment. Please try after sometime!!`;

    return handleApiCall(
      () =>
        apiClient.post(`/${houseId}/upload`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }),
      errorMsg
    );
  },

  async getHouseById(houseId) {
    const errorMsg = `Unable to get house details for: ${houseId} at the moment. Please try after sometime!!`;
    return handleApiCall(() => apiClient.get(`/${houseId}`), errorMsg);
  },

  async getAllHouses() {
    return handleApiCall(
      () => apiClient.get(""),
      "Unable to fetch house listing at the moment. Please try after sometime!!"
    );
  },
};

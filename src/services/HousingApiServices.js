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
  async getHouseRecommendations(houseId) {
    //fetches randome 3 houses as recommendataions but can do other options like  pick housese from same city as input houseId etc..
    try {
      // Call the existing method to get all houses
      const allHousesResponse = await this.getAllHouses();

      // Check if the response is valid and has data
      if (allHousesResponse && allHousesResponse.data) {
        // Filter out the house with the given houseId
        const filteredHouses = allHousesResponse.data.filter(
          (house) => house.id !== houseId
        );

        // Shuffle the array of filtered houses
        const shuffledHouses = filteredHouses.sort(() => 0.5 - Math.random());

        // Get the first 3 houses from the shuffled array
        const recommendedHouses = shuffledHouses.slice(0, 3);

        return recommendedHouses;
      } else {
        // Handle the case where no houses are returned or there's an invalid response
        return [];
      }
    } catch (error) {
      console.error("Error fetching house recommendations:", error);
      throw new Error(
        "Unable to fetch house recommendations at the moment. Please try again later."
      );
    }
  },
};

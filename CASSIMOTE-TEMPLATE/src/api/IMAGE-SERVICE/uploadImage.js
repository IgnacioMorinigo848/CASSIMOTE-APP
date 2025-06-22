import axios from "axios";
import Constants from 'expo-constants';

const API_URL = Constants.expoConfig.extra.EXPO_API_URL_IMAGE;

const uploadImage = async (base64Image) => {
  try {
    const query = `
      mutation uploadImage($base64Image: String!) {
        uploadImage(base64Image: $base64Image) {
          url
        }
      }
    `;

    const variables = { base64Image };

    const response = await axios.post(
      API_URL,
      {
        query,
        variables
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const url = response.data.data.uploadImage.url;
    return { url };
  } catch (error) {
    throw new Error(error.message);
  }
};

export default uploadImage;

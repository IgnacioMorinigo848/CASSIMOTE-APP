import axios from "axios";
import Constants from 'expo-constants';

const API_URL = Constants.expoConfig.extra.EXPO_API_URL_IMAGE;

const uploadImage = async (base64Image) => {
  try {
    const query = `
      mutation UploadImage($base64Image: String!) {
        uploadImageBase64(base64Image: $base64Image) {
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

    const url = response.data.data.uploadImageBase64.url;
    return { url };
  } catch (error) {
    throw new Error(error.message);
  }
};

export default uploadImage;

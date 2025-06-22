import axios from "axios";
import Constants from 'expo-constants';

const API_URL = Constants.expoConfig.extra.EXPO_API_URL;

const updateProfile = async (token, newUrl) => {
  try {
    const response = await axios.post(
      API_URL,
      {
        query: `
          mutation($url: String!) {
            updateProfile(url: $url) {
              success
              message
              url
            }
          }
        `,
        variables: { url: newUrl }
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      }
    );

    const oldUrl = response.data.data.updateProfile.url;
    return { oldUrl };
  } catch (error) {
    throw new Error(error.message);
  }
};

export default updateProfile;

import axios from 'axios';
import Constants from 'expo-constants';

const API_URL = Constants.expoConfig.extra.EXPO_API_URL_RECIPE;

const updateInterests = async (token, interests) => {
  const mutation = `
    mutation UpdateInterests($interests: interestsInput!) {
      updateInterests(interests: $interests) {
        success
        message
      }
    }
  `;

  try {
    const response = await axios.post(
      API_URL,
      {
        query: mutation,
        variables: { interests }
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      }
    );

    const result = response.data.data.updateInterests;
    console.log(result)
    return result;

  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.errors?.[0]?.message || error.message
    };
  }
};

export default updateInterests;

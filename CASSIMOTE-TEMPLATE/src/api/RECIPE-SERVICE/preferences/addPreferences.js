import axios from 'axios';
import Constants from 'expo-constants';

const API_URL = Constants.expoConfig.extra.EXPO_API_URL_RECIPE;

const AddInterest = async (nickName, interests) => {
  const mutation = `
    mutation AddInterest($nickName: String!, $interests: interestsInput!) {
      addInterests(nickName: $nickName, interests: $interests) {
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
        variables: {
          nickName,
          interests
        }
      },
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );

    const result = response.data.data.addInterests;
    console.log("desde llamado",result)
    return result;

  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.errors?.[0]?.message || error.message
    };
  }
};

export default AddInterest;

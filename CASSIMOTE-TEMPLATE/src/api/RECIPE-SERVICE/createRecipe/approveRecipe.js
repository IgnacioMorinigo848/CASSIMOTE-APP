import axios from 'axios';
import Constants from 'expo-constants';

const API_URL = Constants.expoConfig.extra.EXPO_API_URL_RECIPE;

const approveRecipe = async (token, id, accept) => {
  const mutation = `
    mutation ApproveRecipe($id: String!, $accept: Boolean!) {
      approveRecipes(id: $id, accept: $accept) {
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
        variables: { id, accept }
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      }
    );

    const result = response.data.data.approveRecipes;
    return result;

  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.errors?.[0]?.message || error.message
    };
  }
};

export default approveRecipe;

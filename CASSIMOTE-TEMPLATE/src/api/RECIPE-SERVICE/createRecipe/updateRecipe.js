import axios from 'axios';
import Constants from 'expo-constants';

const API_URL = Constants.expoConfig.extra.EXPO_API_URL_RECIPE;

const updateRecipe = async (updatedRecipe,token) => {
  const mutation = `
    mutation UpdateRecipe($recipe: UpdateRecipeInput!) {
      UpdateRecipe(recipe: $recipe) {
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
        variables: { recipe: updatedRecipe }
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      }
    );

    const result = response.data.data.UpdateRecipe;
    console.log("respuesta",result)
    return result;

  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.errors?.[0]?.message || error.message
    };
  }
};

export default updateRecipe;

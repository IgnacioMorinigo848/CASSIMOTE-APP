import axios from 'axios';
import Constants from 'expo-constants';

const API_URL = Constants.expoConfig.extra.EXPO_API_URL_RECIPE;

const loadRecipe = async (recipeData, option = "CREATE", token) => {
  console.log("recibido", recipeData)
  const query = `
    mutation LoadRecipe($recipe: recipeInput!, $option: String!) {
      loadRecipe(recipe: $recipe, option: $option) {
        success
        message
      }
    }
  `;

  const variables = {
    recipe: recipeData,
    option: option
  };

  try {
    const response = await axios.post(API_URL, {
      query,
      variables
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (response.data.errors) {
      console.error('Errores de GraphQL:', response.data.errors);
      throw new Error(response.data.errors.map(e => e.message).join(', '));
    }

    return response.data.data.loadRecipe;
  } catch (error) {
    console.error('Error al cargar la receta:', error.response?.data || error.message);
    throw error;
  }
};

export default loadRecipe;

import axios from 'axios';
import Constants from 'expo-constants';

const API_URL = Constants.expoConfig.extra.EXPO_API_URL_RECIPE;

const addRecipeToList = async (token, recipe) => {
  const query = `
    mutation addRecipeToList ($recipe:recipeListInput!) {
      addRecipeToList(recipe: $recipe) {
        success
        message
      }
    }
  `;

  try {
    const response = await axios.post(
      API_URL,
      { query, variables: { recipe } },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data.data.addRecipeToList)
    return response.data.data.addRecipeToList;
  } catch (err) {
    console.error("ERROR en addRecipeToList:", err.message);
    return { success: false, message: "Ocurrió un error al cargar los datos." };
  }
};

export default addRecipeToList;

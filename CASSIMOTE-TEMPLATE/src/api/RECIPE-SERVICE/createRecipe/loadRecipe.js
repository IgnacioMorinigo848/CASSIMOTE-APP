import axios from 'axios';
import Constants from 'expo-constants';

const API_URL = Constants.expoConfig.extra.EXPO_API_URL_RECIPE;

const loadRecipe = async (recipeData, option = "CREATE", token) => {
  const recipeInput = {
    name: recipeData?.name?.trim(),
    nickName: recipeData?.nickName?.trim(),
    image: recipeData.image,
    description: recipeData?.description?.trim(),
    portions: recipeData.portions,
    ingredients: recipeData.ingredients?.map(item => ({
      name: item.name.trim(),
      quantity: item.quantity,
      unit: item.unit.trim()
    })) || [],
    steps: recipeData.steps?.map(step => ({ description: (step.description || step).trim() })) || [],
    difficulty: recipeData.difficulty?.trim(),
    time: recipeData.time,
    typeOfDiet: recipeData.typeOfDiet?.trim(),
    typeOfDish: recipeData.typeOfDish?.trim()
  };

  const query = `
    mutation LoadRecipe($recipe: recipeInput!, $option: String!) {
      loadRecipe(recipe: $recipe, option: $option) {
        success
        message
      }
    }
  `;

  const variables = {
    recipe: recipeInput,
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

import axios from 'axios';
import Constants from 'expo-constants';

const API_URL = Constants.expoConfig.extra.EXPO_API_URL_RECIPE;

const deleteRecipe = async (id, token) => {
  const query = `
    mutation deleteRecipe($id: String!) {
      deleteRecipe(id: $id) {
        __typename
        ... on recipeErrorMessage {
          success
          message
        }
      }
    }
  `;

  try {
    const response = await axios.post(
      API_URL,
      {
        query,
        variables: { id },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const result = response.data.data.deleteRecipe;

    if (!result) {
      return { success: false, message: 'No hay respuesta del servidor' };
    }

    if (result.__typename === 'recipeErrorMessage') {
      return {
        success: result.success,
        message: result.message,
      };
    }

    return {
      success: false,
      message: 'Respuesta inesperada del servidor',
    };

  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.errors?.[0]?.message || error.message,
    };
  }
};

export default deleteRecipe;

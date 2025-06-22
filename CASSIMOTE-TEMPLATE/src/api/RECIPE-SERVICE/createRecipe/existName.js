import axios from 'axios';
import Constants from 'expo-constants';

const API_URL = Constants.expoConfig.extra.EXPO_API_URL_RECIPE;

const existName = async (name, token) => {
  const query = `
    query existRecipeByName($name: String!) {
      existRecipeByName(name: $name) {
        __typename
        ... on recipeExist {
          success
          message
          recipe {
            name
            nickName
            image
            description
            ingredients {
              name
              quantity
              unit
            }
            steps {
              description
            }
            typeOfDish
            difficulty
            typeOfDiet
            portions
            time
          }
        }
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
        variables: { name },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const result = response.data.data.existRecipeByName;

    if (!result) {
      return { success: false, message: 'No hay respuesta del servidor' };
    }

    // En GraphQL con union, el tipo viene en __typename para diferenciar
    if (result.__typename === 'recipeExist') {
      return {
        success: result.success,
        message: result.message,
        recipe: result.recipe,
      };
    }

    if (result.__typename === 'recipeErrorMessage') {
      return {
        success: false,
        message: result.message,
      };
    }

    return {
      success: false,
      message: 'Respuesta inesperada',
    };

  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.errors?.[0]?.message || error.message,
    };
  }
};

export default existName;

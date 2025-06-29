import axios from 'axios';
import Constants from 'expo-constants';

const API_URL = Constants.expoConfig.extra.EXPO_API_URL_RECIPE;

const searchByName = async (token, searchText) => {
  const query = `
    query($searchText: String!) {
      searchByName(searchText: $searchText) {
        __typename
        ... on searchRecipe {
          success
          recipes {
            _id
            nickName
            name
            image
            description
            numberOfStart
            creationDate
          }
          recipeMessage: message
        }
        ... on recipeErrorMessage {
          success
          errorMessage: message
        }
      }
    }
  `;

  try {
    const response = await axios.post(
      API_URL,
      { query, variables: { searchText } },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const result = response.data.data.searchByName;

    if (result.__typename === 'searchRecipe') {
      return {
        success: result.success,
        message: result.message1,
        recipes: result.recipes,
      };
    }

    return {
      success: false,
      message: result.message2,
    };

  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.errors?.[0]?.message || error.message,
    };
  }
};

export default searchByName;

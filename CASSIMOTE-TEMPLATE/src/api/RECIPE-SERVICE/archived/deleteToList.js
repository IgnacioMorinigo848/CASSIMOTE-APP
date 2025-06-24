import axios from 'axios';
import Constants from 'expo-constants';

const API_URL = Constants.expoConfig.extra.EXPO_API_URL_RECIPE;

const deleteToList = async (token, id) => {
  const query = `
    mutation deleteRecipeFromList($id:String!) {
      deleteRecipeFromList(id:$id) {
        success
        message
      }
    }
  `;

  try {
    const response = await axios.post(
      API_URL,
      { query, variables: { id} },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data.data.deleteRecipeFromList)
    return response.data.data.deleteRecipeFromList;
  } catch (err) {
    console.error("ERROR en deleteRecipeFromList:", err.message);
    return { success: false, message: "Ocurrió un error al cargar los datos." };
  }
};

export default deleteToList;

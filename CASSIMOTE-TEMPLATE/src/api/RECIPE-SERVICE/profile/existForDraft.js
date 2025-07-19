import axios from 'axios';
import Constants from 'expo-constants';

const API_URL = Constants.expoConfig.extra.EXPO_API_URL_RECIPE;

const existForDraft = async (token, name) => {
  const query = `
    query existForDraft($name: String!) {
      existForDraft(name: $name) {
        success
        message
      }
    }
  `;

  try {
    const response = await axios.post(
      API_URL,
      { query, variables: { name } },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data.data.existForDraft);
    return response.data.data.existForDraft;
  } catch (err) {
    console.error("ERROR en existForDraft:", err.message);
    return { success: false, message: "Ocurrió un error al verificar el nombre del borrador." };
  }
};

export default existForDraft;

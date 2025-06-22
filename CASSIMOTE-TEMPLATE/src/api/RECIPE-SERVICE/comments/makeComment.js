import axios from 'axios';
import Constants from 'expo-constants';

const API_URL = Constants.expoConfig.extra.EXPO_API_URL_RECIPE;

const makeComment = async (token, id,stars, description) => {
  const mutation = `
    mutation ($id: String!, $stars: Int!, $description: String!) {
      makeAVote(id: $id, stars: $stars, description: $description) {
        success
        message
      }
    }
  `;

  const variables = { id, stars, description };

  try {
    const response = await axios.post(
      API_URL,
      { query: mutation, variables },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const result = response.data.data.makeAVote;
    if (!result.success) throw new Error(result.message || 'Error desconocido');
    return result;
  } catch (err) {
    console.error('Error en makeComment:', err.message);
    throw err;
  }
};

export default makeComment;

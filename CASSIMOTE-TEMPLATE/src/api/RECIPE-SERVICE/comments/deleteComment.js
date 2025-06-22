import axios from 'axios';
import Constants from 'expo-constants';

const API_URL = Constants.expoConfig.extra.EXPO_API_URL_RECIPE;

const useDeleteComment = async (token, id) => {
  const mutation = `
    mutation ($id: String!) {
      deleteVote(id: $id) {
        success
        message
      }
    }
  `;

  const variables = { id};

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

    const result = response.data.data.deleteVote;
    if (!result.success) throw new Error(result.message || 'Error desconocido');
    return result;
  } catch (err) {
    console.error('Error en deleteComment:', err.message);
    throw err;
  }
};

export default useDeleteComment;

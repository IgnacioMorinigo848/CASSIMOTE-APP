import axios from 'axios';
import Constants from 'expo-constants';

const API_URL = Constants.expoConfig.extra.EXPO_API_URL_RECIPE;

const approveComment = async (token, id,accept) => {
  const mutation = `
    mutation ($id: String!, $accept: Boolean!) {
      approveVotes(id: $id, accept: $accept) {
        success
        message
      }
    }
  `;

  const variables = { id, accept};

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

    const result = response.data.data.approveVotes;
    if (!result.success) throw new Error(result.message || 'Error desconocido');
    return result;
  } catch (err) {
    console.error('Error en approveVotes:', err.message);
    throw err;
  }
};

export default approveComment;

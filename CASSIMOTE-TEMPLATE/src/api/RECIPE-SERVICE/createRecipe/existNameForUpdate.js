import axios from 'axios';
import Constants from 'expo-constants';

const API_URL = Constants.expoConfig.extra.EXPO_API_URL_RECIPE;

const existNameForUpdate = async (id, name, token) => {
  const query = `
    query existNameForUpdate($id: String, $name: String!) {
      existNameForUpdate(id: $id, name: $name) {
        success
        message
      }
    }
  `;

  try {
    const response = await axios.post(
      API_URL,
      {
        query,
        variables: { id, name }
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      }
    );

    const result = response.data.data.existNameForUpdate;

    return {
      success: result.success,
      message: result.message
    };

  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.errors?.[0]?.message || error.message
    };
  }
};

export default existNameForUpdate;

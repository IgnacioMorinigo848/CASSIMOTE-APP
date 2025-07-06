import axios from 'axios';
import Constants from 'expo-constants';

const API_URL = Constants.expoConfig.extra.EXPO_API_URL;

const releaseAccount = async (email) => {
  const mutation = `
    mutation releaseAccount($email: String!) {
      releaseAccount(email: $email) {
        success
        message
      }
    }
  `;

  try {
    const response = await axios.post(
      API_URL,
      {
        query: mutation,
        variables: { email }
      },
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );

    const result = response.data.data.releaseAccount;
    console.log(result)
    return result;

  } catch (error) {
    return {
      success: false,
      message: error.message
    };
  }
};

export default releaseAccount;

import { useState } from 'react';
import axios from 'axios';

import Constants from 'expo-constants';

const API_URL = Constants.expoConfig.extra.EXPO_API_URL_RECIPE;

const useCalculatePortions = (id,p) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const calculate = async (token, id, portion) => {
    try {
      setLoading(true);
      setError(null);
      setResult(null);

      const response = await axios.post(
        API_URL,
        {
          query: `
            mutation calculatePortions($id: String!, $portion: Innt!) {
              calculatePortions(id: $id, portion: $portion) {
                __typename
                ... on portions {
                  success
                  portion
                  ingredients {
                    name
                    quantity
                    unit
                  }
                }
                ... on recipeErrorMessage {
                success
                  message
                }
              }
            }
          `,
          variables: { id, portion },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const data = response.data.data.calculatePortions;
      setResult(data);
      return data;

    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { calculate, loading, error, result };
};

export default useCalculatePortions;

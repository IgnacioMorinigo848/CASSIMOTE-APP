import { useEffect, useState } from 'react';
import axios from 'axios';
import Constants from 'expo-constants';

const API_URL = Constants.expoConfig.extra.EXPO_API_URL_RECIPE;

export default function useShowRecipeNotApproved(token) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) return;

    const fetchRecipes = async () => {
      const query = `
        query showRecipeNotApproved {
          showRecipeNotApproved {
            ... on recipeList {
              success
              recipes {
                _id
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
                numberOfStart
                portions
                time
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
          { query },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        const result = response.data.data.showRecipeNotApproved;
        setData(result);
      } catch (err) {
        setError(err.response?.data?.errors?.[0]?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [token]);

  return { data, loading, error };
}

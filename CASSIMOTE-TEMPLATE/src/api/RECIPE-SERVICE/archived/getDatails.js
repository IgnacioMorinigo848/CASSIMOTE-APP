import { useState, useEffect } from 'react';
import axios from 'axios';
import Constants from 'expo-constants';

const API_URL = Constants.expoConfig.extra.EXPO_API_URL_RECIPE;

const useGetDetails = (token, id) => {
    console.log(token, "  ",id)
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const query = `
          query ($id: String!) {
            showRecipeDetailsFromList(id: $id) {
              ... on showDetails {
                success
                recipe {
                  recipeId
                  name
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
              }
              ... on recipeErrorMessage {
                success
                message
              }
            }
          }
        `;

        const response = await axios.post(
          API_URL,
          { query, variables: { id} },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        const result = response.data.data.showRecipeDetailsFromList;
        if (result.success && result.recipe) {
          setData(result.recipe);
        } else {
          setError(result.message || 'Error desconocido al obtener la receta.');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDetails();
    }
  }, [id]);

  return { data, loading, error };
};

export default useGetDetails;

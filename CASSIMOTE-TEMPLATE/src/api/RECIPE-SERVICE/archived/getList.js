import { useState, useEffect } from 'react';
import axios from 'axios';
import Constants from 'expo-constants';

const API_URL = Constants.expoConfig.extra.EXPO_API_URL_RECIPE;

const useGetList = (token) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    const fetchData = async () => {
      const query = `
        query getRecipeFromList {
          getRecipeFromList{
            ... on getRecipesByUser {
              success
              recipes {
                recipeId
                nickName
                name
                image
                description
                numberOfStart
              }
            }
            ... on recipeErrorMessage {
              success
              message
            }
          }
        }
      `;

      try {
        const response = await axios.post(
          API_URL,
          {
            query,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        );

        const result = response.data.data.getRecipeFromList;
        console.log("archivos   :",result)
        setData(result);
      } catch (err) {
        console.error("Error al obtener recetas por usuario:", err.message);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  return { data, loading, error };
};

export default useGetList;

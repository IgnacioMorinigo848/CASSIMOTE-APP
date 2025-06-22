import { useState, useEffect } from 'react';
import axios from 'axios';
import Constants from 'expo-constants';

const API_URL = Constants.expoConfig.extra.EXPO_API_URL_RECIPE;

const useProfileData = (token) => {
  const [data, setData] = useState(null);
  const [isSuccess, setIsSuccess] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const query = `
    query {
  getRecipesByUser {
    __typename
    ... on getRecipesByUser {
      success
      recipes {
        _id
        name
        image
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

  useEffect(() => {
    if (!token) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.post(
          API_URL,
          { query },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const profileData = response.data.data.getRecipesByUser;
        console.log(profileData)
        switch (profileData.__typename) {
          case 'getRecipesByUser':
            setData(profileData.recipes);
            setError(null);
            setIsSuccess(true);
            break;

          case 'recipeErrorMessage':
            setError(profileData.message);
            setData(null);
            setIsSuccess(false);
            break;

          default:
            throw new Error('Respuesta inesperada del servidor');
        }
      } catch (err) {
        console.error("ERROR en fetchData:", err.message);
        setError("Ocurrió un error al cargar los datos.");
        setData(null);
        setIsSuccess(false);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  return { data, isSuccess, loading, error };
};

export default useProfileData;

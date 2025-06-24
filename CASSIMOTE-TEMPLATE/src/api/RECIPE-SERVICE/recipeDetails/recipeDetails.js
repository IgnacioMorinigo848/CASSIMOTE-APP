import { useState, useEffect } from 'react';
import axios from 'axios';
import Constants from 'expo-constants';

const API_URL = Constants.expoConfig.extra.EXPO_API_URL_RECIPE;

const useRecipeDetails = (token,id) => {
  const [data, setData] = useState(null);
  const [isSuccess, setIsSuccess] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const query = `
 query ($id: String!) {
  showRecipeDetails(id: $id) {
    __typename
    ... on showDetails {
      success
      recipe {
        _id
        nickName
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
        approved
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
      const variables = {id};
      try {
        const response = await axios.post(
          API_URL,
          { query,variables},
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const showRecipeDetails = response.data.data.showRecipeDetails;
        console.log(showRecipeDetails)
        switch (showRecipeDetails.__typename) {
          case 'showDetails':
            setData(showRecipeDetails.recipe);
            setError(null);
            setIsSuccess(true);
            break;

          case 'recipeErrorMessage':
            setError(showRecipeDetails.message);
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

  return { data, loading, error };
};

export default useRecipeDetails;

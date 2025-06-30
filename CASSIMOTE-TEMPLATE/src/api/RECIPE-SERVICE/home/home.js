import { useState, useEffect } from 'react';
import axios from 'axios';
import Constants from 'expo-constants';

const API_URL = Constants.expoConfig.extra.EXPO_API_URL_RECIPE;

const useHomeData = (token) => {
  const [data, setData] = useState(null);
  const [isSuccess, setIsSuccess] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 const query = `
  query {
    home {
      ... on homeMessageSuccess {
        lastThreeRecipes {
          success
          title
          recipes {
            _id
            image
          }
          message
        }
        ability {
          success
          title
          recipe {
            _id
            image
          }
          message
        }
        diet {
          success
          title
          recipe {
            _id
            image
          }
          message
        }
        timeSpent {
          success
          title
          recipe {
            _id
            image
          }
          message
        }
      }
      ... on errorHomeMessage {
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
        const homeData = response.data.data.home;
        setIsSuccess(homeData);
        setData(homeData);
       
      } catch (err) {
        setError("Ocurrió un error al cargar los datos.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);
  
  return { data, isSuccess, loading, error };
};

export default useHomeData;

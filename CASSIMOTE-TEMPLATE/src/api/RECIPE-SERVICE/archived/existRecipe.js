import { useState, useEffect } from 'react';
import axios from 'axios';
import Constants from 'expo-constants';

const API_URL = Constants.expoConfig.extra.EXPO_API_URL_RECIPE;

const useExistInList = (token,id) => {
  const [dataList, setDataList] = useState(null);
  const [isSuccess, setIsSuccess] = useState(null);
  const [loadingList, setLoadingList] = useState(true);
  const [errorList, setErrorList] = useState(null);

  const query = `
    query ($id:String!){
    existRecipeInList(id:$id){
        success
        message
        }
    }
`;

  useEffect(() => {
    if (!token) return;

    const fetchData = async () => {
      setLoadingList(true);
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

        const existInList = response.data.data.existRecipeInList;
        console.log(existInList)
        setDataList(existInList);
      } catch (err) {
        console.error("ERROR en fetchData:", err.message);
        setErrorList("Ocurrió un error al cargar los datos.");
        setDataList(null);
        setIsSuccess(false);
      } finally {
        setLoadingList(false);
      }
    };

    fetchData();
  }, [token]);

  return { dataList, isSuccess, loadingList, errorList };
};

export default useExistInList;

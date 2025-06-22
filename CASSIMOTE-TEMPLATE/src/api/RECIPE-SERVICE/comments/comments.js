import { useState, useEffect } from 'react';
import axios from 'axios';
import Constants from 'expo-constants';

const API_URL = Constants.expoConfig.extra.EXPO_API_URL_RECIPE;

const useComments = (token,id) => {
  const [dataComment, setDataComment] = useState(null);
  const [isSuccess, setIsSuccess] = useState(null);
  const [loadingComment, setLoadingComment] = useState(true);
  const [errorComment, setErrorComment] = useState(null);

  const query = `
    query ($id:String!){
    showVotes(id:$id){
        __typename
        ... on listVote{
            success
            userHasVoted
            votes{
                _id
                nickName
                stars
                description
                date
            }
        }
        ... on voteErrorMessage{
            success
            message
        }
    }
    }
`;

  useEffect(() => {
    if (!token) return;

    const fetchData = async () => {
      setLoadingComment(true);
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

        const showVotes = response.data.data.showVotes;
        console.log(showVotes)
        switch (showVotes.__typename) {
          case 'listVote':
            setDataComment(showVotes);
            setErrorComment(null);
            setIsSuccess(true);
            break;

          case 'voteErrorMessage':
            setErrorComment(showVotes);
            setDataComment(showVotes);
            setIsSuccess(false);
            break;

          default:
            throw new Error('Respuesta inesperada del servidor');
        }
      } catch (err) {
        console.error("ERROR en fetchData:", err.message);
        setErrorComment("Ocurrió un error al cargar los datos.");
        setDataComment(null);
        setIsSuccess(false);
      } finally {
        setLoadingComment(false);
      }
    };

    fetchData();
  }, [token]);

  return { dataComment, isSuccess, loadingComment, errorComment };
};

export default useComments;

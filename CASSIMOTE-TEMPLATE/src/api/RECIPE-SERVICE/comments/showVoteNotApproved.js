import { useEffect, useState } from 'react';
import axios from 'axios';
import Constants from 'expo-constants';

const API_URL = Constants.expoConfig.extra.EXPO_API_URL_RECIPE;

export default function useShowVoteNotApproved(token) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) return;

    const fetchVotes = async () => {
      const query = `
        query showVoteNotApproved {
          showVoteNotApproved {
            ... on listVote {
              success
              votes {
                _id
                nickName
                stars
                description
                date
              }
            }
            ... on voteErrorMessage {
              success
              message
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
        const result = response.data.data.showVoteNotApproved;
        setData(result);
      } catch (err) {
        setError(err.response?.data?.errors?.[0]?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVotes();
  }, [token]);

  return { data, loading, error };
}

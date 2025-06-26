// hooks/USER-SERVICE/signUp/useNicknameSuggestions.js
import { useState } from "react";
import axios from "axios";
import Constants from "expo-constants";

const API_URL = Constants.expoConfig.extra.EXPO_API_URL;

export const useNicknameSuggestions = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [errorSuggestions, setErrorSuggestions] = useState(null);

  const fetchSuggestions = async (nickName) => {
    setLoadingSuggestions(true);
    setErrorSuggestions(null);

    const query = `
      query GetSuggestions($nickName: String!) {
        nicknameSuggestions(nickName: $nickName) {
          success
          suggestions
          message
        }
      }
    `;

    const variables = { nickName };

    try {
      const response = await axios.post(API_URL, { query, variables }, {
        headers: { 'Content-Type': 'application/json' }
      });

      const data = response.data;
      if (data.errors) {
        throw new Error(data.errors[0]?.message || "Error del servidor");
      }

      const result = data.data.nicknameSuggestions;
      if (result.success) {
        setSuggestions(result.suggestions || []);
      } else {
        setSuggestions([]);
        setErrorSuggestions(result.message || "No se pudieron obtener sugerencias");
      }

    } catch (err) {
      setSuggestions([]);
      setErrorSuggestions(err.message || "Error de red");
    } finally {
      setLoadingSuggestions(false);
    }
  };

  return {
    suggestions,
    loadingSuggestions,
    errorSuggestions,
    fetchSuggestions,
  };
};

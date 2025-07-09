import { useState, useEffect } from 'react';
import axios from 'axios';
import Constants from 'expo-constants';
import questions from '../../../utils/onboarding/questionScript'; 

const API_URL = Constants.expoConfig.extra.EXPO_API_URL_RECIPE;

const useUserInterests = (token) => {
  const [questionsWithUserData, setQuestionsWithUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const query = `
    query {
      getInterests {
        success
        message
        interests {
          ability
          typeOfDish
          diet
          intolerances
          timeSpent {
            initial
            end
          }
        }
      }
    }
  `;

  const compareTimeObjects = (optionValue, backendValue) => {
    return (
      optionValue?.tiempoMin === backendValue?.initial &&
      optionValue?.tiempoMax === backendValue?.end
    );
  };

  useEffect(() => {
    if (!token) return;

    const fetchUserPreferences = async () => {
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

        const result = response.data.data.getInterests;
        const interests = result?.interests || {};

        const mappedQuestions = questions.map((question) => {
          let backendValue = null;

          switch (question.label) {
            case "Habilidad en la Cocina":
              backendValue = interests.ability || null;
              break;
            case "Tipo de Plato":
              backendValue = interests.typeOfDish || null;
              break;
            case "Tipo de Dieta":
              backendValue = interests.diet || null;
              break;
            case "Alergia":
              backendValue = interests.intolerances || null;
              break;
            case "Tiempo en la Cocina":
              backendValue = interests.timeSpent || null;
              break;
            default:
              backendValue = null;
          }

          let selectedValue = null;

          const matchedOption = question.options.find((opt) => {
            if (
              typeof backendValue === 'object' &&
              opt.value?.tiempoMin !== undefined
            ) {
              return compareTimeObjects(opt.value, backendValue);
            }
            return opt.value === backendValue;
          });

          let options = [...question.options];

          if (matchedOption) {
            selectedValue = matchedOption.value;
          } else if (backendValue) {
            const customLabel =
              typeof backendValue === 'object'
                ? `Personalizado (${backendValue.initial} - ${backendValue.end ?? '∞'} min)`
                : backendValue;

            const customOption = {
              label: customLabel,
              value: backendValue,
            };

            options.push(customOption);
            selectedValue = backendValue;
          }

          return {
            ...question,
            options,
            selectedValue,
          };
        });

        setQuestionsWithUserData(mappedQuestions);
      } catch (err) {
        console.error(err);
        setError("Error al cargar las preferencias del usuario.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserPreferences();
  }, [token]);

  return { questions: questionsWithUserData, loading, error };
};

export default useUserInterests;

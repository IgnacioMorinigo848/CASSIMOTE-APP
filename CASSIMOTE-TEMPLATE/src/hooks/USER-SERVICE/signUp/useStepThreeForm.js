// hooks/forms/useStepThreeForm.js
import { useState, useEffect,useContext } from "react";
import { stepThree } from "../../../api/USER-SERVICE/signUp/signUp"; // Ajustá el path según tu estructura
import { AuthContext } from "../../../context/AuthContext";

export const useStepThreeForm = (navigation) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const { token } = useContext(AuthContext);

  const validate = () => {
    const newError = {};
    if (password.length < 8) {
      newError.password = "Contraseña inválida. Debe tener al menos 6 caracteres.";
    }
    setError(newError);
    return Object.keys(newError).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setLoading(true);
    try {
      setLoading(true)
      const result = await stepThree(password,token);
      setLoading(false);

      if (result?.success) {
        navigation.navigate("signIn");
      } else {
        setError({ general: result?.message || "Error desconocido." });
      }
    } catch (e) {
      setLoading(false);
      setError({ general: e.message || "Error de red." });
    }
  };

  useEffect(() => {
    if (error.password || error.general) {
      setError(prev => ({ ...prev, password: undefined, general: undefined }));
    }
  }, [password]);

  return {
    password,
    setPassword,
    error,
    loading,
    handleSubmit,
  };
};

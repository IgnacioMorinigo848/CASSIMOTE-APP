// hooks/forms/useStepTwoForm.js
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { validateCodeAPI } from "../../../api/USER-SERVICE/auth/validateCode";

export const validateCode = (navigation) => {
  const [code, setCode] = useState("");
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const { setToken,token } = useContext(AuthContext);

  const validate = () => {
    const newError = {};
    if (code.trim().length === 0 || code.length > 6) {
      newError.code = "El código es inválido, volvé a intentarlo con el mismo código o solicita uno nuevo.";
    }
    setError(newError);
    return Object.keys(newError).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setLoading(true);
    try {
        setLoading(true)
      const result = await validateCodeAPI(code,token);
      setLoading(false);

      if (result?.type === "token") {
        setToken(result.token);
        navigation.navigate("stepThree");
      } else if (result?.type === "success") {
        setError({ general: result.message });
      } else {
        setError({ general: result?.message || "Error desconocido." });
      }
    } catch (e) {
      setLoading(false);
      setError({ general: e.message || "Error de red." });
    }
  };

  // Limpia errores relacionados a código si cambia el código
  useEffect(() => {
    if (error.code || error.general) {
      setError((prev) => ({ ...prev, code: undefined, general: undefined }));
    }
  }, [code]);

  const getCodeError = () => {
    if (!error?.code && error?.general) {
      return error.general;
    }
    return error?.code;
  };

  return {
    code,
    setCode,
    error,
    loading,
    handleSubmit,
    getCodeError,
  };
};

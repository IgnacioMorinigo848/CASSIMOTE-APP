// hooks/forms/useStepOneForm.js
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../../context/AuthContext";
import {stepOne} from "../../../api/USER-SERVICE/signUp/signUp"

export const useStepOneForm = (navigation) => {
  const [email, setEmail] = useState("");
  const [nickName, setNickName] = useState("");
  const [error, setError] = useState({});
  const [exist,setExist] = useState(false);
  const [loading,setLoading] = useState(false);
  const { setToken } = useContext(AuthContext);

  const validate = () => {
    const newError = {};
    if (!/\S+@\S+\.\S+/.test(email)) {
      newError.email = 'Correo electrónico inválido.';
    }
    if (nickName.trim().length === 0 || nickName.length > 25) {
      newError.nickName = 'Alias inválido.';
    }
    setError(newError);
    return Object.keys(newError).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
    setLoading(true)
      const result = await stepOne(email, nickName);
       setLoading(false);

      if (result?.type === 'errors') {
        result.errors.nickName != undefined && (setExist(!exist))
        setError(result.errors);
      } else if (result?.success) {
        if (result.type === 'token') {
          setToken(result.token);
          navigation.navigate("stepTwo");
        }
      } else {
        setError({ general: result?.message || "Error desconocido." });
      }
    } catch (e) {
      setError({ general: e.message || "Error de red." });
    }
  };

  useEffect(() => {
    setError(prev => ({ ...prev, email: undefined, statusRegistration: undefined }));
  }, [email]);

  useEffect(() => {
    setError(prev => ({ ...prev, nickName: undefined }));
  }, [nickName]);

  const getEmailError = () => {
    if (!error?.email && error?.statusRegistration) {
      return error.statusRegistration;
    }
    return error?.email;
  };

  return {
    email,
    nickName,
    exist,
    setEmail,
    setNickName,
    setExist,
    error,
    loading,
    handleSubmit,
    getEmailError,
  };
};

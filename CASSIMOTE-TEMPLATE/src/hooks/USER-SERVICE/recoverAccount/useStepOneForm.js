// hooks/forms/useStepOneForm.js
import { useState, useContext, useEffect } from "react";
import {getCode} from '../../../api/USER-SERVICE/recoverAccount/recoverAccount';
import { AuthContext } from '../../../context/AuthContext';

export const useStepOneForm = (navigation) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState({});
  const [loading,setLoading] = useState(false);
  const { setToken } = useContext(AuthContext);

 const validate = () => {
    const newError={}
    if (!/\S+@\S+\.\S+/.test(email)) {
      newError.email = 'Correo electronico invalido.';
    }

    setError(newError);
    return Object.keys(newError).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
    setLoading(true)
      const result = await getCode(email);
      if (result?.success) {
          setToken(result.message);
          navigation.navigate("stepTwo");
      } else {
        setError(result.message)
      }
      
    } catch (e) {
      setError({ general: e.message || "Error de red." });
    }
  };

  useEffect(() => {
    setError(prev => ({ ...prev, email: undefined, statusRegistration: undefined }));
  }, [email]);

  const getEmailError = () => {
    if (!error?.message && error?.general) {
      return error.general;
    }else if((error?.message && !error?.general)){
      return error.message;
    }
    return error.email
  };

  return {
    email,
    setEmail,
    error,
    loading,
    handleSubmit,
    getEmailError,
  };
};

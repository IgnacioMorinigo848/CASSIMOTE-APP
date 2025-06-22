// hooks/forms/useStepThreeForm.js
import { useState, useContext, useEffect } from "react";
import {recoverAccount} from '../../../api/USER-SERVICE/recoverAccount/recoverAccount';
import { AuthContext } from '../../../context/AuthContext';

export const useStepThreeForm = (navigation) => {
  const [loading,setLoading] = useState(false);
  const {token } = useContext(AuthContext);
  const [password, setPassword] = useState("");
  const [copyPassword, setCopyPassword] = useState("");
  const [error,setError] = useState({});

  const validate = () => {
    const newError={}
    if (password.length < 8) 
      newError.password = 'Contraseña inválida.';
    
    if(password !== copyPassword)
        newError.copyPassword = "La contraseña no coincide.";
    

    setError(newError);
    return Object.keys(newError).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
    setLoading(true)
      const result = await recoverAccount(password,token);
      if (result?.success) {
        console.log(result)
          navigation.navigate("signIn");
      } else {
        setError({message:result.message})
      }
      
    } catch (e) {
      setError({ general: e.message || "Error de red." });
    }
  };

  useEffect(() => {
    setError(prev => ({ ...prev, password: undefined,copyPassword: undefined, message: undefined, general: undefined }));
  }, [password,copyPassword]);

  const getPasswordError = () => {
    if (!error?.message && error?.general) {
      return error.general;
    }else if((error?.message && !error?.general)){
      return error.message;
    }
    return error.password
  };

  return {
    password,
    copyPassword,
    setPassword,
    setCopyPassword,
    error,
    loading,
    handleSubmit,
    getPasswordError,
  };
};

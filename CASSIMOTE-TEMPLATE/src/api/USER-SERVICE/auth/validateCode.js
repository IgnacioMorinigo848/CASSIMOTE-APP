import axios from 'axios';
import Constants from 'expo-constants';

const API_URL = Constants.expoConfig.extra.EXPO_API_URL;

export const validateCodeAPI = async (receivedCode,token) =>{
  const query =`
    mutation codeValidator($receivedCode:String!){
      codeValidator(receivedCode:$receivedCode){
      __typename
      ... on SuccessResponse{
        success
        message
      }
      ... on TokenResponse{
        success
        token
      }
    }
  }
  `

  const variables = {receivedCode};
  console.log(receivedCode,token)
  try{
   const response = await axios.post(
  API_URL,
  { query, variables },
  { 
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`  
    } 
  }
);
    const data = response.data

     if (data.errors) {
      throw new Error(data.errors[0]?.message || 'Error en la respuesta del servidor');
    }

    const resp = data.data.codeValidator;
    console.log(resp)
  
    switch (resp.__typename) {
    case 'SuccessResponse':
        return {
          type: 'success',
          success: resp.success,
          message: resp.message
        };
    case 'TokenResponse':
      return {
        type: 'token',
        success: resp.success,
        token: resp.token
      };
    default:
      throw new Error('Respuesta inesperada del servidor');
      }


  }catch(error){
    console.error('Error en stepTwo:', error.message);
    throw new Error('No se pudo completar el registro. Intenta nuevamente.');
  }

};

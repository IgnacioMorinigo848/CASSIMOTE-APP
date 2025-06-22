import axios from 'axios';
import Constants from 'expo-constants';

const API_URL = Constants.expoConfig.extra.EXPO_API_URL;

export const getCode = async (email) =>{
    const query=`
        query getCode($email:String!){
            getCode(email:$email){
                success
                message
            }
        }
    `
    const variables={email};

    try {
    const response = await axios.post(
      API_URL,
      { query, variables },
      { headers: { 'Content-Type': 'application/json' } }
    );
   
    const data = response.data;

    if (data.errors) {
      throw new Error(data.errors[0]?.message || 'Error en la respuesta del servidor');
    }

    const resp = data.data.getCode;
  
    return resp
  } catch (error) {
    console.error('Error en stepOne:', error.message);
    throw new Error('No se pudo completar el registro. Intenta nuevamente.');
  }
};

export const recoverAccount = async (newPassword,token) =>{
    const query=`
        mutation recoverAccount($newPassword:String!){
            recoverAccount(newPassword:$newPassword){
                success
                message
            }
        }
    `
    const variables={newPassword};

    try {
    const response = await axios.post(
      API_URL,
      { query, variables },
      {  headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`  
        } }
    );

    const data = response.data;

    if (data.errors) {
      throw new Error(data.errors[0]?.message || 'Error en la respuesta del servidor');
    }

    const resp = data.data.recoverAccount;

    return resp
  } catch (error) {
    console.error('Error en stepOne:', error.message);
    throw new Error('No se pudo completar el cambio de contraseña. Intenta nuevamente.');
  }
};
import axios from 'axios';
import Constants from 'expo-constants';

const API_URL = Constants.expoConfig.extra.EXPO_API_URL;

const stepOne = async (email, nickName) => {
  const query = `
    mutation PreviousSignUpData($email: String!, $nickName: String!) {
      previousSignUpData(email: $email, nickName: $nickName) {
        __typename
        ... on FieldErrorsResponse {
          success
          errors {
            email
            nickName
            statusRegistration
          }
        }
        ... on SuccessResponse {
          success
          message
        }
        ... on TokenResponse {
          success
          token
        }
      }
    }
  `;

  const variables = {email,nickName};

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

    const resp = data.data.previousSignUpData;
    console.log(resp)
    
    switch (resp.__typename) {
      case 'FieldErrorsResponse':
        return {
          type: 'errors',
          success: resp.success,
          errors: resp.errors
        };
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

  } catch (error) {
    console.error('Error en stepOne:', error.message);
    throw new Error('No se pudo completar el registro. Intenta nuevamente.');
  }
};

const stepThree = async (newPassword,token)=>{
  const query = `
  mutation completedSignUpData($newPassword:String!){
    completedSignUpData(newPassword:$newPassword){
      success
      message
    }
  }
  `

  const variables = {newPassword};

  console.log(newPassword)

  try{
    const response = await axios.post(
      API_URL,
      {query,variables},{
        headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`  
        }
      }
    );

    const data = response.data

     if (data.errors) {
      throw new Error(data.errors[0]?.message || 'Error en la respuesta del servidor');
    }

    const resp = data.data.completedSignUpData;
    console.log(resp)

  return {
    success: resp.success,
    message: resp.message
  };

  }catch(error){
    console.error('Error en stepTwo:', error.message);
    throw new Error('No se pudo completar el registro. Intenta nuevamente.');
  }
};

export { stepOne,stepThree };

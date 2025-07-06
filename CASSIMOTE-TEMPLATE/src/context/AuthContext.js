import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Constants from 'expo-constants';

const API_URL = Constants.expoConfig.extra.EXPO_API_URL;

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [preferences, setPreferences] = useState(null);
  const [nickName, setNickName] = useState();

  const login = async (email, password, rememberMe = false) => {
    const query = `
      mutation signIn($email: String!, $password: String!) {
        signIn(email: $email, password: $password) {
          success
          token
          errors {
            email
            password
          }
        }
      }
    `;

    const variables = { email, password };

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

      const resp = data.data.signIn;

      if (resp.success) {
        const userData = { email };
        setToken(resp.token);
        setUser(userData);

        if (rememberMe) {
          await AsyncStorage.setItem('token', resp.token);
          await AsyncStorage.setItem('user', JSON.stringify(userData));
        }

        return {
          success: true,
          message: 'Logeado exitosamente.'
        };
      }

      return {
        success: false,
        message: resp.errors
      };

    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        message: error.message || 'Error desconocido'
      };
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user');
    await AsyncStorage.removeItem('rememberMe');
    setToken(null);
    setUser(null);
    
  };

  const checkLoginStatus = async () => {
  try {
    const rememberMe = await AsyncStorage.getItem('rememberMe');
    if (rememberMe === 'true') {
      const storedToken = await AsyncStorage.getItem('token');
      const storedUser = await AsyncStorage.getItem('user');

      if (storedToken) {
        setToken(storedToken);
      }

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } else {
      // Si no quiso ser recordado, borramos todo
      await AsyncStorage.multiRemove(['token', 'user']);
      setToken(null);
      setUser(null);
    }
  } catch (err) {
    console.error('Error cargando estado de sesión:', err);
  } finally {
    setLoading(false);
  }
};

  const loadPreferences = async () =>{
    try{
      const storedPreferences = await AsyncStorage.getItem('preferences');
      if (storedPreferences)
        setPreferences(JSON.parse(storedPreferences));
    }catch (err) {
    console.error('Error cargando preferencias:', err);
    } 
  };

  const loadNickName = async () =>{
  try{
    const storedNickName = await AsyncStorage.getItem('nickName');
    if(storedNickName)
      setNickName(storedNickName);
  } catch (err) {
    console.error('Error cargando nickName:', err);
  }
};

  const deleteRegister = async () =>{
    await AsyncStorage.removeItem('preferences');
    await AsyncStorage.removeItem('nickName');
    setPreferences(null);
    setNickName(null);
    
  }

  useEffect(() => {
    checkLoginStatus();
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      setUser,
      token,
      setToken,
      loading,
      login,
      logout,
      setToken,
      setPreferences,
      preferences,
      loadPreferences,
      nickName,
      setNickName,
      loadNickName,
      deleteRegister
    }}>
      {children}
    </AuthContext.Provider>
  );
};

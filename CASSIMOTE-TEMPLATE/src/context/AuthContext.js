import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Constants from 'expo-constants';

const API_URL = Constants.expoConfig.extra.EXPO_API_URL;

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true); // inicia en true hasta verificar token

  const login = async (email, password) => {
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

        await AsyncStorage.setItem('token', resp.token);
        await AsyncStorage.setItem('user', JSON.stringify(userData));

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
    setToken(null);
    setUser(null);
  };

  const checkLoginStatus = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('token');
      const storedUser = await AsyncStorage.getItem('user');

      if (storedToken) {
        setToken(storedToken);
      }

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (err) {
      console.error('Error cargando estado de sesión:', err);
    } finally {
      setLoading(false);
    }
  };

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
      setToken
    }}>
      {children}
    </AuthContext.Provider>
  );
};

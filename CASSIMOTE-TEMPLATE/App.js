import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainStackNavigator from './src/navigation/mainStackNavigator';
import {navigationRef} from "./src/helper/navigationService"
import { AuthProvider } from './src/context/AuthContext';

export default function App() {
  return (
   <AuthProvider>
     <NavigationContainer ref={navigationRef}>
      <MainStackNavigator/>
    </NavigationContainer>
   </AuthProvider>
  );
};
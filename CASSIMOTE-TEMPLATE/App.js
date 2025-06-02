import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainStackNavigator from './src/navigation/mainStackNavigator';
import {navigationRef} from "./src/helper/navigationService"

export default function App() {
  return (
    <NavigationContainer ref={navigationRef}>
      <MainStackNavigator/>
    </NavigationContainer>
  );
};
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/home/home';
import ProfileFlowStackNavigator from "../navigation/profileFlowStackNavigator.js";
import ArchivedScreen from '../screens/archived/archivedScreen.jsx';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Profile" component={ProfileFlowStackNavigator} />
      <Tab.Screen name="archived" component={ArchivedScreen} />
    </Tab.Navigator>
  );
}

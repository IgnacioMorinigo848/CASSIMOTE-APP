import React, { useContext } from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Home from "../screens/home/home.jsx";
import Welcome from "../screens/welcome/welcome.jsx";
import Onboarding from "../screens/onboarding/Onboarding.jsx";
import SignUpFlowStackNatigator from "../navigation/signUpFlowStackNavigator.js"
import SignIn from "../screens/signIn/SignIn.jsx";
import RecoverAccountFlowStackNavigator from "../navigation/recoverAccountFlowStackNavigator.js";
import ProfileFlowStackNavigator from "../navigation/profileFlowStackNavigator.js";
import FilteredResultsScreen from '../screens/filter/FilteredResultsScreen.jsx';
import RecipeDetailScreen from '../screens/Recipes/RecipeDetailScreen';
import AddRatingScreen from "../screens/Recipes/AddRatingScreen.jsx";
import CreateRecipeFlowStackNavigator from "./createRecipeFlowStackNavigator.js"
import ArchivedScreen from '../screens/archived/archivedScreen.jsx';
import { AuthContext } from "../context/AuthContext.js";
import { ActivityIndicator, View } from "react-native";
import ApproverScreen from "../screens/approver/ApproverScreen.jsx";

export default function mainStackNavigator() {
    const {token,loading} = useContext(AuthContext);

    const Stack = createNativeStackNavigator();

    const getInitialRouteName = () =>{
        return token ? "home" : "welcome"
}

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
    return(
        <Stack.Navigator initialRouteName={getInitialRouteName()}>
            <Stack.Screen name="welcome" component={Welcome} options={{ headerShown: false }}/>
            <Stack.Screen name="home" component={Home} options={{ headerShown: false }}/>
            <Stack.Screen name="onboarding" component={Onboarding}/>
            <Stack.Screen name="signIn" component={SignIn} options={{headerShown:false}}/>
            <Stack.Screen name="signUpFlowStackNatigator" component={SignUpFlowStackNatigator} options={{headerShown:false}}/>
            <Stack.Screen name="recoverAccountFlowStackNavigator" component={RecoverAccountFlowStackNavigator} options={{headerShown:false}}/>
            <Stack.Screen name="profileFlowStackNavigator" component={ProfileFlowStackNavigator} options={{headerShown:false,gestureEnabled: false }}/>
            <Stack.Screen name="filteredResults" component={FilteredResultsScreen} options={{ headerShown: false }} />
            <Stack.Screen name="RecipeDetail" component={RecipeDetailScreen} options={{headerShown:false}}/>
            <Stack.Screen name="AddRating" component={AddRatingScreen} options={{headerShown:false}}/>
            <Stack.Screen name="createRecipe" component={CreateRecipeFlowStackNavigator} options={{headerShown:false}}/>
            <Stack.Screen name="archived" component={ArchivedScreen} options={{headerShown:false}}/>
            <Stack.Screen name="approver" component={ApproverScreen} options={{headerShown:false}}/>
        </Stack.Navigator>
    );
};
import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Home from "../screens/home/home.jsx";
import Welcome from "../screens/welcome/welcome.jsx";
import Onboarding from "../screens/onboarding/Onboarding.jsx";
import SignUpFlowStackNatigator from "../navigation/signUpFlowStackNavigator.js"
import SingIn from "../screens/signIn/SignIn.jsx";
import RecoverAccountFlowStackNavigator from "../navigation/recoverAccountFlowStackNavigator.js";
import ProfileFlowStackNavigator from "../navigation/profileFlowStackNavigator.js";
import SearchBar from "../screens/SearchBar/FilterScreen.jsx";
import FilteredResultsScreen from '../screens/home/FilteredResultsScreen.jsx';
import RecipeDetailScreen from '../screens/Recipes/RecipeDetailScreen';
import AddRatingScreen from "../screens/Recipes/AddRatingScreen.jsx";

const Stack = createNativeStackNavigator();

export default function mainStackNavigator() {
    return(
        <Stack.Navigator initialRouteName="welcome">
            <Stack.Screen name="welcome" component={Welcome} options={{ headerShown: false }}/>
            <Stack.Screen name="home" component={Home} options={{ headerShown: false }}/>
            <Stack.Screen name="onboarding" component={Onboarding}/>
            <Stack.Screen name="signIn" component={SingIn} options={{headerShown:false}}/>
            <Stack.Screen name="signUpFlowStackNatigator" component={SignUpFlowStackNatigator} options={{headerShown:false}}/>
            <Stack.Screen name="recoverAccountFlowStackNavigator" component={RecoverAccountFlowStackNavigator} options={{headerShown:false}}/>
            <Stack.Screen name="profileFlowStackNavigator" component={ProfileFlowStackNavigator} options={{headerShown:false}}/>
            <Stack.Screen name="filter" component={SearchBar} />
            <Stack.Screen name="filteredResults" component={FilteredResultsScreen} options={{ headerShown: false }} />
            <Stack.Screen name="RecipeDetail" component={RecipeDetailScreen} options={{ title: 'Ver Receta' }}/>
            <Stack.Screen name="AddRating" component={AddRatingScreen} />
        </Stack.Navigator>
    );
};
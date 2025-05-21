import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Home from "../screens/home/home.jsx";
import Welcome from "../screens/welcome/welcome.jsx";
import Onboarding from "../screens/onboarding/Onboarding.jsx";
import SignUpFlowStackNatigator from "../navigation/signUpFlowStackNavigator.js"
import SingIn from "../screens/signIn/SignIn.jsx";
import RecoverAccountFlowStackNavigator from "../navigation/recoverAccountFlowStackNavigator.js";

const Stack = createNativeStackNavigator();

export default function mainStackNavigator() {
    return(
        <Stack.Navigator initialRouteName="welcome">
            <Stack.Screen name="welcome" component={Welcome} options={{ headerShown: false }}/>
            <Stack.Screen name="home" component={Home}/>
            <Stack.Screen name="onboarding" component={Onboarding}/>
            <Stack.Screen name="signIn" component={SingIn} options={{headerShown:false}}/>
            <Stack.Screen name="signUpFlowStackNatigator" component={SignUpFlowStackNatigator} options={{headerShown:false}}/>
            <Stack.Screen name="recoverAccountFlowStackNavigator" component={RecoverAccountFlowStackNavigator} options={{headerShown:false}}/>
        </Stack.Navigator>
    );
};
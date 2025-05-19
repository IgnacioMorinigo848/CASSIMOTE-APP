import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Home from "../activitys/home.jsx";
import Welcome from "../activitys/welcome.jsx";
import Onboarding from "../activitys/onboarding.jsx";
import SignUpFlowStackNatigator from "../navigation/signUpFlowStackNavigator.js"

const Stack = createNativeStackNavigator();

export default function mainStackNavigator() {
    return(
        <Stack.Navigator initialRouteName="welcome">
            <Stack.Screen name="welcome" component={Welcome} options={{ headerShown: false }}/>
            <Stack.Screen name="home" component={Home}/>
            <Stack.Screen name="onboarding" component={Onboarding}/>
            <Stack.Screen name="signUpFlowStackNatigator" component={SignUpFlowStackNatigator} options={{headerShown:false}}/>
        </Stack.Navigator>
    );
};
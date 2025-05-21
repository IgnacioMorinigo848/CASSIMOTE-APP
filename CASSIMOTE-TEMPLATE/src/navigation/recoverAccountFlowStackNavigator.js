import {createNativeStackNavigator} from "@react-navigation/native-stack";
import StepOne from "../screens/recoverAccount/StepOne";
import StepTwo from "../screens/recoverAccount/StepTwo";
import StepThree from "../screens/recoverAccount/StepThree";

export default function RecoverAccountFlowStackNavigator(){
    const Stack = createNativeStackNavigator();
    return(
        <Stack.Navigator initialRouteName="stepOne" >
            <Stack.Screen name="stepOne" component={StepOne} options={{headerShown:false}} />
            <Stack.Screen name="stepTwo" component={StepTwo} options={{headerShown:false}} />
             <Stack.Screen name="stepThree" component={StepThree} options={{headerShown:false}} />
        </Stack.Navigator>
    );
}
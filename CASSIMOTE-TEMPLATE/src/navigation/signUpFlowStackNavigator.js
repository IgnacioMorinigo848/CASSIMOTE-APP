import {createNativeStackNavigator} from "@react-navigation/native-stack";
import StepOne from "../screens/signUp/stepOne" 
import StepTwo from "../screens/signUp/stepTwo";
import StepThree from "../screens/signUp/stepThree";

export default function SignUpFlowStackNatigator(){
    const Stack = createNativeStackNavigator();
    return(
        <Stack.Navigator initialRouteName="stepOne">
            <Stack.Screen name="stepOne" component={StepOne} options={{headerShown:false}}/>
            <Stack.Screen name="stepTwo" component={StepTwo} options={{headerShown:false}}/>
            <Stack.Screen name="stepThree" component={StepThree} options={{headerShown:false}}/>
        </Stack.Navigator>
    );
};
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StepOne from "../screens/createRecipe/stepOne";
import StepTwo from "../screens/createRecipe/stepTwo";
import StepThree from "../screens/createRecipe/stepThree";
import StepFour from "../screens/createRecipe/stepFour"

export default function CreateRecipeFlowStackNavigator(){

    const Stack = createNativeStackNavigator()

    return(
        <Stack.Navigator initialRouteName="stepOne" >
            <Stack.Screen name="stepOne" component={StepOne} options={{headerShown:false}} />
            <Stack.Screen name="stepTwo" component={StepTwo} />
            <Stack.Screen name="stepThree" component={StepThree} options={{headerShown:false}} />
            <Stack.Screen name="stepFour" component={StepFour} options={{headerShown:false}} />
        </Stack.Navigator>
    );
}
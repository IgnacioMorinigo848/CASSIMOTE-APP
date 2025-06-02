import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Profile from "../screens/profile/Profile";
import EditPreferences from "../screens/profile/EditPreferences";
import EditProfile from "../screens/profile/EditProfile";

export default function ProfileFlowStackNavigator(){

    const Stack = createNativeStackNavigator()

    return(
        <Stack.Navigator initialRouteName="profile" >
            <Stack.Screen name="profile" component={Profile} options={{headerShown:false}} />
            <Stack.Screen name="editPreferences" component={EditPreferences} options={{headerShown:false}} />
             <Stack.Screen name="editProfile" component={EditProfile} options={{headerShown:false}} />
        </Stack.Navigator>
    );
}
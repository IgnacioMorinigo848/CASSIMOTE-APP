import { View, TouchableOpacity,Text } from "react-native";
import styles from "./styles"

export default function ButtonComponent({children,onPress}){
    return(
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={onPress}>
               <Text style={styles.text}>{children}</Text>
            </TouchableOpacity>
        </View>
    );
};
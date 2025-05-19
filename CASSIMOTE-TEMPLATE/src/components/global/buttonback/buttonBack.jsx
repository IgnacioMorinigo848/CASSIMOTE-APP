import { TouchableOpacity} from "react-native";
import { Feather, AntDesign } from '@expo/vector-icons';
import styles from "./style";

export default function ButtonBack({navigation}){
    return(
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeButton}>
            <AntDesign name="closecircleo" size={32} color="black"/>
        </TouchableOpacity>
    );
};
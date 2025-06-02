import { View,StyleSheet,Text } from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function InputPreferencesComponent({label,options}){
    return(
        <View style={styles.container}>
            <View style={styles.labelContent}>
                <Text style={styles.label}>{label}</Text>
            </View>
            <View style={styles.inputContent}>
                <Picker style={styles.input}>
                    {options.map(opt =>(
                        <Picker.Item style={styles.inputText} label= {`${opt}`} value="opcion1"/>
                    ))}
                </Picker>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        width:"100%",
        padding:20
    },
    labelContent:{
        alignItems:"flex-start"
    },
    label:{
        fontSize:16,
        fontWeight:400,
        paddingLeft:10
    },
    inputContent: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1, 
    marginTop: 8,
    paddingHorizontal: 10,
},
input: {
    width: '100%',
    backgroundColor: 'transparent',
    borderWidth: 0,
    color: '#000', 
},
inputText:{
    fontSize:18,
    fontWeight:400,
}

});
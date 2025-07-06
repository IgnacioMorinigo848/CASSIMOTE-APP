import React from "react";
import { Text,TextInput,TouchableOpacity,View,StyleSheet } from "react-native";

const InputComponent = ({ value, onChangeText, placeholder }) => {
  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        style={styles.input}
      />
    </View>
  );
};



const styles = StyleSheet.create({
    container:{
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 12,
        marginVertical: 8,
        marginHorizontal: 16,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3, 
        width:"93%"
    },
    input:{}
});

export default InputComponent;
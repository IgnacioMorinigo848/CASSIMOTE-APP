import React, { useState } from 'react';
import { TextInput, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons,MaterialIcons  } from '@expo/vector-icons';



export default function InputComponent({
  value,
  onChangeText,
  placeholder,
  keyboardType = 'default',
  error,
  isSecret = false,           
  showValidationIcon = false  
}) {
  const [visible, setVisible] = useState(false);
  const isPasswordHidden = isSecret && !visible;

  return (
    <View style={styles.container}>
      <View style={[styles.inputWrapper, error && styles.inputWrapperError]}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          keyboardType={keyboardType}
          secureTextEntry={isPasswordHidden}
          style={styles.input}
          placeholderTextColor="#999"
        />

        {/* Mostrar ícono para ver/ocultar contraseña */}
        {isSecret && (
          <TouchableOpacity
            onPress={() => setVisible(!visible)}
            style={styles.iconContainer}
          >
            <Ionicons
              name={visible ? 'eye' : 'eye-off'}
              size={20}
              color="#666"
            />
          </TouchableOpacity>
        )}

        {/* Mostrar validación de entrada */}
        {showValidationIcon && !isSecret && (
          <View style={styles.iconContainer}>
            { error ? (
                <MaterialIcons name="cancel" size={20} color="#9C1515" />
              ) : (
                <MaterialIcons name="check-circle" size={20} color="green" />
            )}
          </View>
        )}
      </View>

      {/* Mostrar mensaje de error si existe */}
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {

  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#D4D0D6',
    paddingBottom: 4,
    backgroundColor: "#FFF",
  },
  inputWrapperError: {
    borderBottomColor: '#9C1515',
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 8,
    color: 'black',
    backgroundColor: 'white',
  },
  iconContainer: {
    paddingHorizontal: 8,
  },
  errorText: {
    color: '#9C1515',
    fontSize: 14,
    marginTop: 4,
  },
});

// components/InputField.js
import { View, TextInput, Text, StyleSheet } from 'react-native';

const InputField = ({ value, onChangeText, placeholder, keyboardType = 'default', error }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, error && styles.inputError]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#B9B9B9"
        keyboardType={keyboardType}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  input: {
    backgroundColor: 'rgba(0, 0, 0, 0.06)',
    paddingHorizontal: 10,
    height: 40,
    borderRadius: 4,
    fontSize: 14,
    color: '#000',
  },
  inputError: {
    borderColor: 'red',
    borderWidth: 1,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
});

export default InputField;

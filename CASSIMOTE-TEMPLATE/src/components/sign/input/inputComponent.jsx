import { TextInput, View, Text } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import styles from "./styles";

export default function InputComponent({
  value,
  onChangeText,
  placeholder,
  keyboardType = 'default',
  error,
  secureTextEntry = false
}) {
  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          style={[styles.input, error && styles.inputError]}
          placeholderTextColor="#999"
        />
        <View style={styles.iconContainer}>
          {error ? (
            <MaterialIcons name="cancel" size={20} color="red" />
          ) : (
            <MaterialIcons name="check-circle" size={20} color="green" />
          )}
        </View>
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

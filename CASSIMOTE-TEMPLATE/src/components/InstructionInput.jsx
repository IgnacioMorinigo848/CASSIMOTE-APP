import { View, Text } from 'react-native';
import InputField from './InputField';

const InstructionInput = ({ value, onChange, error }) => {
  return (
    <View style={{ marginBottom: 12 }}>
      <InputField
        placeholder="Paso de la receta"
        value={value}
        onChangeText={onChange}
      />
      {error && <Text style={{ color: 'red', fontSize: 12 }}>{error}</Text>}
    </View>
  );
};

export default InstructionInput;

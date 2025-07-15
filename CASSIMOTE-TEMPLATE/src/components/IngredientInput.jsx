import { View, StyleSheet, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import InputField from './InputField';

const unidades = ['g', 'kg', 'ml', 'l', 'cda', 'taza', 'un'];

const IngredientInput = ({ ingredient, onChange, error }) => {
  return (
    <View style={{ marginBottom: 12 }}>
      <InputField
        placeholder="Ingrediente"
        value={ingredient.name}
        onChangeText={(text) => onChange({ ...ingredient, name: text })}
      />
      {error?.name && <Text style={styles.errorText}>{error.name}</Text>}

      <InputField
        placeholder="Cantidad"
        value={ingredient.quantity?.toString() || ''}
        onChangeText={(text) => {
          const parsed = parseFloat(text);
          onChange({
            ...ingredient,
            quantity: isNaN(parsed) ? '' : parsed,
          });
        }}
        keyboardType="numeric"
      />
      {error?.quantity && <Text style={styles.errorText}>{error.quantity}</Text>}

      <Picker
        selectedValue={ingredient.unit}
        style={styles.picker}
        onValueChange={(value) => onChange({ ...ingredient, unit: value })}
      >
        <Picker.Item label="Seleccionar unidad" value="" />
        {unidades.map((unidad) => (
          <Picker.Item key={unidad} label={unidad} value={unidad} />
        ))}
      </Picker>
      {error?.unit && <Text style={styles.errorText}>{error.unit}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  picker: {
    backgroundColor: '#f0f0f0',
    marginTop: 6,
    borderRadius: 4,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 4,
  },
});

export default IngredientInput;

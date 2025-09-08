import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import InputComponent from "../../components/InputComponent";
import { Ionicons } from '@expo/vector-icons';

export default function InputPreferencesComponent({
  label,
  options,
  selectedValue: defaultSelectedValue,
  onValueChange,
  allowCustom = false,
}) {
  const [localOptions, setLocalOptions] = useState(options || []);
  const [selectedValue, setSelectedValue] = useState(defaultSelectedValue || "");
  const [show, setShow] = useState(false);
  const [newValue, setNewValue] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!allowCustom) {
      setLocalOptions(options);
      return;
    }
    setLocalOptions(base => {
      if ((base || []).some(o => o.value === "Otro")) return base;
      return [...(options || []), { label: "Otro", value: "Otro" }];
    });
  }, [options, allowCustom]);

  useEffect(() => {
    setSelectedValue(defaultSelectedValue || "");
  }, [defaultSelectedValue]);

  useEffect(() => {
    if (selectedValue === "Otro") {
      setShow(true);
    } else {
      setShow(false);
      setError("");
      setNewValue("");
    }
  }, [selectedValue]);

  const getError = text => {
    if (!text.trim()) return "Ingrese un valor";
    const exists = localOptions.some(
      opt => opt.value.toLowerCase() === text.toLowerCase()
    );
    if (exists) return "El valor ya existe";
    return "";
  };

  const handleChangeNewValue = text => {
    setNewValue(text);
    setError(getError(text));
  };

  const handleAdd = () => {
    const validationError = getError(newValue);
    if (validationError) {
      setError(validationError);
      return;
    }
    const newOpt = { label: newValue, value: newValue };
    setLocalOptions(prev => [...prev, newOpt]);
    setSelectedValue(newValue);
    onValueChange(label, newValue);
    setNewValue("");
    setError("");
    setShow(false);
  };

  const handlePickerChange = itemValue => {
    setSelectedValue(itemValue);
    onValueChange(label, itemValue);
  };

  return (
    <View style={styles.container}>
      <View style={styles.labelContent}>
        <Text style={styles.label}>{label}</Text>
      </View>
      <View style={styles.inputContent}>
        <Picker
          selectedValue={selectedValue}
          onValueChange={handlePickerChange}
          style={styles.input}
        >
          
          {localOptions.map((opt, i) => (
            <Picker.Item key={i} label={opt.label} value={opt.value} />
          ))}
        </Picker>

        {show && (
          <>
            <InputComponent
              value={newValue}
              onChangeText={handleChangeNewValue}
              placeholder="Ingrese un valor"
              error={error}
            />
            <TouchableOpacity style={styles.addBtn} onPress={handleAdd}>
              <Ionicons name="add" size={18} />
              <Text style={styles.addBtnText}> Agregar</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: '100%', padding: 20 },
  labelContent: { alignItems: 'flex-start' },
  label: { fontSize: 16, fontWeight: '400', paddingLeft: 10 },
  inputContent: { borderBottomColor: '#ccc', borderBottomWidth: 1, marginTop: 8, paddingHorizontal: 10 },
  input: { width: '100%', backgroundColor: 'transparent', borderWidth: 0, color: '#000' },
  addBtn: { flexDirection: 'row', alignItems: 'center', marginVertical: 10, gap: 4 },
  addBtnText: { fontSize: 18 },
});

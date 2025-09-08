import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import ResponseBox from "./ResponseBox";
import InputComponent from "./InputComponent";
import { Ionicons } from '@expo/vector-icons';

export default function QuestionBock({ question, options, selectedOption, onSelect, onValidChange }) {
  const [inputVal, setInputVal] = useState(false);
  const [option, setOption] = useState("");
  const [addedOption, setAddedOption] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    setError("");
    setInputVal(false);
    setOption("");
    setAddedOption(null);
  }, [question]);

  useEffect(() => {
    const isValid =
      selectedOption &&
      (selectedOption.value !== "Otro" || (selectedOption.value === "Otro" && addedOption));

    onValidChange?.(isValid);
  }, [selectedOption, addedOption]);

  const displayedOptions = addedOption
    ? [...options, addedOption]
    : options;

  const handleAdd = () => {
    const newOption = option.trim();
    const allOptions = [...options, addedOption].filter(Boolean);

    const exists = allOptions.some(
      (opt) => (opt.label ?? opt).toLowerCase() === newOption.toLowerCase()
    );

    if (newOption !== "" && !exists) {
      const newObj = { label: newOption, value: newOption };
      setAddedOption(newObj);
      onSelect(newObj);
      setInputVal(false);
      setOption("");
      setError("");
    } else {
      setError("El valor ya existe.");
    }
  };

  return (
    <View style={{ width: "100%" }}>
      {displayedOptions.map((opt, index) => (
        <ResponseBox
          key={index}
          label={opt.label}
          selected={selectedOption?.value === opt.value}
          onPress={() => {
            if (opt.value === "Otro") {
              onSelect(opt);
              setInputVal(true);
            } else {
              onSelect(opt);
              setInputVal(false);
              setOption("");
            }
          }}
        />
      ))}
      {inputVal && (
        <View style={styles.addContainer}>
          <InputComponent
            value={option}
            onChangeText={setOption}
            placeholder={`Ingrese otra opción para: ${question}`}
          />
          <TouchableOpacity style={styles.addBtn} onPress={handleAdd}>
            <Ionicons name="add" size={18} />
            <Text style={styles.addBtnText}> Agregar</Text>
          </TouchableOpacity>
          {error && <Text style={styles.error}>{error}</Text>}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  addContainer: {
    width: "100%",
    alignItems: "center"
  },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    gap: 4
  },
  addBtnText: {
    fontSize: 18,
  },
  error: {
    color: "#9C1515",
    fontSize: 16
  }
});

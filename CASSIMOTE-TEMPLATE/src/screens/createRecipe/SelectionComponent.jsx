import React, {
  useState,
  useMemo,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import InputField from "../../components/InputField";
import { Ionicons } from "@expo/vector-icons";

const SelectionComponent = forwardRef(({
  options,
  allowCustom = true,
  defaultValue = "",
  fieldErrors,
  setFieldErrors,
  fieldKey = "type",
  onChange,
  customValue: externalCustomValue,
  setCustomValue: setExternalCustomValue,
}, ref) => {
  const [customValue, setCustomValue] = useState(externalCustomValue || "");
  const [customOptions, setCustomOptions] = useState([]);

  const normalizedDefault = String(defaultValue || "").trim().toLowerCase();

  const normalizedOptions = useMemo(() =>
    options.map((opt) => ({
      ...opt,
      normalizedValue: String(opt.value).toLowerCase(),
    })),
    [options]
  );

  const isDefaultInOptions = useMemo(() =>
    normalizedOptions.some(opt => normalizedDefault === opt.normalizedValue),
    [normalizedDefault, normalizedOptions]
  );

  const effectiveOptions = useMemo(() => {
    let newOptions = [...options];

    if (customOptions.length > 0) {
      newOptions = [...newOptions, ...customOptions];
    }

    if (defaultValue && !isDefaultInOptions) {
      newOptions = [
        { label: String(defaultValue), value: defaultValue },
        ...newOptions,
      ];
    }

    if (allowCustom) {
      const hasOtro = newOptions.some(
        (opt) => opt.label.toLowerCase() === "otro" || opt.value.toLowerCase() === "otro"
      );
      if (!hasOtro) {
        newOptions.push({ label: "Otro", value: "Otro" });
      }
    }

    return newOptions;
  }, [options, customOptions, defaultValue, isDefaultInOptions, allowCustom]);

  const [selectedValue, setSelectedValue] = useState(() =>
    isDefaultInOptions ? defaultValue : effectiveOptions[0]?.value || ""
  );

  const [showInput, setShowInput] = useState(
    selectedValue.toLowerCase() === "otro"
  );

  // 🧠 Si defaultValue cambia, sincronizar el valor seleccionado
  useEffect(() => {
    if (defaultValue && defaultValue !== selectedValue) {
      setSelectedValue(defaultValue);
    }
  }, [defaultValue]);

  // 🧠 Sincronizar custom value con prop externa
  useEffect(() => {
    if (externalCustomValue !== undefined) {
      setCustomValue(externalCustomValue);
    }
  }, [externalCustomValue]);

  // 🧠 Validación externa con `ref`
  useImperativeHandle(ref, () => ({
    validate: () => {
      if (selectedValue.toLowerCase() === "otro" && !customValue.trim()) {
        setFieldErrors?.((prev) => ({
          ...prev,
          [fieldKey]: "Debés completar el campo personalizado o presionar Agregar.",
        }));
        return false;
      }
      return true;
    },
  }));

  const handleAdd = () => {
    const trimmedValue = customValue.trim();
    const lowerTrimmed = trimmedValue.toLowerCase();

    if (trimmedValue === "") {
      setFieldErrors?.((prev) => ({
        ...prev,
        [fieldKey]: "El valor no puede estar vacío.",
      }));
      return;
    }

    const alreadyExists = effectiveOptions.some(
      (opt) => String(opt.value).toLowerCase() === lowerTrimmed
    );

    if (alreadyExists) {
      setFieldErrors?.((prev) => ({
        ...prev,
        [fieldKey]: "Ese valor ya existe en la lista.",
      }));
      return;
    }

    const newOption = { label: trimmedValue, value: trimmedValue };
    setCustomOptions((prev) => [...prev, newOption]);
    setSelectedValue(trimmedValue);
    setCustomValue("");
    setExternalCustomValue?.("");
    setShowInput(false);
    setFieldErrors?.((prev) => ({ ...prev, [fieldKey]: "" }));
    onChange?.(trimmedValue);
  };

  const handlePickerChange = (value) => {
    setSelectedValue(value);
    const isOtro = value.toLowerCase() === "otro";
    setShowInput(isOtro);
    if (!isOtro) {
      setFieldErrors?.((prev) => ({ ...prev, [fieldKey]: "" }));
      setCustomValue("");
      setExternalCustomValue?.("");
      onChange?.(value);
    }
  };

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedValue}
        onValueChange={handlePickerChange}
        style={styles.input}
      >
        {effectiveOptions.map((opt, i) => (
          <Picker.Item key={i} label={opt.label} value={opt.value} />
        ))}
      </Picker>

      {showInput && (
        <>
          <InputField
            placeholder="Escribí tu opción personalizada"
            value={customValue}
            onChangeText={(text) => {
              setCustomValue(text);
              setExternalCustomValue?.(text);
            }}
          />
          <TouchableOpacity style={styles.addBtn} onPress={handleAdd}>
            <Ionicons name="add" size={18} />
            <Text style={styles.addBtnText}> Agregar</Text>
          </TouchableOpacity>
        </>
      )}

      {fieldErrors?.[fieldKey] && (
        <Text style={styles.error}>{fieldErrors[fieldKey]}</Text>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  input: {
    backgroundColor: "rgba(0, 0, 0, 0.06)",
    paddingHorizontal: 10,
    paddingVertical: 6,
    height: 50,
    borderRadius: 4,
    fontSize: 14,
    color: "#000",
  },
  addBtn: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    gap: 4,
  },
  addBtnText: {
    fontSize: 18,
  },
  error: {
    fontSize: 16,
    color: "#9C1515",
  },
});

export default SelectionComponent;

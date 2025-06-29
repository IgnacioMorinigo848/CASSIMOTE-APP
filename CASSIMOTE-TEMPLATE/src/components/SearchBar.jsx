// components/SearchBar.jsx
import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

<<<<<<< HEAD
=======
export default function SearchBar({ placeholder="¿Qué querés cocinar hoy?",value, onChangeText, onSubmit,searchAction,filterAction}) {
  const navigation = useNavigation();
>>>>>>> origin/Nacho

export default function SearchBar({ value, onChangeText, onFilterPress, onSubmit, customPlaceholder }) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
<<<<<<< HEAD
        placeholder={customPlaceholder || "¿Qué querés cocinar hoy?"} // Usamos el placeholder dinámico o el predeterminado
=======
>>>>>>> origin/Nacho
        value={value}
        placeholder={placeholder}
        onChangeText={onChangeText}
        returnKeyType="search"
        onSubmitEditing={onSubmit}
      />

<<<<<<< HEAD
      <TouchableOpacity onPress={onSubmit}>
        <Ionicons name="search" size={24} color="#444" style={styles.icon} />
      </TouchableOpacity>

      <TouchableOpacity onPress={onFilterPress}>
=======
      <TouchableOpacity onPress={() => {searchAction()}}>
        <Ionicons name="arrow-forward-circle-outline" size={24} color="#666" style={styles.icon} />
      </TouchableOpacity>

      <TouchableOpacity onPress={()=>{filterAction()}}>
>>>>>>> origin/Nacho
        <Ionicons name="filter-outline" size={24} color="#666" style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 0, // Eliminamos el margen inferior aquí para un mejor control desde el padre
    flex: 1, // Permite que ocupe el espacio restante en el layout padre
    marginLeft: 10, // Añadido para separar del botón de retroceso
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  icon: {
    marginLeft: 8,
  },
});
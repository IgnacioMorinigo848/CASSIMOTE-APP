// src/screens/filter/FilterScreen.jsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

const options = [
  "Nombre de Usuario",
  "Con estos Ingredientes",
  "Sin estos ingredientes",
  "Nombre de Receta",
  "Tipo (Carne, Pasta)",
];
const mockRecipes = [
  { id: 1, title: "Milanesa", author: "Juan", ingredients: ["carne", "pan rallado"], type: "Carne" },
  { id: 2, title: "Ensalada", author: "Lucía", ingredients: ["lechuga", "tomate"], type: "Vegetariana" },
];


export default function SearchBar({ navigation }) {
  const [selected, setSelected] = useState(null);

  const applyFilter = () => {
    // Navegás a Home con el filtro seleccionado
    navigation.navigate("home", { filter: selected });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecciona el filtro para empezar</Text>

      <FlatList
        data={options}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.option}
            onPress={() => setSelected(item)}
          >
            <Text style={{ color: selected === item ? '#000' : '#666' }}>
              {selected === item ? '🔘' : '⚪'} {item}
            </Text>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity style={styles.button} onPress={applyFilter}>
        <Text style={styles.buttonText}>Aplicar Filtro</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 18, marginBottom: 20 },
  option: { marginBottom: 15 },
  button: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#333",
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
});

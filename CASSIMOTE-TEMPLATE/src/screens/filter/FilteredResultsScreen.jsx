import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
  StatusBar,
  ActivityIndicator
} from 'react-native';

import SearchBar from '../../components/SearchBar';
import { Ionicons } from '@expo/vector-icons';
import FilteredResult from '../filter/FilteredResult';

const filters = [
  'Nombre de Usuario',
   'Nombre de Receta',
  'Con estos Ingredientes',
  'Sin estos ingredientes',
  'Tipo (Carne, Pasta)'
];

const FilteredResultScreen = () => {
  const [selected, setSelected] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchExecuted, setSearchExecuted] = useState(false);

  const resetFilter = () => {
    setSelected(null);
    setSearchTerm('');
    setSearchExecuted(false);
  };

  const getPlaceholder = () => {
    switch (filters[selected]) {
      case 'Nombre de Usuario':
        return 'Escribí el nombre de usuario';
      case 'Nombre de Receta':
        return 'Escribí el nombre de la receta';
      case 'Con estos Ingredientes':
        return 'Escribí los ingredientes (Ej: arroz, pollo)';
      case 'Sin estos ingredientes':
        return 'Ingredientes a evitar (Ej: maní)';
      case 'Tipo (Carne, Pasta)':
        return 'Escribí el tipo de plato (carne, pasta, etc.)';
      default:
        return 'Escribí tu búsqueda';
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Barra superior dinámica */}
      <View style={styles.headerButton}>
        {selected !== null ? (
          <View style={styles.inlineSearchBar}>
            <TouchableOpacity onPress={resetFilter}>
              <Ionicons name="arrow-back-circle-outline" size={24} color="#999" />
            </TouchableOpacity>
            <TextInput
              placeholder={getPlaceholder()}
              placeholderTextColor="#aaa"
              style={styles.searchInput}
              value={searchTerm}
              onChangeText={(text) => {
                setSearchTerm(text);
                setSearchExecuted(false);
              }}
            />
            <TouchableOpacity
              onPress={() => {
                if (searchTerm.trim() !== '') {
                  setSearchExecuted(true);
                }
              }}
            >
              <Ionicons name="search" size={24} color="#444" />
            </TouchableOpacity>
          </View>
        ) : (
          <Text style={styles.headerText}>Selecciona el filtro para empezar</Text>
        )}

      {/* Lista de opciones */}
      {/* Lista de filtros solo si no hay uno seleccionado */}
      {selected === null && filters.map((filter, index) => (
        <TouchableOpacity
          key={index}
          style={styles.optionContainer}
          onPress={() => setSelected(index)}
        >
          <Ionicons
            name={'radio-button-off'}
            size={20}
            color="#888"
          />
          <Text style={styles.optionText}>{filter}</Text>
        </TouchableOpacity>
      ))}


      {/* Resultados */}
      <FilteredResult
        searchTerm={searchTerm}
        selected={selected}
        searchExecuted={searchExecuted}
      />
    </ScrollView>
  );
};

export default FilteredResultScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    width: '100%',
    alignItems: 'center',
  },
   content: {
    flex:1,
    width: '90%',
  },
  headerButton: {
    backgroundColor: '#f4f4f4',
    borderRadius: 12,
    padding: 12,
    elevation: 3,
    justifyContent: 'center',
    marginBottom: 20,
    minHeight: 50,
  },
  headerText: {
    color: '#aaa',
    fontSize: 14,
    textAlign: 'center',
  },
  inlineSearchBar: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    marginLeft: 10,
    flex: 1,
    fontSize: 15,
    color: '#333',
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  optionText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#444',
  },
});

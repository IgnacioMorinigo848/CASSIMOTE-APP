import React, { useState, useEffect } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import FilteredResult from '../filter/FilteredResult';
import SearchBar from '../../components/SearchBar'; // Asegúrate de que la ruta sea correcta si es diferente

const filters = [
  'Nombre de Usuario',
  'Con estos Ingredientes',
  'Sin estos ingredientes',
  'Nombre de Receta',
  'Tipo (Carne, Pasta)',
];

const FilteredResultScreen = () => {
  const [selected, setSelected] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchExecuted, setSearchExecuted] = useState(false);
  const [fromHome, setFromHome] = useState(false);

  const route = useRoute();
  const navigation = useNavigation();

  useEffect(() => {
    const { fromHome, query, selectedFilter } = route.params || {};
    if (fromHome && query && selectedFilter !== undefined) {
      setSelected(selectedFilter);
      setSearchTerm(query);
      setSearchExecuted(true);
      setFromHome(true); // Guardamos el origen
    }
  }, [route.params]);

  // Función para manejar el botón de retroceso o limpiar la búsqueda
  // Esta función ahora también se usará para volver a la selección de filtros
  const handleBack = () => {
    if (fromHome) {
      // Si venimos del Home, volvemos al Home
      navigation.goBack(); 
    } else {
      // Si estamos en la pantalla de resultados de filtro, deseleccionamos el filtro
      // y reseteamos la búsqueda para mostrar la lista de filtros
      setSelected(null); 
      setSearchTerm(''); 
      setSearchExecuted(false); 
    }
  };

  // Función para manejar la acción de búsqueda
  const handleSearch = () => {
    if (searchTerm.trim() !== '') {
      setSearchExecuted(true);
    }
  };

  // Determina el placeholder según el filtro seleccionado
  const getPlaceholder = () => {
    switch (filters[selected]) {
      case 'Nombre de Usuario':
        return 'Escribí el nombre de usuario';
      case 'Con estos Ingredientes':
        return 'Escribí los ingredientes (Ej: arroz, pollo)';
      case 'Sin estos ingredientes':
        return 'Ingredientes a evitar (Ej: maní)';
      case 'Nombre de Receta':
        return 'Escribí el nombre de la receta';
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
            {/* Botón de retroceso general para la pantalla de búsqueda */}
            <TouchableOpacity onPress={handleBack}>
              <Ionicons name="arrow-back-circle-outline" size={24} color="#999" />
            </TouchableOpacity>
            {/* Integración del componente SearchBar */}
            <SearchBar
              value={searchTerm}
              onChangeText={(text) => {
                setSearchTerm(text);
                setSearchExecuted(false);
              }}
              onSubmit={handleSearch}

              onFilterPress={handleBack} 
              customPlaceholder={getPlaceholder()} // Pasamos el placeholder dinámico
            />
          </View>
        ) : (
          <Text style={styles.headerText}>Selecciona el filtro para empezar</Text>
        )}
      </View>

      {/* Lista de filtros */}
      {selected === null &&
        filters.map((filter, index) => (
          <TouchableOpacity
            key={index}
            style={styles.optionContainer}
            onPress={() => setSelected(index)}
          >
            <Ionicons name={'radio-button-off'} size={20} color="#888" />
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
    padding: 20,
    backgroundColor: '#fff',
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
    flex: 1, // Permite que ocupe el espacio restante
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

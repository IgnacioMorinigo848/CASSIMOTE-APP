
import React, { useState, useEffect } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import FilteredResult from '../filter/FilteredResult';
import SearchBar from '../../components/SearchBar';

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

  const [orderBy, setOrderBy] = useState(null);
  const [orderDirection, setOrderDirection] = useState('asc');

  const route = useRoute();
  const navigation = useNavigation();

  // ⬇️ Devuelve las opciones de orden según filtro seleccionado
  const getOrderOptions = () => {
    switch (filters[selected]) {
      case 'Nombre de Receta':
        return ['date', 'nickname', 'name'];
      case 'Tipo (Carne, Pasta)':
      case 'Con estos Ingredientes':
      case 'Sin estos ingredientes':
        return ['name', 'date', 'nickname'];
      case 'Nombre de Usuario':
        return ['name', 'date'];
      default:
        return [];
    }
  };

  useEffect(() => {
    const { fromHome, query, selectedFilter, orderBy, orderDirection } = route.params || {};
    if (fromHome && query && selectedFilter !== undefined) {
      setSelected(selectedFilter);
      setSearchTerm(query);
      setSearchExecuted(true);
      setFromHome(true);
      setOrderBy(orderBy || 'name');
      setOrderDirection(orderDirection || 'asc');
    }
  }, [route.params]);

  // 🧠 Lógica para definir ordenamiento por defecto
  useEffect(() => {
    if (selected !== null) {
      const defaultOrder = filters[selected] === 'Nombre de Receta' ? 'date' : 'name';
      setOrderBy(defaultOrder);
      setOrderDirection('asc');
    }
  }, [selected]);

  const handleBack = () => {
    if (fromHome) {
      navigation.goBack();
    } else {
      setSelected(null);
      setSearchTerm('');
      setSearchExecuted(false);
    }
  };

  const handleSearch = () => {
    if (searchTerm.trim() !== '') {
      setSearchExecuted(true);
    }
  };

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

  const toggleOrder = (newOrderBy) => {
    if (orderBy === newOrderBy) {
      setOrderDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setOrderBy(newOrderBy);
      setOrderDirection('asc');
    }
    setSearchExecuted(true); // fuerza re-fetch en FilteredResult
  };

  // const renderOrderButtons = () => {
  //   const options = getOrderOptions();
  //   return (
  //     <View style={{ gap: 10 }}>
  //       {options.includes('date') && (
  //         <TouchableOpacity style={styles.sortButton} onPress={() => toggleOrder('date')}>
  //           <Ionicons name="time-outline" size={18} color="#888" />
  //           <Text style={styles.sortText}>Ordenar por antigüedad ({orderBy === 'date' ? (orderDirection === 'asc' ? '↑' : '↓') : ''})</Text>
  //         </TouchableOpacity>
  //       )}
  //       {options.includes('nickname') && (
  //         <TouchableOpacity style={styles.sortButton} onPress={() => toggleOrder('nickname')}>
  //           <Ionicons name="person-outline" size={18} color="#888" />
  //           <Text style={styles.sortText}>Ordenar por usuario ({orderBy === 'nickname' ? (orderDirection === 'asc' ? '↑' : '↓') : ''})</Text>
  //         </TouchableOpacity>
  //       )}
  //       {options.includes('name') && (
  //         <TouchableOpacity style={styles.sortButton} onPress={() => toggleOrder('name')}>
  //           <Ionicons name="book-outline" size={18} color="#888" />
  //           <Text style={styles.sortText}>Ordenar por nombre de receta ({orderBy === 'name' ? (orderDirection === 'asc' ? '↑' : '↓') : ''})</Text>
  //         </TouchableOpacity>
  //       )}
  //     </View>
  //   );
  // };
  const onChangeOrder = (newOrderBy) => {
  if (orderBy === newOrderBy) {
    setOrderDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
  } else {
    setOrderBy(newOrderBy);
    setOrderDirection('asc');
  }
  setSearchExecuted(true); // fuerza re-fetch
};

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerButton}>
        {selected !== null ? (
          <View style={styles.inlineSearchBar}>
            <TouchableOpacity onPress={handleBack}>
              <Ionicons name="arrow-back-circle-outline" size={24} color="#999" />
            </TouchableOpacity>
            <SearchBar
              value={searchTerm}
              onChangeText={(text) => {
                setSearchTerm(text);
                setSearchExecuted(false);
              }}
              onSubmit={handleSearch}
              onFilterPress={handleBack}
              customPlaceholder={getPlaceholder()}
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

      {/* Botones de ordenamiento
      {selected !== null && renderOrderButtons()} */}

      {/* Resultados con ordenamiento */}
      <FilteredResult
        searchTerm={searchTerm}
        selected={selected}
        searchExecuted={searchExecuted}
        orderBy={orderBy}
        orderDirection={orderDirection}
        onChangeOrder={onChangeOrder}
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
    flex: 1,
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
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eee',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  sortText: {
    marginLeft: 8,
    color: '#666',
  },
});

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Simulación de resultados
const dummyResults = [
  {
    id: 1,
    user: 'Nombre de usuario 0',
    recipe: 'Nombre de la receta B',
    rating: 5,
    image: 'https://i.imgur.com/jdUsNfI.png',
  },
  {
    id: 2,
    user: 'Nombre de usuario 1',
    recipe: 'Nombre de la receta A',
    rating: 5,
    image: 'https://i.imgur.com/jdUsNfI.png',
  },
  {
    id: 3,
    user: 'Nombre de usuario 2',
    recipe: 'Nombre de la receta C',
    rating: 5,
    image: 'https://i.imgur.com/jdUsNfI.png',
  },
];

const FilteredResult = ({ searchTerm, selected, searchExecuted, orderBy, orderDirection, onChangeOrder }) => {
  const trimmedSearch = (searchTerm || '').trim();

  const onlyDateFilters = [0, 3, 4];
  const showUserSort = !onlyDateFilters.includes(selected);

  const fetchData = () => {
    let sorted = [...dummyResults];
    if (orderBy === 'date') {
      sorted.sort((a, b) => orderDirection === 'asc' ? a.id - b.id : b.id - a.id);
    } else if (orderBy === 'usuario') {
      sorted.sort((a, b) => {
        const nameA = a.user.toLowerCase();
        const nameB = b.user.toLowerCase();
        if (nameA < nameB) return orderDirection === 'asc' ? -1 : 1;
        if (nameA > nameB) return orderDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return sorted;
  };

  const results = (searchExecuted && trimmedSearch !== '') ? fetchData() : [];

  return (
    <View style={{ marginTop: 20 }}>
      {selected !== null && (
        <View style={{ gap: 10 }}>
          {/* Botón: Ordenar por fecha */}
          <TouchableOpacity
            style={styles.sortButton}
            onPress={() => onChangeOrder('date')}
          >
            <Ionicons name="swap-vertical" size={18} color="#888" />
            <Text style={styles.sortText}>
              Ordenar por antigüedad {orderBy === 'date' ? (orderDirection === 'asc' ? '↑' : '↓') : ''}
            </Text>
          </TouchableOpacity>

          {/* Botón: Ordenar por usuario si corresponde */}
          {showUserSort && (
            <TouchableOpacity
              style={styles.sortButton}
              onPress={() => onChangeOrder('usuario')}
            >
              <Ionicons name="person" size={18} color="#888" />
              <Text style={styles.sortText}>
                Ordenar por nombre de usuario {orderBy === 'usuario' ? (orderDirection === 'asc' ? '↑' : '↓') : ''}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {/* Resultados */}
      {results.map((result) => (
        <View key={result.id} style={styles.card}>
          <Image source={{ uri: result.image }} style={styles.image} />
          <View style={styles.cardInfo}>
            <Text style={styles.cardTitle}>{result.user}</Text>
            <Text style={styles.cardSubtitle}>{result.recipe}</Text>
            <View style={styles.stars}>
              {[...Array(result.rating)].map((_, i) => (
                <Ionicons key={i} name="star" size={16} color="gold" />
              ))}
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};

export default FilteredResult;

const styles = StyleSheet.create({
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
  card: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 20,
  },
  image: {
    width: 90,
    height: 90,
  },
  cardInfo: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#444',
  },
  cardSubtitle: {
    color: '#555',
    marginVertical: 4,
  },
  stars: {
    flexDirection: 'row',
  },
});

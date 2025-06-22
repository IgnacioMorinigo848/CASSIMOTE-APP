import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const dummyResults = [
  {
    id: 1,
    user: 'Nombre de usuario',
    recipe: 'Nombre de la receta',
    rating: 5,
    image: 'https://i.imgur.com/jdUsNfI.png',
  },
];

const FilteredResult = ({ searchTerm, selected, searchExecuted }) => {
  const trimmedSearch = (searchTerm || '').trim();


  return (
    <View style={{ marginTop: 30 }}>
      {/* Mostrar botón siempre que haya un filtro seleccionado */}
      {selected !== null && (
  <View style={{ gap: 10 }}>
    <TouchableOpacity style={styles.sortButton}>
      <Ionicons name="swap-vertical" size={18} color="#888" />
      <Text style={styles.sortText}>Ordenar por antigüedad</Text>
    </TouchableOpacity>

    {(selected === 1 || selected === 2 || selected === 3 || selected === 4) && (
      <TouchableOpacity style={styles.sortButton}>
        <Ionicons name="person" size={18} color="#888" />
        <Text style={styles.sortText}>Ordenar por nombre de usuario</Text>
      </TouchableOpacity>
    )}
  </View>
)}


      {/* Mostrar resultados solo si se ejecutó búsqueda y hay texto */}
      {searchExecuted && trimmedSearch !== '' && selected !== null && dummyResults.map((result) => (
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
    marginBottom: 20,
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
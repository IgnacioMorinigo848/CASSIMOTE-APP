import React from 'react';
import {
  View, Text, TextInput, StyleSheet, Image,
  FlatList, TouchableOpacity
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

const categories = [
  { title: 'Lo último', image: require('../../assets/homeImages/latest.png') },
  { title: 'Para sorprender', image: require('../../assets/homeImages/latest.png') },
  { title: '4 ingredientes o menos', image: require('../../assets/homeImages/latest.png') },
  { title: 'Menos de 20 min', image: require('../../assets/homeImages/latest.png') },
  { title: 'Saludables', image: require('../../assets/homeImages/latest.png') },
];

export default function Home() {
  const navigation = useNavigation();
  const route = useRoute();
  const appliedFilter = route.params?.filter;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡HOLA!</Text>

      {/* Campo de búsqueda con ícono de filtro */}
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="¿Qué querés cocinar hoy?"
          style={styles.input}
        />
        <TouchableOpacity onPress={() => navigation.navigate('filteredResults', { tipo: 'usuario' })}>
          <Ionicons name="filter-outline" size={24} color="#666" />
        </TouchableOpacity>
      </View>

      {/* Botones para tipos de filtro */}
      <View style={styles.filterButtonsContainer}>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => navigation.navigate('filteredResults', { tipo: 'usuario' })}  
        >
          <Text>Filtrar por usuario</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => navigation.navigate('filteredResults', { tipo: 'con' })}
        >
          <Text>Con ingredientes</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => navigation.navigate('filteredResults', { tipo: 'sin' })}
        >
          <Text>Sin ingredientes</Text>
        </TouchableOpacity>
      </View>

      {/* Mostrar el filtro si está activo */}
      {appliedFilter && (
        <Text style={styles.filterText}>
          Filtro aplicado: <Text style={{ fontWeight: 'bold' }}>{appliedFilter}</Text>
        </Text>
      )}


      <TouchableOpacity onPress={() =>navigation.navigate('RecipeDetail')}>
          <Text style={styles.subTitle}>Últimas Recetas Compartidas</Text> 
          <Image
            source={require('../../assets/homeImages/latest.png')}
            style={styles.featuredImage}
          />
      </TouchableOpacity>

      <Text style={styles.subTitle}>Categorías</Text>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.title}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.categoryCard}>
            <Image source={item.image} style={styles.categoryImage} />
            <Text style={styles.categoryTitle}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 20 },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    marginBottom: 10,
  },
  input: { flex: 1, fontSize: 16 },
  filterText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  subTitle: { fontSize: 18, fontWeight: 'bold', marginVertical: 10 },
  featuredImage: {
    width: '100%',
    height: 180,
    borderRadius: 10,
    marginBottom: 20,
  },
  categoryCard: {
    flex: 1,
    margin: 5,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#eee',
  },
  categoryImage: {
    width: '100%',
    height: 100,
  },
  categoryTitle: {
    padding: 10,
    fontSize: 14,
    textAlign: 'center',
  },
  filterButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    marginBottom: 10,
  },
  filterButton: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
});

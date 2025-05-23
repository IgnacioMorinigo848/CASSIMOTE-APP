import React from 'react';
import { View, Text, TextInput, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const categories = [
  { title: 'Lo último', image: require('../../assets/homeImages/latest.png') },
  { title: 'Para sorprender', image: require('../../assets/homeImages/latest.png') },
  { title: '4 ingredientes o menos', image: require('../../assets/homeImages/latest.png') },
  { title: 'Menos de 20 min', image: require('../../assets/homeImages/latest.png') },
  { title: 'Saludables', image: require('../../assets/homeImages/latest.png') },
];

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>HOLA!</Text>

      <View style={styles.searchContainer}>
        <TextInput
          placeholder="¿Qué querés cocinar hoy?"
          style={styles.input}
        />
        <Ionicons name="filter-outline" size={20} color="#666" />
      </View>

      <Text style={styles.subTitle}>Últimas Recetas Compartidas</Text>
      <Image
        source={require('../../assets/homeImages/latest.png')}
        style={styles.featuredImage}
      />

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
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  input: { flex: 1, fontSize: 16 },
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
});

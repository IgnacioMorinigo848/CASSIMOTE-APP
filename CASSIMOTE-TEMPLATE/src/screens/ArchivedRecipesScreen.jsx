// src/screens/ArchivedRecipesScreen.jsx

import React, { useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ArchivedRecipesScreen() {
  const navigation = useNavigation();

  const [archivedRecipes, setArchivedRecipes] = useState([
    {
      id: '1',
      name: 'Tarta de Manzana',
      image: require('../../assets/homeImages/latest.png'),
      rating: 4
    },
    {
      id: '2',
      name: 'Ensalada César',
      image: require('../../assets/homeImages/latest.png'),
      rating: 5
    }
  ]);

  const renderRecipe = ({ item }) => (
    <TouchableOpacity
      style={styles.recipeCard}
      onPress={() => navigation.navigate('RecipeDetail', { recipe: item })}
    >
      <Image source={item.image} style={styles.recipeImage} />
      <View style={styles.recipeInfo}>
        <Text style={styles.recipeName}>{item.name}</Text>
        <Text>⭐ {item.rating}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Archivados</Text>
      <Text style={styles.subtitle}>Mis Recetas Archivadas</Text>

      {archivedRecipes.length === 0 ? (
        <Text style={styles.emptyText}>
          Guarda aquí todas las recetas que querés probar en algún momento
        </Text>
      ) : (
        <FlatList
          data={archivedRecipes}
          keyExtractor={(item) => item.id}
          renderItem={renderRecipe}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold' },
  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 4,
    color: 'purple',
  },
  emptyText: { marginTop: 40, textAlign: 'center', color: '#555' },
  listContainer: { paddingTop: 20 },
  recipeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#f7f7f7',
    borderRadius: 10,
    overflow: 'hidden'
  },
  recipeImage: { width: 100, height: 100 },
  recipeInfo: { padding: 10, flex: 1 },
  recipeName: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 }
});

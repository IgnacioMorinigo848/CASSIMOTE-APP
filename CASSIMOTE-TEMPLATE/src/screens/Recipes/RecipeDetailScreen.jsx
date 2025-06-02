// src/screens/Recipes/RecipeDetailScreen.jsx

import React, { useState } from 'react';
import {
  View, Text, Image, StyleSheet, TouchableOpacity, TextInput, ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const recipeData = {
  image: require('../../assets/homeImages/latest.png'),
  name: 'Nombre de la Receta que visualiza',
  rating: 4,
  ingredients: [
    { name: 'Ingrediente 1', quantity: 20 },
    { name: 'Ingrediente 2', quantity: 8 },
  ],
  difficulty: 'Media',
  time: '20\'',
  steps: [
    'Paso 1: Hacer esto.',
    'Paso 2: Luego aquello.',
  ],
  comments: [
    { user: 'Usuario1', comment: 'Comentario 1', stars: 5 },
    { user: 'Usuario2', comment: 'Comentario 2', stars: 4 },
  ]
};

export default function RecipeDetailScreen() {
  const [portions, setPortions] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState('Ingredientes');
  const navigation = useNavigation();

  const handlePortionChange = (change) => {
    if (portions + change > 0) {
      setPortions(portions + change);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={recipeData.image} style={styles.image} />
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>

      {/* Estrellas y favorito */}
      <View style={styles.starsRow}>
        {[...Array(5)].map((_, i) => (
          <Ionicons
            key={i}
            name={i < recipeData.rating ? 'star' : 'star-outline'}
            size={24}
            color="gold"
          />
        ))}
        <TouchableOpacity onPress={() => setIsFavorite(!isFavorite)}>
          <Ionicons
            name={isFavorite ? 'bookmark' : 'bookmark-outline'}
            size={24}
            color="purple"
            style={{ marginLeft: 10 }}
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.recipeTitle}>{recipeData.name}</Text>

      {/* Info */}
      <View style={styles.infoRow}>
        <Text>🛒 {recipeData.ingredients.length}</Text>
        <Text>💪 {recipeData.difficulty}</Text>
        <Text>⏰ {recipeData.time}</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabsRow}>
        <TouchableOpacity onPress={() => setActiveTab('Ingredientes')}>
          <Text style={activeTab === 'Ingredientes' ? styles.activeTab : styles.inactiveTab}>
            Ingredientes
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('Pasos')}>
          <Text style={activeTab === 'Pasos' ? styles.activeTab : styles.inactiveTab}>
            Pasos
          </Text>
        </TouchableOpacity>
      </View>

      {/* Porciones e Ingredientes o Pasos */}
      {activeTab === 'Ingredientes' ? (
        <>
          <View style={styles.portionsRow}>
            <TouchableOpacity onPress={() => handlePortionChange(-1)}>
              <Text style={styles.portionButton}>-</Text>
            </TouchableOpacity>
            <Text style={styles.portionsText}>{portions} Porciones</Text>
            <TouchableOpacity onPress={() => handlePortionChange(1)}>
              <Text style={styles.portionButton}>+</Text>
            </TouchableOpacity>
          </View>
          {recipeData.ingredients.map((item, index) => (
            <View key={index} style={styles.ingredientRow}>
              <TextInput
                style={styles.ingredientInput}
                editable={false}
                value={item.name}
              />
              <Text style={styles.quantity}>{item.quantity * portions}</Text>
            </View>
          ))}
        </>
      ) : (
        <View style={{ padding: 10 }}>
          {recipeData.steps.map((step, i) => (
            <Text key={i} style={{ marginBottom: 8 }}>{step}</Text>
          ))}
        </View>
      )}

      {/* Botón para agregar valoración */}
      <TouchableOpacity
        style={styles.ratingButton}
        onPress={() => navigation.navigate('AddRating')}
      >
        <Text style={{ color: 'white' }}>Agrega tu valoración de la receta</Text>
      </TouchableOpacity>

      {/* Comentarios */}
      <Text style={styles.commentsTitle}>Valoraciones</Text>
      {recipeData.comments.map((c, index) => (
        <View key={index} style={{ paddingHorizontal: 10, marginBottom: 10 }}>
          <Text style={{ fontWeight: 'bold' }}>{c.user}</Text>
          <Text>{c.comment}</Text>
          <View style={{ flexDirection: 'row', marginTop: 2 }}>
            {[...Array(5)].map((_, i) => (
              <Ionicons
                key={i}
                name={i < c.stars ? 'star' : 'star-outline'}
                size={16}
                color="gold"
              />
            ))}
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  image: { width: '100%', height: 200 },
  backButton: { position: 'absolute', top: 30, left: 10 },
  starsRow: { flexDirection: 'row', padding: 10, alignItems: 'center' },
  recipeTitle: { fontSize: 20, fontWeight: 'bold', paddingHorizontal: 10 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-around', padding: 10 },
  tabsRow: { flexDirection: 'row', paddingHorizontal: 10 },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: 'purple',
    marginRight: 20,
    fontWeight: 'bold',
  },
  inactiveTab: { color: '#aaa', marginRight: 20 },
  portionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  portionButton: {
    fontSize: 18,
    color: 'purple',
    paddingHorizontal: 10,
  },
  portionsText: { fontSize: 16 },
  ingredientRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  ingredientInput: {
    flex: 1,
    backgroundColor: '#eee',
    borderRadius: 8,
    padding: 8,
    marginRight: 10,
  },
  quantity: { fontSize: 16 },
  ratingButton: {
    margin: 20,
    backgroundColor: 'purple',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  commentsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    margin: 10,
    marginTop: 20,
  },
});

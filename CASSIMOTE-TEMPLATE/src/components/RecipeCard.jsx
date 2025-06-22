import React from 'react';
import { TouchableOpacity, Text, Image } from 'react-native';
import styles from '../screens/home/styles';
import { useNavigation } from '@react-navigation/native';

export default function RecipeCard({ recipe }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.recipeCard}
      onPress={() => navigation.navigate('RecipeDetail', { id: recipe._id })}
    >
      <Image
        source={{uri:recipe.image}}
        style={styles.featuredImageLastThree}
      />
      {recipe.name ? <Text style={styles.recipeName}>{recipe.name}</Text>:(null)}
      
    </TouchableOpacity>
  );
}

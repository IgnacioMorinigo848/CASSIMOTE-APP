import React from 'react';
import { TouchableOpacity, Text, Image } from 'react-native';
import styles from '../screens/home/styles';
import { useNavigation } from '@react-navigation/native';

export default function CategoryCard({ data }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.categoryCardDynamic}
      onPress={() => navigation.navigate('RecipeDetail', { id: data.recipe._id })}
    >
      <Image
        source={{uri:data.recipe.image}}
        style={styles.featuredImage}
      />
      <Text style={styles.categoryTitleDynamic}>{data.title}</Text>
      <Text style={styles.recipeNameDynamic}>
        {data.recipe.name} {data.recipe.time ? `- ${data.recipe.time} min` : ''}
      </Text>
    </TouchableOpacity>
  );
}

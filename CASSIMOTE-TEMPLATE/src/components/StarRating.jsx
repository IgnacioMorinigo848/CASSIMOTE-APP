import React from 'react';
import { View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const StarRating = ({size = 23, rating }) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(<FontAwesome key={i} name="star" size={size} color="#FFD700" />); 
    } else if (rating >= i - 0.5) {
      stars.push(<FontAwesome key={i} name="star-half-full" size={size} color="#FFD700" />); 
    } else {
      stars.push(<FontAwesome key={i} name="star-o" size={size} color="#FFD700" />); 
    }
  }

  return <View style={{ flexDirection: 'row' }}>{stars}</View>;
};

export default StarRating;

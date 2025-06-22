import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const RatingStars = ({
  rating = 0,
  editable = false,
  size = 24,
  color = 'gold',
  onChange = () => {},
}) => {
  const stars = [1, 2, 3, 4, 5];

  return (
    <View style={{ flexDirection: 'row' }}>
      {stars.map((star) => {
        const iconName = star <= rating ? 'star' : 'star-outline';

        if (editable) {
          return (
            <TouchableOpacity key={star} onPress={() => onChange(star)}>
              <Ionicons name={iconName} size={size} color={color} />
            </TouchableOpacity>
          );
        }

        return <Ionicons key={star} name={iconName} size={size} color={color} />;
      })}
    </View>
  );
};

export default RatingStars;

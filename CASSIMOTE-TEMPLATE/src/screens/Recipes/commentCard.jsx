import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import RatingStars from './RatingStars';

const CommentCard = ({ user, comment, stars, showDeleteButton = false, onDelete }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.user}>{user}</Text>
      <Text style={styles.comment}>{comment}</Text>
      <RatingStars rating={stars} size={16} />
      
      {showDeleteButton && (
        <TouchableOpacity onPress={onDelete}>
          <Text style={styles.deleteText}>🗑️ Eliminar comentario</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  user: {
    fontWeight: 'bold',
  },
  comment: {
    marginVertical: 2,
  },
  deleteText: {
    marginTop: 6,
    color: 'red',
    fontSize: 12,
  },
});

export default CommentCard;

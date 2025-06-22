import React, { useContext, useState } from 'react';
import {
  View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from "../../context/AuthContext";
import makeComment from '../../api/RECIPE-SERVICE/comments/makeComment';
import { useRoute } from '@react-navigation/native';

export default function AddRatingScreen({ navigation }) {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [errors, setErrors] = useState({ comment: '', rating: '' });
  const [loading, setLoading] = useState(false);

  const { token } = useContext(AuthContext);
  const route = useRoute();
  const { id } = route.params || {};

  const submitRating = async () => {
    const newErrors = { comment: '', rating: '' };
    let hasError = false;

    if (!comment.trim()) {
      newErrors.comment = 'El comentario no puede estar vacío.';
      hasError = true;
    }

    if (rating === 0) {
      newErrors.rating = 'Debes seleccionar una valoración.';
      hasError = true;
    }

    setErrors(newErrors);
    if (hasError) return;

    setLoading(true);
    try {
      await makeComment(token, id, rating, comment);
      navigation.goBack();
    } catch (error) {
      alert('Error al enviar la valoración: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back-circle-outline" size={30} />
      </TouchableOpacity>

      <Text style={styles.title}>Agrega tu valoración</Text>

      <Text style={styles.label}>Comentario</Text>
      <TextInput
        style={[styles.input, errors.comment && { borderColor: 'red', borderWidth: 1 }]}
        multiline
        placeholder="Escribe a continuación tu valoración."
        value={comment}
        onChangeText={setComment}
      />
      {errors.comment ? <Text style={styles.error}>{errors.comment}</Text> : null}

      <Text style={styles.label}>Valoración</Text>
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((num) => (
          <TouchableOpacity key={num} onPress={() => setRating(num)}>
            <Ionicons
              name={rating >= num ? 'star' : 'star-outline'}
              size={32}
              color="gold"
            />
          </TouchableOpacity>
        ))}
      </View>
      {errors.rating ? <Text style={styles.error}>{errors.rating}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={submitRating} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Enviar valoración</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff', flex: 1 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  label: { fontSize: 16, marginBottom: 5 },
  input: {
    backgroundColor: '#eee',
    borderRadius: 10,
    padding: 15,
    minHeight: 100,
    marginBottom: 10,
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#BA45D6',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: { color: 'white', fontWeight: 'bold' },
  error: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
    marginLeft: 4,
  },
});

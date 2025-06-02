import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AddRatingScreen({ navigation }) {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);

  const submitRating = () => {
    console.log('Comentario:', comment);
    console.log('Valoración:', rating);
    navigation.goBack(); // vuelve a la pantalla de detalle
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back-circle-outline" size={30} />
      </TouchableOpacity>

      <Text style={styles.title}>Agrega tu valoración</Text>

      <Text style={styles.label}>Comentario</Text>
      <TextInput
        style={styles.input}
        multiline
        placeholder="Escribe a continuación tu valoración."
        value={comment}
        onChangeText={setComment}
      />

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

      <TouchableOpacity style={styles.button} onPress={submitRating}>
        <Text style={styles.buttonText}>Enviar valoración</Text>
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
    marginBottom: 20,
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#BA45D6',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: { color: 'white', fontWeight: 'bold' },
});

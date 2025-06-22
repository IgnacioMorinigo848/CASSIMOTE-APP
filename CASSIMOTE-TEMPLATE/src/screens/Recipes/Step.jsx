import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Step({ number, text }) {
  return (
    <View style={styles.container}>
      <Text style={styles.number}>Paso {number}</Text>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    marginHorizontal: 10,
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
  },
  number: {
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#6200ee',
  },
  text: {
    fontSize: 14,
  },
});

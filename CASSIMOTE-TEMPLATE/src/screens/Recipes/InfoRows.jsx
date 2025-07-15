// InfoRow.jsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'; // Usa 'FontAwesome' si no encontrás un ícono

const InfoRow = ({ ingredients, difficulty, time }) => {
  return (
    <View style={styles.container}>
      <View style={styles.item}>
         <Text style={styles.label}>Ingredientes</Text>
        <Icon name="shopping-basket" size={24} color="#000" />
        <Text>{ingredients}</Text>
      </View>

      <View style={styles.item}>
         <Text style={styles.label}>Dificultad</Text>
        <Icon name="dumbbell" size={24} color="#000" />
        <Text>{difficulty}</Text>
      </View>

      <View style={styles.item}>
        <Text style={styles.label}>Tiempo</Text>
        <Icon name="clock" size={24} color="#000" />
        <Text>{time}'</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  item: {
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
    marginTop: 4,
    color: '#444',
  },
});

export default InfoRow;

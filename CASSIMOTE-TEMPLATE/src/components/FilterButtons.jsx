import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import styles from '../screens/home/styles';
import { useNavigation } from '@react-navigation/native';

export default function FilterButtons() {
  const navigation = useNavigation();

  return (
    <View style={styles.filterButtonsContainer}>
      <TouchableOpacity style={styles.filterButton} onPress={() => navigation.navigate('filteredResults', { tipo: 'usuario' })}>
        <Text>Usuario</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.filterButton} onPress={() => navigation.navigate('filteredResults', { tipo: 'con' })}>
        <Text>Con ingredientes</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.filterButton} onPress={() => navigation.navigate('filteredResults', { tipo: 'sin' })}>
        <Text>Sin ingredientes</Text>
      </TouchableOpacity>
    </View>
  );
}

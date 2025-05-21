import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';

export default function RadioButton({ selected, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.outerCircle}>
        {selected && <View style={styles.innerCircle} />}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  outerCircle: {
    height: 20,
    width: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor:  'rgba(82, 80, 80, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor:  'rgba(76, 75, 75, 0.75)',
  },
});

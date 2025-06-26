import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PlusMinusButton from './PlusMinusButton';

const QuantityAdjuster = ({ value, unit = 'gr',onChange,disguise= "profile" }) => {
  const [values, setValues] = useState(value);

  useEffect(() => {
    setValues(value);
  }, [value]);

  return (
    <View style={styles.container}>
      { (disguise !== "profile") &&(
      <PlusMinusButton onPress={() => onChange(-1)} symbol="-" />)
      }
      <Text style={styles.valueText}>{values} {unit}</Text>
      { (disguise !== "profile")  &&(
      <PlusMinusButton onPress={() => onChange(1)} symbol="+" />)
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
  valueText: {
    marginHorizontal: 8,
    fontSize: 16,
    fontWeight: '500',
  },
});

export default QuantityAdjuster;

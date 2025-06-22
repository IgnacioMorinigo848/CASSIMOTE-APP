import React from 'react';
import { Text } from 'react-native';
import styles from '../screens/home/styles';

export default function SectionTitle({ title }) {
  return <Text style={styles.subTitle}>{title}</Text>;
}

import React from 'react';
import { Text} from 'react-native';
import styles from './styles';

export default function ({ children, type = 'default' }){
  const textStyle = styles[type] || styles.default;

  return <Text style={textStyle}>{children}</Text>;
};

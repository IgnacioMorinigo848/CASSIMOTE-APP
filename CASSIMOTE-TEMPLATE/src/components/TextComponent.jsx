import React from 'react';
import { Text,StyleSheet,StatusBar,Platform} from 'react-native';

export default function ({ children, type = 'default', ...props }) {
  const textStyle = styles[type] || styles.default;
  return <Text style={textStyle} {...props}>{children}</Text>;
}

const styles = StyleSheet.create({
  default: {
    fontSize: 14,
    color: '#000',
    textAlign: 'left',
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#A65FD2',
    textAlign: 'center',
    marginBottom: 10,
    textShadowColor: 'rgba(99, 96, 96, 0.75)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  subtitle:{
    fontSize: 25,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 10,
  },
  info: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
    marginTop:40
  },
  footer: {
  fontSize: 20,
  color: '#3f3fc3',
  textAlign: 'center',
  position: 'absolute',
  bottom: Platform.OS === 'android' ? 30 : 50, 
  left: 0,
  right: 0,
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom:40
},
});


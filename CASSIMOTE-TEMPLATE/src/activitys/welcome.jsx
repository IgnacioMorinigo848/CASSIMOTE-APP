import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function Welcome({ navigation }) {
  return (
    <ImageBackground
      source={require('../assets/welcomeBackground.png')}
      style={styles.background}
    >
      <View style={styles.top}>
        <Text style={styles.logo}>Casiimote</Text>
      </View>

      <View style={styles.middle}>
        <Text style={styles.title}>Comparte tu sabor y descubre el mundo</Text>
      </View>

      <View style={styles.bottom}>
        <TouchableOpacity style={styles.button} onPress={()=>  navigation.navigate('signUpFlowStackNatigator')}>
          <Text style={styles.buttonText}>Empecemos</Text>
        </TouchableOpacity>
        <Text style={styles.loginText}>
          ¿Ya tenés usuario? <Text style={styles.loginLink}>Inicia sesión</Text>
        </Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: wp('100%'),
    height: hp('100%'),
  },
  top: {
    height: hp('10%'),
    justifyContent: 'center',
    alignItems: 'right',
  },
  logo: {
    fontSize: wp('8%'),
    fontWeight: 'bold',
    color: '#AF47D2',
    paddingHorizontal:wp('4%'),
  },
  middle: {
    marginTop: hp('60%'),
    paddingHorizontal: wp('5%'),
    alignItems: 'center',
  },
  title: {
    fontSize: wp('8%'),
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  bottom: {
    position: 'absolute',
    bottom: hp('5%'),
    width: wp('100%'),
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#AF47D2',
    borderRadius: 30,
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('20%'),
    marginBottom: hp('2%'),
  },
  buttonText: {
    fontSize: wp('6%'),
    color: '#FFFFFF',
    textAlign: 'center',
  },
  loginText: {
    fontSize: wp('4.5%'),
    color: '#FFFFFF',
  },
  loginLink: {
    color: '#FFE600',
  },
});

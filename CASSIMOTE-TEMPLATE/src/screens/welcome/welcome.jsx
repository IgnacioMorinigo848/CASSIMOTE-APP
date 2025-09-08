import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function Welcome({ navigation }) {
  return (
    <ImageBackground
      source={require('../../assets/welcomeBackground.png')}
      style={styles.background}
    >
      <View style={styles.top}>
        <Text style={styles.logo}>Casiimote</Text>
      </View>

      <View style={styles.middle}>
        <Text style={styles.title}>Comparte tu sabor y descubre el mundo</Text>
      </View>
      <View style={styles.bottom}>
        <TouchableOpacity style={styles.guestButton}  onPress={()=>  navigation.navigate('home')}>
          <Text style={styles.guestText}>Invitado</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={()=>  navigation.navigate('onboarding')}>
          <Text style={styles.buttonText}>Empecemos</Text>
        </TouchableOpacity>
        <Text style={styles.loginText}>
          ¿Ya tenés usuario? <Text style={styles.loginLink}  onPress={()=>navigation.navigate("signIn")}>Inicia sesión</Text>
        </Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width:"auto",
    height:"auto",
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
    marginTop: hp('50%'),
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
    marginTop:100,
    bottom: hp('5%'),
    width: wp('100%'),
    alignItems: 'center',
  },
  button: {
    width:"80%",
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
    marginBottom:20
  },
  loginLink: {
    color: '#FFE600',
  },
  guestContent:{
    width:"100%",
    alignItems:"center",
    marginBottom:300
  },
  guestButton: {
    width:"80%",
    backgroundColor: '#e6e0e0f6',
    borderRadius: 30,
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('20%'),
    marginBottom: hp('2%'),
  },
  guestText:{
     fontSize: wp('6%'),
    color: '#AF47D2',
    textAlign: 'center',
  }
});

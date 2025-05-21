import { View,SafeAreaView,StyleSheet,Platform,StatusBar } from "react-native";
import InputComponent from '../../components/InputComponent';
import TextComponent from '../../components/TextComponent';
import ButtonComponent from '../../components/ButtonComponent';
import { useState } from 'react';
import ButtonBack from '../../components/BackButtonComponent';

export default function StepOne({navigation}) {
  const [email, setEmail] = useState("");
  const [error,setError] = useState({});

  const validate = () => {
    const newError={}
    if (!/\S+@\S+\.\S+/.test(email)) {
      newError.email = 'Correo electronico invalido.';
    }

    setError(newError);
    return Object.keys(newError).length === 0;
  };

  const handleNext = () => {
    if (!validate()) {
      navigation.navigate("stepTwo");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ButtonBack navigation={navigation}/>
      <View style={styles.content}>
        <TextComponent type={"subtitle"}>Recuperar Contraseña</TextComponent>
        <TextComponent type={"info"}>Ingresa tu correo electrónico y te enviaremos un enlace para que puedas cambiar tu contraseña</TextComponent>
        <View style={styles.input}>
          <InputComponent
            value={email}
            onChangeText={setEmail}
            placeholder="Correo electrónico"
            keyboardType="email-address"
            error={error.email}
          />
        </View>
        <ButtonComponent onPress={handleNext}>Recuperar Contraseña</ButtonComponent>
      </View>
    </SafeAreaView>
  );

  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems:"center",
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0, 
  },
  content: {
    flex:1,
    marginTop:"20%",
    width:"90%",
    alignContent:"center",
    gap:40
  },
  input:{
    marginTop:"2%"
  },
  title:{
    color:"#000",
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});

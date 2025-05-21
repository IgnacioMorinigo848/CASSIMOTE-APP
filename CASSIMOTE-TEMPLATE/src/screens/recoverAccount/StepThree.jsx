import { View,SafeAreaView,StyleSheet,Platform,StatusBar } from "react-native";
import InputComponent from '../../components/InputComponent';
import TextComponent from '../../components/TextComponent';
import ButtonComponent from '../../components/ButtonComponent';
import { useState } from 'react';
import ButtonBack from '../../components/BackButtonComponent';

export default function StepThree({navigation}) {
  const [password, setPassword] = useState("");
  const [copyPassword, setCopyPassword] = useState("");
  const [error,setError] = useState({});

  const validate = () => {
    const newError={}
    if (password.length === 0 || password.length > 8) {
      newError.password = 'Contraseña inválida.';
    }else{
        if(password !== copyPassword)
            newError.copyPassword = "La contraseña no coincide.";
    }

    setError(newError);
    return Object.keys(newError).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      navigation.navigate("signIn");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ButtonBack navigation={navigation}/>
      <View style={styles.content}>
        <TextComponent type={"subtitle"}>Cambiar Contraseña</TextComponent>
        <TextComponent type={"info"}>Elegí una nueva contraseña para tu usuario. Una vez restablecida deberás iniciar sesion nuevamente.</TextComponent>
        <View style={styles.input}>
          <InputComponent
            value={password}
            onChangeText={setPassword}
            placeholder={"Nueva contraseña"}
            error={error.password}
          />
          <InputComponent
            value={copyPassword}
            onChangeText={setCopyPassword}
            placeholder={"Repeti la contraseña"}
            error={error.copyPassword}
          />
        </View>
        <ButtonComponent onPress={handleNext}>Cambiar Contraseña</ButtonComponent>
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

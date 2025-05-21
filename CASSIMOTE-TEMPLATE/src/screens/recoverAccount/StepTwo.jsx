import { View,SafeAreaView,StyleSheet,Platform,StatusBar } from "react-native";
import InputComponent from '../../components/InputComponent';
import TextComponent from '../../components/TextComponent';
import ButtonComponent from '../../components/ButtonComponent';
import { useState } from 'react';
import ButtonBack from '../../components/BackButtonComponent';

export default function StepTwo({navigation}) {
  const [code, setCode] = useState("");
  const [error,setError] = useState({});

  const validate = () => {
    const newError={}
    if (code.length === 0 || code.length > 6) {
      newError.code = 'Codigo inválido.';
    }

    setError(newError);
    return Object.keys(newError).length === 0;
  };

  const handleNext = () => {
    if (!validate()) {
      navigation.navigate("stepThree");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ButtonBack navigation={navigation} mode="reset" to="welcome" icon="x"/>
      <View style={styles.content}>
        <TextComponent type={"subtitle"}>Recuperar Contraseña</TextComponent>
        <TextComponent type={"info"}>Ingresá el código que recibiste al correo electrónico</TextComponent>
        <View style={styles.input}>
          <InputComponent
            value={code}
            onChangeText={setCode}
            placeholder={"Código de Correo"}
            error={error.code}
            showValidationIcon={true}
          />
        </View>
        <ButtonComponent onPress={handleNext}>SIGUIENTE</ButtonComponent>
        <TextComponent type={"footer"} onPress={()=>navigation.navigate("signIn")}>Ya tenes una cuenta?</TextComponent>
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

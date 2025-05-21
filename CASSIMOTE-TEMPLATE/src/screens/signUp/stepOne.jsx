import { View,SafeAreaView,StyleSheet,Platform,StatusBar } from "react-native";
import InputComponent from '../../components/InputComponent';
import TextComponent from '../../components/TextComponent';
import ButtonComponent from '../../components/ButtonComponent';
import { useState } from 'react';
import ButtonBack from '../../components/BackButtonComponent';

export default function StepOne({navigation}) {
  const [email, setEmail] = useState("");
  const [nickName, setNickName] = useState("");
  const [error,setError] = useState({});

  const validate = () => {
    const newError={}
    if (!/\S+@\S+\.\S+/.test(email)) {
      newError.email = 'Correo electronico invalido.';
    }

    if (nickName.length <= 0 || nickName.length > 25) {
      newError.nickName = 'Alias invalido.';
    }

    setError(newError);
    return Object.keys(newError).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      navigation.navigate("stepTwo");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ButtonBack navigation={navigation} mode="reset" to="welcome" icon="x" />
      <View style={styles.content}>
        <TextComponent type={"title"}>Casiimote</TextComponent>
        <TextComponent type={"info"}>Guarda tus objetivos y preferencias para sacar el maximo provecho.</TextComponent>
        <View style={styles.input}>
          <InputComponent
            value={email}
            onChangeText={setEmail}
            placeholder="Correo electrónico"
            keyboardType="email-address"
            error={error.email}
            showValidationIcon={true}
          />

          <InputComponent
            value={nickName}
            onChangeText={setNickName}
            placeholder="Alias"
            error={error.nickName}
            showValidationIcon={true}
          />
        </View>
        <ButtonComponent width="65%" color={"#26355D"} onPress={handleNext}>SIGUIENTE</ButtonComponent>
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

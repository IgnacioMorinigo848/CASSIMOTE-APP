import { View,SafeAreaView,StyleSheet,Platform,StatusBar } from "react-native";
import InputComponent from '../../components/InputComponent';
import TextComponent from '../../components/TextComponent';
import ButtonComponent from '../../components/ButtonComponent';
import { useState } from 'react';
import ButtonBack from '../../components/BackButtonComponent';

export default function StepThree ({navigation}){
     const [password, setPassword] = useState("");
    const [error,setError] = useState({});

    const validateCode = () =>{
        const newError={}
        if(password.length === 0 || password.length < 8)
            newError.password = "Contraseña invalida.";

        setError(newError);

        return Object.keys(newError).length === 0;    
    };

    const handleNext =() =>{
       if (!validateCode()) return;
    };


    return (
        <SafeAreaView style={styles.container}>
        <ButtonBack navigation={navigation} mode="reset" to="welcome" icon="x" />
        <View style={styles.content}>
            <TextComponent type={"title"}>Casiimote</TextComponent>
            <TextComponent type={"subtitle"}>Para finalizar ingresá una contraseña</TextComponent>
            <View style={styles.input}>
            <InputComponent
                value={password}
                onChangeText={setPassword}
                placeholder="Contraseña"
                error={error.password}
                showValidationIcon={true}
            />
            </View>
            <ButtonComponent width="65%" color={"#26355D"} onPress={handleNext}>SIGUIENTE</ButtonComponent>
            <TextComponent type={"footer"} onPress={()=>navigation.navigate("signIn")}>Ya tenes una cuenta?</TextComponent>
        </View>
        </SafeAreaView>
  );
};

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

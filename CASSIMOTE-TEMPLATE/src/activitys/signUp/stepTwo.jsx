import { View,SafeAreaView } from "react-native";
import TextComponent from "../../components/sign/text/textComponent";
import ButtonComponent from "../../components/sign/button/buttonComponent";
import InputComponent from "../../components/sign/input/inputComponent";
import { useState } from "react";
import styles from "./styles";
import ButtonBack from "../../components/global/buttonback/buttonBack";


export default function StepTwo({navigation}){
    const [code, setCode] = useState("");
    const [error,setError] = useState({});

    const validateCode = () =>{
        const newError={}
        if(code.length === 0 || code.length > 8)
            newError.code = "Codigo invalido.";

        setError(newError);

        return Object.keys(newError).length === 0;    
    };

    const handleNext =() =>{
       if (!validateCode()){
        navigation.navigate("stepThree");
       }
    };

    return (
    <SafeAreaView style={styles.container}>
      <ButtonBack navigation={navigation}/>
      <View style={styles.content}>
        <TextComponent type={"title"}>Casiimote</TextComponent>
        <TextComponent type={"subtitle"}>Ingresá el código que recibiste al correo electrónico</TextComponent>
        <View style={styles.input}>
          <InputComponent
          value={code}
          onChangeText={setCode}
          placeholder={"Codigo de Correo"}
          keyboardType={""}
          error={error.code}
          />
        </View>
        <ButtonComponent onPress={handleNext}>SIGUIENTE</ButtonComponent>
        <TextComponent type={"footer"}>Ya tenes una cuenta?</TextComponent>
      </View>
    </SafeAreaView>
  );
}

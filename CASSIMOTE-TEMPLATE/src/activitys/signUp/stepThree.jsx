import { View,SafeAreaView} from "react-native";
import TextComponent from "../../components/sign/text/textComponent";
import ButtonComponent from "../../components/sign/button/buttonComponent";
import InputComponent from "../../components/sign/input/inputComponent";
import { useState } from "react";
import styles from "./styles";
import ButtonBack from '../../components/global/buttonback/buttonBack';

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
        <ButtonBack navigation={navigation}/>
        <View style={styles.content}>
            <TextComponent type={"title"}>Casiimote</TextComponent>
            <TextComponent type={"subtitle"}>Para finalizar ingresá una contraseña</TextComponent>
            <View style={styles.input}>
            <InputComponent
            value={password}
            onChangeText={setPassword}
            placeholder={"Contraseña"}
            error={error.password}
            />
            </View>
            <ButtonComponent onPress={handleNext}>SIGUIENTE</ButtonComponent>
            <TextComponent type={"footer"}>Ya tenes una cuenta?</TextComponent>
        </View>
        </SafeAreaView>
  );
};

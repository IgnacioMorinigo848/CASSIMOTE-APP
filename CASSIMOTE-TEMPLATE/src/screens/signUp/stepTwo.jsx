import { View, SafeAreaView, StyleSheet, Platform, StatusBar } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import InputComponent from '../../components/InputComponent';
import TextComponent from '../../components/TextComponent';
import ButtonComponent from '../../components/ButtonComponent';
import ButtonBack from '../../components/BackButtonComponent';
import { validateCode } from '../../hooks/USER-SERVICE/auth/validateCode';
import { getCode } from "../../api/USER-SERVICE/recoverAccount/recoverAccount";
import { AuthContext } from "../../context/AuthContext";

export default function StepTwo({ navigation, route }) {
  const { email } = route.params; 

  const {setToken} = useContext(AuthContext);

  const { code, setCode, error, loading, handleSubmit, getCodeError } = validateCode(navigation);

  const [counter, setCounter] = useState(60); 
  const [canSubmit, setCanSubmit] = useState(true);

 
  useEffect(() => {
    if (counter === 0) {
      setCanSubmit(false);
      return;
    }

    const timer = setInterval(() => {
      setCounter(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [counter]);

  const handleResendCode = async () => {
    let result = await getCode(email);
    if(result?.success){
      setToken(result?.message);
      console.log('Reenviando código a', email);
      setCounter(60);
      setCanSubmit(true);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ButtonBack navigation={navigation} mode="reset" to="welcome" icon="x" />
      <View style={styles.content}>
        <TextComponent type={"title"}>Casiimote</TextComponent>
        <TextComponent type={"subtitle"}>
          Ingresá el código que recibiste al correo electrónico
        </TextComponent>
        <View style={styles.input}>
          <InputComponent
            value={code}
            onChangeText={setCode}
            placeholder="Código"
            error={getCodeError()}
            showValidationIcon={true}
          />
        </View>

        <TextComponent type={"subtitle"} style={{ color: "#000", textAlign: 'center' }}>
          {canSubmit ? `Tiempo restante: ${counter}s` : 'El código ha expirado'}
        </TextComponent>

       {canSubmit && (
         <ButtonComponent
          width="65%"
          color={"#26355D"}
          onPress={handleSubmit}
          disabled={loading || !canSubmit}
        >
      
          {loading ? "Cargando..." : "SIGUIENTE"}
        </ButtonComponent>
       )}
        {!canSubmit && (
          <ButtonComponent
            width="65%"
            color={"#fff"}
            onPress={handleResendCode}
          >
            Reenviar código
          </ButtonComponent>
        )}

        <TextComponent type={"footer"} onPress={() => navigation.navigate("signIn")}>
          Ya tenés una cuenta?
        </TextComponent>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: "center",
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  content: {
    flex: 1,
    marginTop: "20%",
    width: "90%",
    alignContent: "center",
    gap: 40
  },
  input: {
    marginTop: "2%"
  },
  title: {
    color: "#000",
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});

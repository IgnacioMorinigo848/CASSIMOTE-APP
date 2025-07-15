import { View, SafeAreaView, StyleSheet, Platform, StatusBar } from "react-native";
import InputComponent from '../../components/InputComponent';
import TextComponent from '../../components/TextComponent';
import ButtonComponent from '../../components/ButtonComponent';
import ButtonBack from '../../components/BackButtonComponent';
import { useStepThreeForm } from '../../hooks/USER-SERVICE/signUp/useStepThreeForm';
import { CommonActions } from '@react-navigation/native';
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import AddInterest from "../../api/RECIPE-SERVICE/preferences/addPreferences";

export default function StepThree({ navigation }) {
  const { password, setPassword, error, loading, handleSubmit } = useStepThreeForm(navigation);
  const {preferences, nickName,deleteRegister} = useContext(AuthContext);

  const handleSubmitFinal = async () => {
  try {
    console.log("▶️ Entrando al método...");
    console.log("✔️ Datos recibidos:", preferences, nickName);

    if (preferences && nickName) {
      const interests = {
        ability: preferences[0],
        typeOfDish: preferences[1],
        diet: preferences[2],
        intolerances: preferences[3],
        timeSpent: {
          initial: preferences[4]?.tiempoMin ?? 0,
          end: preferences[4]?.tiempoMax ?? 9999,
        },
      };

      console.log("📦 Enviando preferencias:", interests);

      const result = await AddInterest(nickName, interests);
      console.log("✅ Resultado de la API:", result);

      if (result?.success) {
        handleSubmit();
      } else {
        navigation.replace("welcome");
      }
    } else {
      console.warn("⚠️ Faltan datos: preferences o nickName no están definidos.");
      navigation.replace("welcome");
    }
  } catch (error) {
    console.error("❌ Error en handleSubmitFinal:", error);
  }
};


  const getPasswordError = () => {
    if (error?.general == null && error?.password) {
      return error.password;
    }
    return error?.general;
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
            error={getPasswordError()}
            showValidationIcon={true}
            secureTextEntry
          />
        </View>
        <ButtonComponent width="65%" color={"#26355D"} onPress={()=>handleSubmitFinal()} >
          {loading ? "Cargando..." : "SIGUIENTE"}
        </ButtonComponent>
        <TextComponent type={"footer"} onPress={() => navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'signIn' }],
          })
        )}>
          Ya tenes una cuenta?
        </TextComponent>
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

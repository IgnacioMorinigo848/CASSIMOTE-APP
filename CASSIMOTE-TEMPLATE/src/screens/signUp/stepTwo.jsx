import { View, SafeAreaView, StyleSheet, Platform, StatusBar } from "react-native";
import InputComponent from '../../components/InputComponent';
import TextComponent from '../../components/TextComponent';
import ButtonComponent from '../../components/ButtonComponent';
import ButtonBack from '../../components/BackButtonComponent';
import { validateCode } from '../../hooks/USER-SERVICE/auth/validateCode';

export default function StepTwo({ navigation }) {
  const { code, setCode, error, loading, handleSubmit, getCodeError } = validateCode(navigation);

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
        <ButtonComponent width="65%" color={"#26355D"} onPress={handleSubmit} disabled={loading}>
          {loading ? "Cargando..." : "SIGUIENTE"}
        </ButtonComponent>
        <TextComponent type={"footer"} onPress={() => navigation.navigate("signIn")}>
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

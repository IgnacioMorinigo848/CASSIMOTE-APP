import { View, SafeAreaView, StyleSheet, Platform, StatusBar } from "react-native";
import InputComponent from '../../components/InputComponent';
import TextComponent from '../../components/TextComponent';
import ButtonComponent from '../../components/ButtonComponent';
import ButtonBack from '../../components/BackButtonComponent';
import { useStepOneForm } from "../../hooks/USER-SERVICE/signUp/useStepOneForm";

export default function StepOne({ navigation }) {
  const {
    email,
    nickName,
    setEmail,
    setNickName,
    error,
    loading,
    handleSubmit,
    getEmailError
  } = useStepOneForm(navigation);

  return (
    <SafeAreaView style={styles.container}>
      <ButtonBack navigation={navigation} mode="reset" to="welcome" icon="x" />
      <View style={styles.content}>
        <TextComponent type="title">Casiimote</TextComponent>
        <TextComponent type="info">
          Guarda tus objetivos y preferencias para sacar el máximo provecho.
        </TextComponent>

        <View style={styles.input}>
          <InputComponent
            value={email}
            onChangeText={setEmail}
            placeholder="Correo electrónico"
            keyboardType="email-address"
            error={getEmailError()}
            showValidationIcon
          />

          <InputComponent
            value={nickName}
            onChangeText={setNickName}
            placeholder="Alias"
            error={error?.nickName}
            showValidationIcon
          />
        </View>

        <ButtonComponent width="65%" color="#26355D" onPress={handleSubmit} disabled={loading}>
          {loading ? "Cargando..." : "SIGUIENTE"}
        </ButtonComponent>

        <TextComponent type="footer" onPress={() => navigation.navigate("signIn")}>
          ¿Ya tenés una cuenta?
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
    gap: 40,
  },
  input: {
    marginTop: "2%",
  },
  title: {
    color: "#000",
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

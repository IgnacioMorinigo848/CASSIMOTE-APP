import { View, SafeAreaView, StyleSheet, Platform, StatusBar, TouchableOpacity, ScrollView } from "react-native";
import InputComponent from '../../components/InputComponent';
import TextComponent from '../../components/TextComponent';
import ButtonComponent from '../../components/ButtonComponent';
import ButtonBack from '../../components/BackButtonComponent';
import { useStepOneForm } from "../../hooks/USER-SERVICE/signUp/useStepOneForm";
import { useNicknameSuggestions } from "../../hooks/USER-SERVICE/signUp/nicknameSuggestions";
import releaseAccount from "../../hooks/USER-SERVICE/signUp/releaseAccount" 
import { useEffect,useState } from "react";
import TemporaryAlert from "../../components/TemporyAlert";

export default function StepOne({ navigation }) {
  const {
    email,
    nickName,
    exist,
    setEmail,
    setNickName,
    setExist,
    error,
    loading,
    handleSubmit,
    getEmailError
  } = useStepOneForm(navigation);

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const {
    suggestions,
    loadingSuggestions,
    fetchSuggestions
  } = useNicknameSuggestions();


  const handleRealeaseAccount = async () => {
  const resultRealease = await releaseAccount(email); 
  console.log(resultRealease)
  if (resultRealease?.success) {
    setAlertMessage("Cuenta liberada con éxito.");
  } else {
    setAlertMessage("Error al liberar la cuenta. Intentalo más tarde.");
  }

  setShowAlert(true);

  setTimeout(() => {
    setShowAlert(false);
    setAlertMessage(""); 
  }, 2000);
};

  useEffect(() => {
    if (exist && nickName.trim().length > 0) {
      fetchSuggestions(nickName);
    }
    if(exist && nickName.trim().length === 0)
      setExist(!exist)
  }, [exist, nickName]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
      style={styles.content}
       contentContainerStyle={styles.contentContainer}
      >
        <ButtonBack navigation={navigation} mode="reset" to="welcome" icon="x" />
      <View style={styles.title}>
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

          {exist && suggestions.length > 0 && (
            <View style={styles.suggestions}>
              <TextComponent type="info">Alias no disponible. Sugerencias:</TextComponent>
              {suggestions.map((sug, idx) => (
                <TouchableOpacity
                  key={idx}
                  onPress={() => setNickName(sug)}
                  style={styles.suggestionItem}
                >
                  <TextComponent>{sug}</TextComponent>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        <ButtonComponent width="65%" color="#26355D" onPress={handleSubmit} disabled={loading}>
          {loading ? "Cargando..." : "SIGUIENTE"}
        </ButtonComponent>
        {error && error?.statusRegistration && (
          <ButtonComponent width="65%" color="#AF47D2" backgroundColor="#FFDB00" onPress={handleRealeaseAccount}>LIBERAR EMAIL / SOPORTE</ButtonComponent>
        )}
        <TextComponent type="footer" onPress={() => navigation.navigate("signIn")}>
          ¿Ya tenés una cuenta?
        </TextComponent>
      </View>
      </ScrollView>
      <TemporaryAlert visible={showAlert} message={alertMessage} />
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
  content:{
    flex:1,
    width:"100%",
  },
  contentContainer:{
    alignItems:"center"
  },
  title: {
    flex: 1,
    marginTop: "20%",
    width: "90%",
    alignContent: "center",
    gap: 40,
  },
  input: {
    marginTop: "2%",
    gap: 10,
  },
  suggestions: {
    marginTop: 10,
    paddingHorizontal: 10,
  },
  suggestionItem: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: "#eee",
    borderRadius: 8,
    marginVertical: 4,
  }
});

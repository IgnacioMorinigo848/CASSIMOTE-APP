import { View,SafeAreaView,StyleSheet,Platform,StatusBar } from "react-native";
import InputComponent from '../../components/InputComponent';
import TextComponent from '../../components/TextComponent';
import ButtonComponent from '../../components/ButtonComponent';
import ButtonBack from '../../components/BackButtonComponent';
import { useStepThreeForm } from "../../hooks/USER-SERVICE/recoverAccount/useStepThreeForm";

export default function StepThree({navigation}) {
 
  const {
    password,
    copyPassword,
    setPassword,
    setCopyPassword,
    error,
    loading,
    handleSubmit,
    getPasswordError,
  } = useStepThreeForm(navigation);

  return (
    <SafeAreaView style={styles.container}>
      <ButtonBack navigation={navigation}/>
      <View style={styles.content}>
        <TextComponent type={"subtitle"}>Cambiar Contraseña</TextComponent>
        <TextComponent type={"info"}>Elegí una nueva contraseña para tu usuario. Una vez restablecida deberás iniciar sesion nuevamente.</TextComponent>
        <View style={styles.input}>
          <InputComponent
            value={password}
            onChangeText={setPassword}
            placeholder={"Nueva contraseña"}
            error={getPasswordError()}
          />
          <InputComponent
            value={copyPassword}
            onChangeText={setCopyPassword}
            placeholder={"Repeti la contraseña"}
            error={error.copyPassword}
          />
        </View>
        <ButtonComponent onPress={handleSubmit} disabled={loading}>Cambiar Contraseña</ButtonComponent>
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

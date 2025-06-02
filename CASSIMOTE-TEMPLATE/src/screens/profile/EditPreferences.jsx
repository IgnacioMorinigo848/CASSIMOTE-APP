import { View, Text, StatusBar, Platform, SafeAreaView, StyleSheet } from "react-native";
import BackButtonComponent from "../../components/BackButtonComponent";
import InputPreferencesComponent from "./InputPreferencesComponent";
import { preferences } from "../../utils/profile/preferences";
import ButtonComponent from "../../components/ButtonComponent"

export default function EditPreferences({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBarContainer}>
        <View style={styles.row}>
          <BackButtonComponent navigation={navigation} />
          <Text style={styles.title}>Editar Preferencias</Text>
        </View>
      </View>
      <View style={styles.inputContainer}>
        {preferences.map(option =>(
          <InputPreferencesComponent key={option.label} label={option.label} options={option.options}/>
        ))}
      </View>
      <View style={styles.buttonContainer}><ButtonComponent backgroundColor={"#AF47D2"}>Guardar</ButtonComponent></View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  topBarContainer: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#7F7F7F",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical:10,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 15,
  },
  inputContainer:{
    paddingTop:20
  },
  buttonContainer:{
    buttom:0,
    position:"relative",
    marginTop:200
  }
});

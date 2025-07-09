// src/screens/EditPreferences.js
import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StatusBar,
  Platform,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  ActivityIndicator
} from "react-native";
import BackButtonComponent from "../../components/BackButtonComponent";
import InputPreferencesComponent from "./InputPreferencesComponent";
import useUserInterests from "../../api/RECIPE-SERVICE/preferences/getInterests";
import ButtonComponent from "../../components/ButtonComponent";
import { AuthContext } from "../../context/AuthContext";
import updateInterests from "../../api/RECIPE-SERVICE/preferences/updateInterests";
import TemporaryAlert from "../../components/TemporyAlert";

export default function EditPreferences({ navigation }) {
  const { token } = useContext(AuthContext);
  const { questions, loading, error } = useUserInterests(token);
  const [answers, setAnswers] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

 useEffect(() => {
  if (questions && questions.length > 0) {
    const initial = questions.map(q => ({
      label: q.label,
      value: q.selectedValue || ""
    }));
    setAnswers(initial);
  }
}, [questions]);

 const handleChange = (label, value) => {
  setAnswers(prev =>
    prev.map(item =>
      item.label === label ? { ...item, value } : item
    )
  );
};

  const handleSubmit = async () => {
    const newInterests ={
        ability: answers[0].value,
        typeOfDish: answers[1].value,
        diet: answers[2].value,
        intolerances: answers[3].value,
        timeSpent: {
          initial: answers[4]?.value.tiempoMin ?? 0,
          end: answers[4]?.value.tiempoMax ?? 9999,
        },
    }
    
    let response = await updateInterests(token,newInterests);
    console.log(response)
     if (response?.success) {
    setAlertMessage("Preferencias actualizadas con éxito.");
  } else {
    setAlertMessage("No se pudo actualizar las preferencias. Intentalo más tarde.");
  }

  setShowAlert(true);

  setTimeout(() => {
    setShowAlert(false);
    setAlertMessage(""); 
  }, 2000);
  };

  if (loading || !questions) {
    return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.topBarContainer}>
          <View style={styles.row}>
            <BackButtonComponent navigation={navigation} />
            <Text style={styles.title}>Editar Preferencias</Text>
          </View>
        </View>

        <View style={styles.inputContainer}>
  {questions.map(q => (
    <InputPreferencesComponent
      key={q.label}
      label={q.label}
      options={q.options}
      selectedValue={
        answers.find(ans => ans.label === q.label)?.value || ""
      }
      onValueChange={handleChange}
      allowCustom={q.allowCustom}
    />
  ))}
</View>

        <View style={styles.buttonContainer}>
          <ButtonComponent backgroundColor="#AF47D2" onPress={()=>handleSubmit()}>
            Guardar
          </ButtonComponent>
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
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  topBarContainer: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#7F7F7F',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 15,
  },
  inputContainer: {
    paddingTop: 20,
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 40,
    paddingHorizontal: 20,
  },
});


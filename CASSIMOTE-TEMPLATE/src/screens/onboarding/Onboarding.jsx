import React, { useState, useCallback, useContext } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Platform, StatusBar, SafeAreaView } from "react-native";
import QuestionBock from "./QuestionBockComponent.jsx";
import questions from "../../utils/onboarding/questionScript.js";
import { useFocusEffect } from "@react-navigation/native";
import {AuthContext} from "../../context/AuthContext.js";

export default function Onboarding({ navigation }) {
  const [index, setIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [responses, setResponses] = useState([]);
  const [isCurrentAnswerValid, setIsCurrentAnswerValid] = useState(false);
  const {setPreferences,loadPreferences} = useContext(AuthContext);

  const handleBack = useCallback(() => {
    if (index > 0) {
      setIndex(index - 1);
      setSelectedOption(responses[index - 1] ?? null);
    } else {
      navigation.goBack();
    }
  }, [index, responses, navigation]);

  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        headerTitle: "",
        headerLeft: () => (
          <TouchableOpacity onPress={handleBack} style={{ marginLeft: 10 }}>
            <Text style={{ fontSize: 18 }}>←</Text>
          </TouchableOpacity>
        ),
      });
    }, [handleBack])
  );

  const handleNext = () => {
    if (selectedOption !== null) {
      const newResponses = [...responses];
      newResponses[index] = selectedOption.value;

      if (index < questions.length - 1) {
        setResponses(newResponses);
        setIndex(index + 1);
        setSelectedOption(newResponses[index + 1] ?? null);
      } else {
        console.log(newResponses); 
        setResponses(newResponses); 
        setPreferences(newResponses);
        loadPreferences()
        navigation.navigate("signUpFlowStackNatigator");
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.question}>{questions[index].question}</Text>
      <QuestionBock
        question={questions[index].question}
        options={questions[index].options}
        selectedOption={selectedOption}
        onSelect={setSelectedOption}
        onValidChange={setIsCurrentAnswerValid}
      />
      <View style={styles.imformationContainer}>
        <Text style={styles.informationText}>
          Usamos esta informacion para calcular tus neceidades y que tengas recomendaciones personalizadas
        </Text>
      </View>
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.button}
          disabled={!isCurrentAnswerValid}
          onPress={handleNext}
        >
          <Text style={styles.buttonText}>Siguiente</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    width: '100%',
    alignItems: 'center',
  },
  question: {
    fontFamily: 'Inter',
    fontStyle: "bold",
    fontSize: 20,
    lineHeight: 29,
    fontWeight:800,
    color: "#000000",
    padding:20
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  imformationContainer: {
    marginTop: 40,
    paddingHorizontal: 20,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  informationText: {
    fontFamily: 'Inter',
    fontSize: 15,
    lineHeight: 20,
    color: "#26355D",
    textAlign: "center",
  },
  button: {
    width: 337.5,
    height: 53.36,
    left: 9.375,
    top: 33.35,
    backgroundColor: 'rgba(175, 71, 210, 0.46)',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 30,
    lineHeight: 36,
    textAlign: 'center',
    color: '#26355D',
  },
});

import React, { useState,useCallback } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Dimensions } from "react-native";
import QuestionBock from "../components/onboarding/questionBock.jsx"
import questions from "../utils/onboarding/questionScript.js";
import { useFocusEffect } from "@react-navigation/native";
import useScale from "../helper/calculateDimentions.js"

export default function Onboarding({ navigation }) {
  const [index, setIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [responses, setResponses] = useState([]);
  const { scaleWidth, scaleHeight, scaleFont } = useScale();
  const {width,height} = Dimensions.get("window");

const styles = StyleSheet.create({
  container: { flex: 1, padding: scaleWidth(20) },  // padding responsivo
  question: { 
    left: scaleWidth(0),
    top: scaleHeight(13),
    fontFamily: 'Inter',
    fontStyle: "bold",
    fontSize: scaleFont(16),
    lineHeight: scaleFont(29),
    color: "#000000",

  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: scaleHeight(20),
  },
  imformationContainer: {
  marginTop: scaleHeight(40),
  paddingHorizontal: scaleWidth(20),
  width: "100%",
  alignItems: "center",
  justifyContent: "center",
},

informationText: {
  fontFamily: 'Inter',
  fontSize: scaleFont(15),
  lineHeight: scaleHeight(20),
  color: "#26355D",
  textAlign: "center",
},
  button: {
    width: scaleWidth(337.5),     
    height: scaleHeight(53.36),  
    left: scaleWidth(9.375),      
    top: scaleHeight(33.35),     
    backgroundColor: 'rgba(175, 71, 210, 0.46)',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: scaleFont(30),
    lineHeight: scaleHeight(36),
    textAlign: 'center',
    color: '#26355D',
  },
});


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
      headerTitle:"",
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
      newResponses[index] = selectedOption;
      setResponses(newResponses);
      if (index < questions.length - 1) {
        setIndex(index + 1);
        setSelectedOption(newResponses[index + 1] ?? null);
      } else {
        navigation.navigate("signUpFlowStackNatigator");
      }
    }
  };

  

  return (
    <View style={styles.container}>
      <Text style={styles.question}>{questions[index].question}</Text>
      <QuestionBock
        options={questions[index].options}
        selectedOption={selectedOption}
        onSelect={setSelectedOption}
      />
      <View style={styles.imformationContainer}>
        <Text style={styles.informationText} >Usamos esta informacion para calcular tus neceidades y que tengas recomendaciones personalizadas</Text>
      </View>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>Siguiente</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

};


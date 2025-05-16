import React, { useState,useCallback } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import QuestionBock from "../components/onboarding/questionBock.jsx"
import questions from "../utils/onboarding/questionScript.js";
import { useFocusEffect } from "@react-navigation/native";

export default function Onboarding({ navigation }) {
  const [index, setIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [responses, setResponses] = useState([]);

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
        console.log("Respuestas:", newResponses);
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
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>Siguiente</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  question: { fontSize: 18, marginBottom: 16 },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#B47CF2",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
});

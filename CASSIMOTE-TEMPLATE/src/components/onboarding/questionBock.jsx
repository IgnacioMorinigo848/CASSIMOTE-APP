import React from "react";
import { View } from "react-native";
import ResponseBox from "./responseBox";

export default function QuestionBock({ options, selectedOption, onSelect }) {
  return (
    <View>
      {options.map((opt, index) => (
        <ResponseBox
          key={index}
          label={opt}
          selected={selectedOption === opt}
          onPress={() => onSelect(opt)}
        />
      ))}
    </View>
  );
}

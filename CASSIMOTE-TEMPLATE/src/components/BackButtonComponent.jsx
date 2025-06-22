import { TouchableOpacity, StyleSheet, Platform, StatusBar } from "react-native";
import { AntDesign, Feather } from '@expo/vector-icons';

export default function ButtonBack({ navigation, mode = 'goBack', to = 'Home', icon = 'arrow-left',color="black" }) {
  const handlePress = () => {
    if (mode === 'reset') {
      navigation.reset({
        index: 0,
        routes: [{ name: to }],
      });
    } else {
      navigation.goBack();
    }
  };

  return (
    <TouchableOpacity onPress={handlePress} style={[styles.button,{borderColor:color}]}>
      <Feather name={icon} size={23} color={color} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 50, 
    borderWidth: 2,              
  }
});

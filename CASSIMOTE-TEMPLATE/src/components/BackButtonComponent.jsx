import { TouchableOpacity, StyleSheet, Platform, StatusBar } from "react-native";
import { AntDesign, Feather } from '@expo/vector-icons';

export default function ButtonBack({ navigation, mode = 'goBack', to = 'Home', icon = 'arrow-left' }) {
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
    <TouchableOpacity onPress={handlePress} style={styles.button}>
      <Feather name={icon} size={28} color="black" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 50, 
    position: 'absolute',
    borderWidth: 2,            
    borderColor: '#000',   
    left: 15,
    zIndex: 1,
    top: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 50,
  }
});

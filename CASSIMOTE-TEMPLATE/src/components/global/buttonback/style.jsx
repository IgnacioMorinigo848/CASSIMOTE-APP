import { StyleSheet, Platform,StatusBar } from "react-native";

const styles = StyleSheet.create({
    closeButton: {
    position: 'absolute',
    top: 15,
    left: 15,
    zIndex: 1,
    top: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 50,
  }
});

export default styles;
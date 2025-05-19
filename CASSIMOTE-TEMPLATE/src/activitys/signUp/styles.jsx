import { StyleSheet,Platform,StatusBar } from "react-native";

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
  }
});

export default styles;
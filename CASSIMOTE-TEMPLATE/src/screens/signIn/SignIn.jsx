import { useState,useContext } from "react";
import { View, Text,SafeAreaView, StyleSheet,Platform,StatusBar  } from "react-native";
import {ButtonComponent,ButtonBack,InputComponent,RadioButton,validateSignIn} from "./index";
import {AuthContext} from "../../context/AuthContext"

export default function SingIn({navigation}){
    const [email, setEmail] = useState("");
    const [nickName, setNickName] = useState("");
    const [password, setPassword] = useState("");
    const [error,setError] = useState({});
    const [selected, setSelected] = useState(false);
    const { login } = useContext(AuthContext);

    const validate = () => {
        const newError = validateSignIn({ email, nickName, password });
    setError(newError);
    return Object.keys(newError).length === 0;
    };

    const handleLogin = async () => {
    if (validate()){
      const result = await login(nickName, email, password);
        if (result.success) {
        console.log(result.message)
        navigation.navigate("home")
        } else {
          setError(result.message);
          console.log(result.message)
        }
    }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.buttonBackComponet}><ButtonBack navigation={navigation}/></View>
            <View style={styles.content}>
                <Text style={styles.title}>Iniciar Sesion</Text>
                <View style={styles.input}>
                    <InputComponent
                        value={nickName}
                        onChangeText={setNickName}
                        placeholder="Alias"
                        error={error.nickName}
                        showValidationIcon={false}
                    />
                    <InputComponent
                        value={email}
                        onChangeText={setEmail}
                        placeholder="Correo electrónico"
                        error={error.email}
                        showValidationIcon={false}
                    />
                    <InputComponent
                        value={password}
                        onChangeText={setPassword}
                        placeholder="Contraseña"
                        error={error.password}
                        isSecret={true}
                        showValidationIcon={false}
                    />
                </View>
                <View style={styles.footerContainer}>
                    <View style={styles.reminderContent}>
                        <RadioButton selected={selected}onPress={() => setSelected(!selected)} />
                        <Text style={styles.reminderText}>Recuerdame</Text>
                    </View>
                    <View style={styles.forgotPasswordContent}>
                        <Text style={styles.forgotPasswordText} onPress={()=> navigation.navigate("recoverAccountFlowStackNavigator")}>Olvidé la contraseña</Text>
                    </View>
                </View>
                <ButtonComponent onPress={handleLogin}>INICIAR SESION</ButtonComponent>
            </View>
        </SafeAreaView>
    );

}; 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems:"center",
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0, 
  },
  buttonBackComponet:{
    position:"absolute",
    left: 15,
    zIndex: 1,
    top: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 50,
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
  },
  title:{
    color:"#000",
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  footerContainer:{
    flexDirection: 'row',      
    justifyContent: 'space-between', 
    alignItems: 'center',   
  },
  reminderContent:{
    flexDirection: 'row',      
    justifyContent: 'space-between', 
    alignItems: 'center',         
  },
  reminderText:{
    fontSize:18,
    color:"#7F7F7F"
  },
  forgotPasswordContent:{
    flexDirection: 'row',      
    justifyContent: 'space-between', 
    alignItems: 'center',   
  },
  forgotPasswordText:{
    fontSize:18,
    color:"#AF47D2"
  }
});

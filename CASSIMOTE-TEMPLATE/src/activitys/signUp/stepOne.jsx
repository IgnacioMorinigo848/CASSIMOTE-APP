import { View,Text,TouchableOpacity,SafeAreaView } from 'react-native';
import InputComponent from '../../components/sign/input/inputComponent';
import TextComponent from '../../components/sign/text/textComponent';
import ButtonComponent from '../../components/sign/button/buttonComponent';
import { useState } from 'react';
import styles from './styles';
import ButtonBack from '../../components/global/buttonback/buttonBack';

export default function StepOne({navigation}) {
  const [email, setEmail] = useState("");
  const [nickName, setNickName] = useState("");
  const [error,setError] = useState({});

  const validate = () => {
    const newError={}
    if (!/\S+@\S+\.\S+/.test(email)) {
      newError.email = 'Correo electronico invalido.';
    }

    if (nickName.length <= 0 || nickName.length > 25) {
      newError.nickName = 'Alias invalido.';
    }

    setError(newError);
    return Object.keys(newError).length === 0;
  };

  const handleLogin = () => {
    if (!validate()) {
      navigation.navigate("stepTwo");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ButtonBack navigation={navigation}/>
      <View style={styles.content}>
        <TextComponent type={"title"}>Casiimote</TextComponent>
        <TextComponent type={"subtitle"}>Guarda tus objetivos y preferencias para sacar el maximo provecho.</TextComponent>
        <View style={styles.input}>
          <InputComponent
          value={email}
          onChangeText={setEmail}
          placeholder={"Correo electronico"}
          error={error.email}
          keyboardType="email-address"
          />
          <InputComponent
            value={nickName}
            onChangeText={setNickName}
            placeholder={"Alias"}
            error={error.nickName}
          />
        </View>
        <ButtonComponent onPress={handleLogin}>SIGUIENTE</ButtonComponent>
        <TextComponent type={"footer"}>Ya tenes una cuenta?</TextComponent>
      </View>
    </SafeAreaView>
  );

  
}

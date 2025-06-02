import {
  View, Text, StyleSheet, Image, TouchableOpacity,
  SafeAreaView, StatusBar, Platform
} from "react-native";
import { useState, useEffect } from "react";
import BackButtonComponent from "../../components/BackButtonComponent";
import ButtonComponent from "../../components/ButtonComponent";
import GetImageComponent from "../../components/GetImageComponent";
import { userData } from "../../utils/profile/data";

export default function EditProfile({ navigation }) {
  const [visible, setVisible] = useState(false);
  const [profileImage, setProfileImage] = useState();

  useEffect(() => {
    setProfileImage(userData.profileImage);
  }, []);

  const onImageSelected = async (imageUri) => {
    const uriConTimestamp = imageUri + '?time=' + new Date().getTime();
    console.log('Nueva imagen seleccionada:', uriConTimestamp);
    await Image.prefetch(uriConTimestamp);
    setProfileImage({ uri: uriConTimestamp });
  };

  if (!profileImage) return (<Text>Cargando</Text>);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBarContainer}>
        <View style={styles.row}>
          <BackButtonComponent navigation={navigation} />
          <Text style={styles.title}>Editar Perfil</Text>
        </View>
      </View>
      <View style={styles.content}>
        <View style={styles.buttonProfileContent}>
          <TouchableOpacity style={styles.button} onPress={() => setVisible(true)}>
            <Image
              key={profileImage.uri}
              style={styles.profileImage}
              source={profileImage}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => setVisible(true)}>
            <Text style={styles.buttonText}>Cambiar foto de perfil</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.recoverAccountContent}>
          <ButtonComponent  onPress={()=>navigation.navigate("recoverAccountFlowStackNavigator")}>Cambiar contraseña</ButtonComponent>
        </View>
      </View>
      <GetImageComponent visible={visible} setVisible={setVisible} onImageSelected={onImageSelected} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  topBarContainer: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#7F7F7F",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 15,
  },
  content: {
    flex: 1,
    width: "100%"
  },
  buttonProfileContent: {
    width: "100%",
    alignItems: "center",
    marginTop: 20
  },
  button: {
    marginTop: 20
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 400
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600"
  },
  recoverAccountContent: {
    marginTop: 30
  }
});

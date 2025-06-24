import {
  View, Text, StyleSheet, Image, TouchableOpacity,
  SafeAreaView, StatusBar, Platform
} from "react-native";
import { useState, useEffect, useContext } from "react";
import BackButtonComponent from "../../components/BackButtonComponent";
import ButtonComponent from "../../components/ButtonComponent";
import GetImageComponent from "../../components/GetImageComponent";
import { AuthContext } from "../../context/AuthContext";
import uploadImage from "../../api/IMAGE-SERVICE/uploadImage";
import deleteImage from "../../api/IMAGE-SERVICE/deleteImage";
import updateProfile from "../../api/USER-SERVICE/profile/updateProfile";
import { useRoute } from "@react-navigation/native";
import * as FileSystem from 'expo-file-system';

const DEFAULT_IMAGE = 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y';

export default function EditProfile({ navigation }) {
  const [visible, setVisible] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const { token } = useContext(AuthContext);
  const route = useRoute();

  const {image,nickName} = route.params;

  useEffect(() => {
    setProfileImage({uri:image});
  }, []);

  const onImageSelected = async (imageUri) => {
    try {
      const base64String = await FileSystem.readAsStringAsync(imageUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const base64Image = `data:image/jpeg;base64,${base64String}`;
      const imageWithTimestamp = { uri: imageUri + '?time=' + new Date().getTime() };

      setProfileImage(imageWithTimestamp);

      const { url } = await uploadImage(base64Image);
      console.log("url obtenida", url)
      const { oldUrl } = await updateProfile(token, url);

      if (oldUrl) {
        await deleteImage(oldUrl, token);
      }
    } catch (error) {
      console.error('🔴 Error al actualizar imagen:', error.message);
    }
  };

  if (!profileImage) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={{ textAlign: 'center', marginTop: 20 }}>Cargando imagen de perfil...</Text>
      </SafeAreaView>
    );
  }

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
             {image ? (
                <Image style={styles.profileImage} source={{uri:image}} />
              ) : (
                <Text style={styles.initialsText}>{getInitials(nickName)}</Text>
              )}
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => setVisible(true)}>
            <Text style={styles.buttonText}>Cambiar foto de perfil</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.recoverAccountContent}>
          <ButtonComponent onPress={() => navigation.navigate("recoverAccountFlowStackNavigator")}>
            Cambiar contraseña
          </ButtonComponent>
        </View>
      </View>
      <GetImageComponent visible={visible} setVisible={setVisible} onImageSelected={onImageSelected} />
    </SafeAreaView>
  );
}

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
  },
   initialsText: {
    color: '#AF47D2',
    fontSize: 18,
    fontWeight: 'bold'
  }
});

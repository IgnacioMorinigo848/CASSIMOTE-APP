import React, { useContext, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
import TemporyAlert from "../components/TemporyAlert";

export default function BottomBar() {
  const { token } = useContext(AuthContext);
  const navigation = useNavigation(); 
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleEvent = (routeName) => {
    if (token !== null) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: routeName }],
        })
      );
    } else {
      setAlertMessage("Se debe iniciar sesión para realizar la operación.");
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        setAlertMessage("");
      }, 2000);
    }
  };

  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navItem} onPress={() => handleEvent("archived")}>
          <MaterialIcons name="bookmark-border" size={24} color="gray" />
          <Text style={styles.label}>Archivado</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => handleEvent("home")}>
          <Ionicons name="home-outline" size={24} color="gray" />
          <Text style={styles.label}>Inicio</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => handleEvent("profileFlowStackNavigator")}>
          <Ionicons name="person-outline" size={24} color="gray" />
          <Text style={styles.label}>Perfil</Text>
        </TouchableOpacity>
      </View>
      <TemporyAlert visible={showAlert} message={alertMessage} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'white',
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  navItem: {
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
    color: 'gray',
  },
});

import {
  View, Text, Modal, TouchableOpacity, StyleSheet, TouchableWithoutFeedback
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function GetImageComponent({ visible, setVisible, onImageSelected }) {

  const elegirImagen = async () => {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== 'granted') {
    alert('Se necesitan permisos para acceder a la galería');
    return;
  }

  const resultado = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: [ImagePicker.MediaType.Image], // ✅ corrección aquí
    allowsEditing: true,
    quality: 1,
  });

  console.log("Resultado galería:", resultado); // útil para debug

  if (!resultado.canceled && resultado.assets && resultado.assets.length > 0) {
    onImageSelected(resultado.assets[0].uri); 
    setVisible(false);
  }
};


  const tomarFoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      return;
    }

    const resultado = await ImagePicker.launchCameraAsync({
      quality: 1,
      allowsEditing: true,
    });

    if (!resultado.canceled) {
      onImageSelected(resultado.assets[0].uri); 
      setVisible(false);
    }
  };

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={() => setVisible(false)}
    >
      <TouchableWithoutFeedback onPress={() => setVisible(false)}>
        <View style={styles.modalBackground}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              <TouchableOpacity onPress={elegirImagen} style={styles.button}>
                <Text style={styles.text}>Galería</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={tomarFoto}>
                <Text style={styles.text}>Tomar foto</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  modalBackground: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: "100%",
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  button: {
    width: "100%",
    alignItems: "center",
    padding: 15,
    marginTop: 2,
    backgroundColor: "rgba(233, 229, 229, 0.89)",
    borderRadius: 5
  },
  text: {
    fontWeight: '700'
  }
});

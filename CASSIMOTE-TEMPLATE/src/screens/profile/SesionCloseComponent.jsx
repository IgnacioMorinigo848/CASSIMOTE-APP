import { Modal, Text, View, TouchableOpacity, TouchableWithoutFeedback, StyleSheet } from "react-native";

export default function SesionCloseComponent({ visible, setVisible }) {
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={() => setVisible(false)}
    >
      <TouchableWithoutFeedback onPress={() => setVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.title}>¿Estás seguro que querés cerrar sesión?</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>SI</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => setVisible(false)}>
                <Text style={styles.buttonText}>NO</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContent: {
    backgroundColor: '#FF8F00',
    padding: 20,
    width: '80%',
    alignItems: 'center'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    textAlign: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: 'space-between', 
    gap: 20
  },
  button: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white', 
    alignItems: "center",
  },
  buttonText: {
    color: '#FF8F00',
    fontWeight: 'bold',
  }
});

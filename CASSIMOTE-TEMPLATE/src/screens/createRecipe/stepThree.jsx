import { View, Text, StyleSheet } from 'react-native';

export default function StepThree() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Crea tu propia receta</Text>
      <View style={styles.messageBox}>
        <Text style={styles.title}>Tu receta fue creada con éxito.</Text>
        <Text style={styles.body}>
          El resto de la comunidad la tendrá disponible luego de ser evaluada por nuestro equipo
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'Inter_700Bold',
  },
  messageBox: {
    backgroundColor: '#A450D6',
    borderRadius: 8,
    padding: 16,
  },
  title: {
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
    fontSize: 14,
  },
  body: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
  },
});
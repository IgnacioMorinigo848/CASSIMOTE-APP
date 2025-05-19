import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  default: {
    fontSize: 14,
    color: '#000',
    textAlign: 'left',
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#A65FD2',
    textAlign: 'center',
    marginBottom: 10,
    textShadowColor: 'rgba(99, 96, 96, 0.75)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
    marginTop:40
  },
  info: {
    fontSize: 15,
    color: '#999',
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 15,
  },
  footer: {
    fontSize: 20,
    color: '#3f3fc3',
    textAlign: 'center',
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
});

export default styles;

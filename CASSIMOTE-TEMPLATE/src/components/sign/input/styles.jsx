import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginBottom:20
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#D4D0D6',
    paddingBottom: 4,
    backgroundColor:"#FFFF",
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 8,
    color: 'black', 
    backgroundColor: 'white', 
  },
  iconContainer: {
    paddingHorizontal: 8,
  },
  inputError: {
    borderBottomColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
});

export default styles;

import { View, TouchableOpacity,Text, StyleSheet } from "react-native";

export default function ButtonComponent({children,width="85%",color="#FFFF",onPress}){
    return(
        <View style={styles.container}>
            <TouchableOpacity style={[styles.button,{width}]} onPress={onPress}>
               <Text style={[styles.text,{color}]}>{children}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: "100%",
    marginVertical: 10,
  },
  button: {
    padding: 12,
    backgroundColor: '#DAA1F3',
    borderRadius: 8,
    alignItems: 'center',
  },
  text: {
    fontWeight: "bold",
    fontSize: 16,
  },
});

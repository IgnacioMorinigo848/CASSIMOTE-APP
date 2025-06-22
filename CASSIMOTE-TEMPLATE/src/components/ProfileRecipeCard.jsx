import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import StarRating from "./StarRating";

export default function ProfileRecipeCard({ recipe, nickName = false, showEdit = false, showDelete = true, onEdit, onDelete }) {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.imageContent}>
        <Image style={styles.image} source={{uri:recipe.image}} />
      </View>
      <View style={styles.contentData}>
        {nickName && <Text style={styles.text}>{recipe.nickName}</Text>}
        <Text style={styles.text}>{recipe.name}</Text>
        <StarRating size={18} rating={3.4} />

        <View style={styles.actions}>
          {showEdit && (
            <TouchableOpacity style={styles.button} onPress={() => onEdit?.(recipe)}>
              <MaterialIcons name="edit" size={20} color="black" />
              <Text style={styles.editText}>Editar receta</Text>
            </TouchableOpacity>
          )}
          {showDelete && (
            <TouchableOpacity style={styles.button} onPress={() => onDelete?.(recipe)}>
              <MaterialIcons name="delete" size={20} color="black" />
              <Text style={styles.deleteText}>Eliminar</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "95%",
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
    marginBottom: 10,
    borderWidth: 3,
    borderColor: "#CAC6C6",
    marginTop: 10,
  },
  imageContent: {
    width: 100,
    height: 100,
    overflow: "hidden",
    marginRight: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  contentData: {
    flex: 1,
    justifyContent: "center",
    gap: 15,
  },
  text: {
    fontWeight: "400",
    fontSize: 18,
    color: "#444",
  },
  actions: {
    flexDirection: "row",
    marginTop: 10,
    gap: 20,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  editText: {
    color: "#000",
  },
  deleteText: {
    color: "purple",
  },
});
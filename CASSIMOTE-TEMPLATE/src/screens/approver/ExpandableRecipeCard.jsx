import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  FlatList,
} from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import StarRating from "../../components/StarRating";

export default function ExpandableRecipeCard({
  recipe,
  showApprove = true,
  showDelete = true,
  onAprove,
  onDelete,
  navigation,
  source,
}) {
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (section) => {
    if (expandedSection === section) {
      setExpandedSection(null); // colapsar si ya estaba abierto
    } else {
      setExpandedSection(section);
    }
  };

  const closeAll = () => setExpandedSection(null);

  return (
    <TouchableWithoutFeedback onPress={closeAll}>
      <View style={styles.cardWrapper}>
        <TouchableOpacity
          style={styles.container}
          activeOpacity={0.9}
        >
          <View style={styles.imageContent}>
            <Image style={styles.image} source={{ uri: recipe.image }} />
          </View>

          <View style={styles.contentData}>
            <Text style={styles.text}>{recipe.nickName}</Text>
            <Text style={styles.text}>{recipe.name}</Text>
            <StarRating size={18} rating={recipe.numberOfStart} />

            <View style={styles.toggleButtons}>
              <TouchableOpacity onPress={() => toggleSection("ingredientes")}>
                <Text style={styles.toggleText}>Ingredientes</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => toggleSection("pasos")}>
                <Text style={styles.toggleText}>Pasos</Text>
              </TouchableOpacity>
            </View>

            {expandedSection === "ingredientes" && recipe.ingredients?.length > 0 && (
              <View style={styles.expandContent}>
                {recipe.ingredients.map((ing, idx) => (
                  <Text key={idx}>• {ing.quantity} {ing.unit} {ing.name}</Text>
                ))}
              </View>
            )}

            {expandedSection === "pasos" && recipe.steps?.length > 0 && (
              <View style={styles.expandContent}>
                {recipe.steps.map((step, idx) => (
                  <Text key={idx}>{idx + 1}. {step.description}</Text>
                ))}
              </View>
            )}
             <View style={styles.actions}>
              {showApprove && (
                <TouchableOpacity style={styles.button} onPress={onAprove}>
                  <MaterialIcons name="edit" size={20} color="black" />
                  <Text style={styles.editText}>Aprobar</Text>
                </TouchableOpacity>
              )}
              {showDelete && (
                <TouchableOpacity style={styles.button} onPress={onDelete}>
                  <MaterialIcons name="delete" size={20} color="black" />
                  <Text style={styles.deleteText}>Rechazar</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </TouchableOpacity>
        
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  cardWrapper: {
    width: "100%",
    alignItems: "center",
  },
  container: {
    width: "95%",
    flexDirection: "row",
    padding: 10,
    alignItems: "flex-start",
    marginBottom: 10,
    borderWidth: 3,
    borderColor: "#CAC6C6",
    marginTop: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  imageContent: {
    width: 100,
    height: 100,
    overflow: "hidden",
    marginRight: 10,
    borderRadius: 8,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  contentData: {
    flex: 1,
    justifyContent: "center",
    gap: 10,
  },
  text: {
    fontWeight: "600",
    fontSize: 16,
    color: "#333",
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
  toggleButtons: {
    flexDirection: "row",
    gap: 20,
    marginTop: 10,
  },
  toggleText: {
    color: "purple",
    fontWeight: "bold",
  },
  expandContent: {
    marginTop: 10,
    backgroundColor: "#f2f2f2",
    padding: 10,
    borderRadius: 8,
  },
});

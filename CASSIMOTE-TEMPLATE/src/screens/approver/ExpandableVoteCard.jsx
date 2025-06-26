import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import StarRating from "../../components/StarRating";

export default function ExpandableVoteCard({
  vote,
  showApprove = true,
  showDelete = true,
  onApprove,
  onDelete
}) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleExpand} style={styles.header}>
        <Text style={styles.userName}>{vote.nickName}</Text>
        <StarRating rating={vote.stars} size={18} />
        <MaterialIcons
          name={expanded ? "keyboard-arrow-up" : "keyboard-arrow-down"}
          size={24}
          color="black"
        />
      </TouchableOpacity>

      {expanded && (
        <View style={styles.detailContainer}>
          <Text style={styles.commentText}>{vote.description}</Text>

          <View style={styles.actions}>
            {showApprove && (
                <TouchableOpacity style={styles.button} onPress={onApprove}>
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
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "95%",
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#CCC",
    borderRadius: 10,
    marginVertical: 8,
    padding: 10,
    alignSelf: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  detailContainer: {
    marginTop: 10,
  },
  commentText: {
    fontSize: 14,
    color: "#444",
    marginBottom: 10,
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

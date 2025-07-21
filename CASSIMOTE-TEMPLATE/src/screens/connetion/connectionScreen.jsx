// components/NoConnectionOverlay.js
import React, { useRef } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const { width, height } = Dimensions.get("window");

export default function ConnectionScreen({ visible, onRetry }) {
  const rotateValue = useRef(new Animated.Value(0)).current;

  if (!visible) return null;

  const handleRefresh = () => {0
    rotateValue.setValue(0);
    Animated.timing(rotateValue, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start(() => {
      onRetry?.();
    });
  };

  const rotation = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.overlay}>
      <View style={styles.content}>
        <Text style={styles.title}>No hay conexión a Internet</Text>
        <TouchableOpacity onPress={handleRefresh} style={styles.iconWrapper}>
          <Animated.View style={{ transform: [{ rotate: rotation }] }}>
            <Ionicons name="refresh" size={50} color="#000" />
          </Animated.View>
        </TouchableOpacity>
        <Text style={styles.subtext}>Toca para reintentar</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width,
    height,
    backgroundColor: "#FFDB00",
    zIndex: 999,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  subtext: {
    marginTop: 10,
    fontSize: 14,
    color: "#333",
  },
  iconWrapper: {
    padding: 10,
    borderRadius: 30,
    backgroundColor: "#fff",
  },
});

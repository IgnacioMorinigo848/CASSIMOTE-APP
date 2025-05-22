import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function BottomBar() {
  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="bookmark-border" size={24} color="gray" />
          <Text style={styles.label}>Archivado</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home-outline" size={24} color="gray" />
          <Text style={styles.label}>Inicio</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="person-outline" size={24} color="gray" />
          <Text style={styles.label}>Perfil</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'white',
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  navItem: {
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
    color: 'gray',
  },
});

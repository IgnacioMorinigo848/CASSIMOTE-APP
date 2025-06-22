import React, { useState } from 'react';
import {
  View, Text, TextInput, StyleSheet,
  TouchableOpacity, FlatList, Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
 
// Simulación de datos
const fakeResults = [
  {
    id: '1',
    usuario: 'Nombre de usuario',
    receta: 'Nombre de la receta',
    estrellas: 5
  }
];

export default function FilteredResultsScreen() {
  const imagen= require('../../assets/homeImages/latest.png')
  const navigation = useNavigation();
  const route = useRoute();
  const tipo = route.params?.tipo || 'usuario'; // 'usuario', 'con', 'sin'
 
  const getPlaceholders = () => {
    if (tipo === 'usuario') return 'Escribí el nombre de usuario';
    if (tipo === 'con') return 'Escribí el ingrediente que queres usar';
    if (tipo === 'sin') return 'Escribí el ingrediente que no queres usar';
    return '';
  };
 
  const getFooterText = () => {
    if (tipo === 'con') return 'Escribí los ingredientes con los que queres cocinar';
    if (tipo === 'sin') return 'Escribí los ingredientes con los que no queres cocinar';
    return null;
  };
 
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <TextInput
          placeholder={getPlaceholders()}
          style={styles.input}
        />
      </View>
 
      {/* Botones de orden */}
      <View style={styles.orderButtons}>
        <TouchableOpacity style={styles.orderButton}>
          <Text>Ordenar por antigüedad</Text>
        </TouchableOpacity>
        {tipo !== 'usuario' && (
          <TouchableOpacity style={styles.orderButton}>
            <Text>Ordenar por nombre de usuario</Text>
          </TouchableOpacity>
        )}
      </View>
 
      {/* Resultados */}
      <FlatList
        data={fakeResults}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={imagen} style={styles.cardImage} />
            <View style={styles.cardText}>
              <Text>{item.usuario}</Text>
              <Text>{item.receta}</Text>
              <Text>⭐⭐⭐⭐⭐</Text>
            </View>
          </View>
        )}
      />
 
      {/* Footer (solo en filtros de ingredientes) */}
      {getFooterText() && (
        <View style={styles.footer}>
          <Text style={styles.footerText}>{getFooterText()}</Text>
        </View>
      )}
    </View>
  );
}
 
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
  },
  input: {
    marginLeft: 10,
    flex: 1,
    fontSize: 16,
  },
  orderButtons: {
    marginTop: 20,
    gap: 10,
  },
  orderButton: {
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRadius: 10,
  },
  card: {
    flexDirection: 'row',
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    overflow: 'hidden'
  },
  cardImage: {
    width: 100,
    height: 100,
  },
  cardText: {
    flex: 1,
    padding: 10,
    justifyContent: 'center'
  },
  footer: {
    marginTop: 20,
    backgroundColor: '#f2f2f2',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center'
  },
  footerText: {
    color: '#333',
    fontSize: 14,
  },
});
 
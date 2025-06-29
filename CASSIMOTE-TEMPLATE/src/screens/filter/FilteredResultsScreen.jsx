import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
  StatusBar,
  ActivityIndicator,
} from 'react-native';

import SearchBar from '../../components/SearchBar';
import { Ionicons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import searchByName from '../../api/RECIPE-SERVICE/search/searchByName';
import searchByNickName from '../../api/RECIPE-SERVICE/search/searchByNickName';
import searchByType from '../../api/RECIPE-SERVICE/search/searchByType';
import searchWithIngredients from '../../api/RECIPE-SERVICE/search/searchWithIngredients';
import searchWithOutIngredients from '../../api/RECIPE-SERVICE/search/searchWithOutIngredients';

import { AuthContext } from '../../context/AuthContext';
import ProfileRecipeCard from '../../components/ProfileRecipeCard';

const FilteredResultScreen = ({ navigation }) => {
  const [selected, setSelected] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { token } = useContext(AuthContext);
  const route = useRoute();
  const { recipesName, errorName, option,text="" } = route.params ?? {};

  useEffect(() => {
    if (option === 1) {
      setSelected(1);
      if (recipesName) {
        setRecipes(recipesName);
        setError(null);
        setSearchTerm(text);
      } else {
        setRecipes([]);
        setError(errorName);
        setSearchTerm(text);
      }
    }
  }, [option, recipesName, errorName,text]);

  const getSearch = async () => {
    if (selected === null || !searchTerm.trim()) return;

    setLoading(true);
    let result;

    try {
      switch (selected) {
        case 0:
          result = await searchByNickName(token, searchTerm);
          break;
        case 1:
          result = await searchByName(token, searchTerm);
          break;
        case 2:
          result = await searchWithIngredients(token, searchTerm);
          break;
        case 3:
          result = await searchWithOutIngredients(token, searchTerm);
          break;
        case 4:
          result = await searchByType(token, searchTerm);
          break;
      }

      if (result?.success) {
        setRecipes(result.recipes);
        setError(null);
      } else {
        setError(result?.message || 'Error desconocido');
        setRecipes([]);
      }
    } catch (e) {
      setError('Error al buscar');
    } finally {
      setLoading(false);
    }
  };

  const filters = [
    'Nombre de Usuario',
    'Nombre de Receta',
    'Con estos Ingredientes',
    'Sin estos ingredientes',
    'Tipo (Carne, Pasta)',
  ];

  const getPlaceholder = () => {
    switch (filters[selected]) {
      case 'Nombre de Usuario':
        return 'Escribí el nombre de usuario';
      case 'Nombre de Receta':
        return 'Escribí el nombre de la receta';
      case 'Con estos Ingredientes':
        return 'Ej: arroz, pollo';
      case 'Sin estos ingredientes':
        return 'Ej: maní, gluten';
      case 'Tipo (Carne, Pasta)':
        return 'Ej: carne, pasta';
      default:
        return 'Escribí tu búsqueda';
    }
  };

  if (loading) return <ActivityIndicator size="large" style={{ flex: 1 }} />;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {selected !== null ? (
          <SearchBar
            placeholder={getPlaceholder()}
            placeholderTextColor="#aaa"
            value={searchTerm}
            onChangeText={setSearchTerm}
            searchAction={getSearch}
            filterAction={() => {setSelected(null);setSearchTerm("");}}
          />
        ) : (
          <Text style={styles.headerText}>Selecciona el filtro para empezar</Text>
        )}

        {selected === null &&
          filters.map((filter, index) => (
            <TouchableOpacity
              key={index}
              style={styles.optionContainer}
              onPress={() => setSelected(index)}
            >
              <Ionicons name="radio-button-off" size={20} color="#888" />
              <Text style={styles.optionText}>{filter}</Text>
            </TouchableOpacity>
          ))}

        {selected !== null && (
          <View style={{ gap: 10 }}>
            <TouchableOpacity style={styles.sortButton}>
              <Ionicons name="swap-vertical" size={18} color="#888" />
              <Text style={styles.sortText}>Ordenar por antigüedad</Text>
            </TouchableOpacity>

            {(selected !== 0 && selected !== 1) && (
              <TouchableOpacity style={styles.sortButton}>
                <Ionicons name="person" size={18} color="#888" />
                <Text style={styles.sortText}>Ordenar por nombre de usuario</Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        <ScrollView style={styles.scrollContainer}>
          {error && <Text style={{ color: 'red', textAlign: 'center' }}>{error}</Text>}
          {!error && recipes &&
            recipes.map((recipe) => (
              <ProfileRecipeCard
                key={recipe._id}
                recipe={recipe}
                showDelete={false}
                navigation={navigation}
              />
            ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default FilteredResultScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    width: '100%',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    width: '90%',
  },
  headerText: {
    color: '#aaa',
    fontSize: 14,
    textAlign: 'center',
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  optionText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#444',
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eee',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  sortText: {
    marginLeft: 8,
    color: '#666',
  },
  scrollContainer: {
    marginTop: 10,
  },
});

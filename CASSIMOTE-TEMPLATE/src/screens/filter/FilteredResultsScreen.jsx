import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
  StatusBar,
  ActivityIndicator
} from 'react-native';

import SearchBar from '../../components/SearchBar';
import { Ionicons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import searchByName from "../../api/RECIPE-SERVICE/search/searchByName"
import searchByNickName from "../../api/RECIPE-SERVICE/search/searchByNickName"
import searchByType from '../../api/RECIPE-SERVICE/search/searchByType';
import searchWithIngredients from '../../api/RECIPE-SERVICE/search/searchWithIngredients';
import  searchWithOutIngredients  from '../../api/RECIPE-SERVICE/search/searchWithOutIngredients';
import { AuthContext } from '../../context/AuthContext';
import ProfileRecipeCard from "../../components/ProfileRecipeCard";

const FilteredResultScreen = ({navigation}) => {
  const [selected, setSelected] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [recipes,setRecipes] = useState()
  const [searchExecuted, setSearchExecuted] = useState(false);;
  const [error,setError] = useState();
  const [loading,setLoading] = useState(false);
  const {token} = useContext(AuthContext);
  const route = useRoute();
  let {option,text } = route.params ?? {};
   
  useEffect(() => {
  if (option !== undefined && text !== "") {
    setSelected(option);
 
    
  }
}, [option,loading,recipes,error,text]);

if (loading) return <ActivityIndicator size="large" style={{ flex: 1 }} />;

const getSearch = async (selected,searchTerm) => {
  console.log("ENTRO AL METODO")
  console.log("imprime",typeof( selected),searchTerm)

  setLoading(true);
  let result;

  if (selected == 0) result = await searchByNickName(token, searchTerm);
  else if (selected === 1) result = await searchByName(token, searchTerm);
  else if (selected === 2) result = await searchWithIngredients(token, searchTerm);
  else if (selected === 3) result = await searchWithOutIngredients(token, searchTerm);
  else if (selected === 4) result = await searchByType(token, searchTerm);

  setLoading(false);

  if (result?.success) {
    setRecipes(result.recipes);
    setError(null);
  } else {
    setError(result?.message || 'Error desconocido');
  }
};


const filters = [
  'Nombre de Usuario',
   'Nombre de Receta',
  'Con estos Ingredientes',
  'Sin estos ingredientes',
  'Tipo (Carne, Pasta)'
];

  const resetFilter = () => {
    setSelected(null);
    setSearchTerm('');
    setSearchExecuted(false);
  };

  const getPlaceholder = () => {
    switch (filters[selected]) {
      case 'Nombre de Usuario':
        return 'Escribí el nombre de usuario';
      case 'Nombre de Receta':
        return 'Escribí el nombre de la receta';
      case 'Con estos Ingredientes':
        return 'Escribí los ingredientes (Ej: arroz, pollo)';
      case 'Sin estos ingredientes':
        return 'Ingredientes a evitar (Ej: maní)';
      case 'Tipo (Carne, Pasta)':
        return 'Escribí el tipo de plato (carne, pasta, etc.)';
      default:
        return 'Escribí tu búsqueda';
    }
  };



  return (
    <SafeAreaView style={styles.container}>
     <View style={styles.content}>
        {selected !== null && (
  <SearchBar
    placeholder={getPlaceholder()}
    placeholderTextColor="#aaa"
    style={styles.searchInput}
    value={searchTerm}
    onChangeText={setSearchTerm}
    searchAction={()=>getSearch(selected,searchTerm)}
    filterAction={() => setSelected(null)}
  />
)}

    
        {!selected && (
          <Text style={styles.headerText}>Selecciona el filtro para empezar</Text>
        )}

        {selected === null && filters.map((filter, index) => (
          <TouchableOpacity
            key={index}
            style={styles.optionContainer}
            onPress={() => setSelected(index)}
          >
            <Ionicons
              name={'radio-button-off'}
              size={20}
              color="#888"
            />
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
          {error && <Text>{error}</Text>}
            {!error && recipes && recipes.map((recipe, index) => (
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
    flex:1,
    width: '90%',
  },
  headerButton: {
    backgroundColor: '#f4f4f4',
    borderRadius: 12,
    padding: 12,
    elevation: 3,
    justifyContent: 'center',
    marginBottom: 20,
    minHeight: 50,
  },
  headerText: {
    color: '#aaa',
    fontSize: 14,
    textAlign: 'center',
  },
  inlineSearchBar: {
    flexDirection: 'row',
    alignItems: 'center',
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
  card: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 20,
  },
  image: {
    width: 90,
    height: 90,
  },
  cardInfo: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#444',
  },
  cardSubtitle: {
    color: '#555',
    marginVertical: 4,
  },
  stars: {
    flexDirection: 'row',
  },
});
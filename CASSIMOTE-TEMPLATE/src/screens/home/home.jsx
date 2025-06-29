<<<<<<< HEAD
import React, { useEffect, useContext, useState } from 'react';
=======
import React, { useEffect, useContext,useState } from 'react';
>>>>>>> origin/Nacho
import { View, SafeAreaView, ScrollView, ActivityIndicator, Text } from 'react-native';
import styles from './styles';
import SearchBar from '../../components/SearchBar';
import SectionTitle from '../../components/SectionTitle';
import RecipeCard from '../../components/RecipeCard';
import CategoryCard from '../../components/CategoryCard';
import BottomBar from '../../components/BottonBar';
import useHomeData from '../../api/RECIPE-SERVICE/home/home';
import { AuthContext } from '../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';

export default function Home({navigation}) {
  const { token } = useContext(AuthContext);
  const navigation = useNavigation();

  const [searchText, setSearchText] = useState('');

  const { data, loading, error } = useHomeData(token);
    const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!loading && data) console.log("🟢 HOME DATA:", data);
    if (!loading && error) console.error("🔴 ERROR AL CARGAR HOME:", error);
  }, [loading, data, error]);

  if (loading) return <ActivityIndicator size="large" style={{ flex: 1 }} />;

  if (error) return <Text style={{ color: 'red', textAlign: 'center' }}>Error: {error.message}</Text>;

  const { lastThreeRecipes, diet, timeSpent, ability } = data;
  const categories = [diet, timeSpent, ability];

  // rdenamiento por defecto título ascendente
  const handleSearch = () => {
    if (searchText.trim() !== '') {
      navigation.navigate('filteredResults', {
        fromHome: true,
        query: searchText.trim(),
        selectedFilter: 3,          // Nombre de Receta
        orderBy: 'title',           // Ordenar por nombre de receta
        orderDirection: 'asc',      // Orden ascendente
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
<<<<<<< HEAD
        <SearchBar
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
          onSubmit={handleSearch}
          onFilterPress={() => navigation.navigate('filteredResults', { tipo: '' })}
        />
=======
        <SearchBar 
        value={searchTerm}
        onChangeText={(text) => {setSearchTerm(text)}}
        searchAction={()=>{ navigation.navigate("filteredResults",{option:1,text:searchTerm})}} 
        filterAction={()=> {navigation.navigate("filteredResults")}}
        />
      {lastThreeRecipes?.success && (
        <>
          <SectionTitle title={lastThreeRecipes.title} />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ width:940,height:"auto",gap:20 }}>
            {lastThreeRecipes.recipes.map((item, index) => (
              <RecipeCard key={item._id || index} recipe={item} />
            ))}
          </ScrollView>
        </>
      )}
      
        <SectionTitle title="Categorías" />
     <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 120 }}>
  <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: "space-between", width: "100%" }}>
    {categories.map((item, index) => (
      item?.success && <CategoryCard key={index} data={item} />
    ))}
  </View>
</ScrollView>
>>>>>>> origin/Nacho

        {lastThreeRecipes?.success && (
          <>
            <SectionTitle title={lastThreeRecipes.title} />
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ width: 940, height: "auto", gap: 20 }}
            >
              {lastThreeRecipes.recipes.map((item, index) => (
                <RecipeCard key={item._id || index} recipe={item} />
              ))}
            </ScrollView>
          </>
        )}

        <SectionTitle title="Categorías" />
        <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 120 }}>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: "space-between", width: "100%" }}>
            {categories.map((item, index) => (
              item?.success && <CategoryCard key={index} data={item} />
            ))}
          </View>
        </ScrollView>
      </View>

      <BottomBar />
    </SafeAreaView>
  );
}

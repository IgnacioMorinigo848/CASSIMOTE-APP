import React, { useEffect, useContext,useState } from 'react';
import { View, SafeAreaView, ScrollView, ActivityIndicator, Text } from 'react-native';
import styles from './styles';
import SearchBar from '../../components/SearchBar';
import SectionTitle from '../../components/SectionTitle';
import RecipeCard from '../../components/RecipeCard';
import CategoryCard from '../../components/CategoryCard';
import BottomBar from '../../components/BottonBar';
import useHomeData from '../../api/RECIPE-SERVICE/home/home';
import { AuthContext } from '../../context/AuthContext';
import searchByName from "../../api/RECIPE-SERVICE/search/searchByName"

export default function Home({navigation}) {
  const { token } = useContext(AuthContext);
  const { data, loading, error } = useHomeData(token);
  const [searchTerm, setSearchTerm] = useState('');
  const [loadingSearch,setLoadingSearch] = useState(false);

  if (loading || loadingSearch) return <ActivityIndicator size="large" style={{ flex: 1 }} />;

  if (error) return <Text style={{ color: 'red', textAlign: 'center' }}>Error: {error.message}</Text>;

  const { lastThreeRecipes, diet, timeSpent, ability } = data;

  const categories = [diet, timeSpent, ability];

  const getSearch = async (searchTerm) => {
    if(searchTerm){
  setLoadingSearch(true);
  const result = await searchByName(token, searchTerm);
  setLoadingSearch(false);

  if (result?.success) {
    navigation.navigate("filteredResults", {
      recipesName: result.recipes,
      errorName: null,
      option: 1,
      text:searchTerm
    });
  } else {
    navigation.navigate("filteredResults", {
      recipesName: null,
      errorName: result?.message || 'Error desconocido',
      option: 1,
      text:searchTerm
    });
  }
   setSearchTerm("")
}
};

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <SearchBar 
        value={searchTerm}
        onChangeText={(text) => {setSearchTerm(text)}}
        searchAction={()=>{ getSearch(searchTerm)}} 
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

      </View>

      <BottomBar />
    </SafeAreaView>
  );
}
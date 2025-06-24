import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Platform,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { useContext, useEffect, useState } from 'react';
import ProfileRecipeCard from '../../components/ProfileRecipeCard';
import ButtonBar from "../../components/BottonBar";
import { AuthContext } from '../../context/AuthContext';
import useGetList from '../../api/RECIPE-SERVICE/archived/getList';
import deleteToList from '../../api/RECIPE-SERVICE/archived/deleteToList';

const ArchivedScreen = ({navigation}) => {
  const { token } = useContext(AuthContext);
  const { data, loading, error } = useGetList(token);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    if (!loading && data?.recipes) {
      console.log("🟢 archivado DATA:", data);
      setRecipes(data.recipes);
    }
    if (!loading && error) {
      console.error("🔴 ERROR AL CARGAR archivado:", error);
    }
  }, [loading, data, error]);

  const handleDelete = async (recipeId) => {
    const result = await deleteToList(token, recipeId);
    if (result?.success) {
      setRecipes(prev => prev.filter(r => r.recipeId !== recipeId));
    } else {
      console.error("🔴 Error al eliminar receta archivada");
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.header}>Mis Recetas Archivadas</Text>
        {recipes.length === 0 ? (
          <Text style={styles.emptyMessage}>
            Guarda aquí todas las recetas que queres probar en algún momento
          </Text>
        ) : (
          <FlatList
            data={recipes}
            keyExtractor={(item) => item.recipeId}
            renderItem={({ item }) => (
              <ProfileRecipeCard
                key={item._id}
                recipe={item}
                nickName={true}
                showDelete={true}
                onDelete={() => handleDelete(item.recipeId)}
                navigation={navigation}
                source={"archived"}
              />
            )}
          />
        )}
      </View>
      <ButtonBar />
    </SafeAreaView>
  );
};

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
  header: {
    fontWeight: 'bold',
    fontSize: 16,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  emptyMessage: {
    textAlign: 'center',
    color: '#555',
    marginTop: 50,
    paddingHorizontal: 20,
  },
});

export default ArchivedScreen;

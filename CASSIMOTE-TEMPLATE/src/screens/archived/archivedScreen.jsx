import { View, Text, FlatList, StyleSheet, Platform,SafeAreaView,StatusBar } from 'react-native';
import { useState } from 'react';
import ProfileRecipeCard from '../../components/ProfileRecipeCard';
import ButtonBar from "../../components/BottonBar"

const ArchivedScreen = () => {
  const [recipes, setRecipes] = useState([
  {
    id: "1",
    image: "https://res.cloudinary.com/dtegf9t0m/image/upload/v1744525666/your-folder-name/zy83quf1d1qbfpu4dkeg.jpg" ,
    name: "Ensalada César",
    nickName: "nacho"
  },
  {
    id: "2",
    image: "https://res.cloudinary.com/dtegf9t0m/image/upload/v1744525666/your-folder-name/zy83quf1d1qbfpu4dkeg.jpg" ,
    name: "Pizza Casera",
    nickName: "tomas"
  }
]);


  const handleDelete = (recipeToDelete) => {
    const updated = recipes.filter(recipe => recipe.id !== recipeToDelete.id);
    setRecipes(updated);
  };

  const handleEdit = (recipeToEdit) => {
    console.log('Editar receta:', recipeToEdit);
    // Lógica para redirigir al formulario o modal de edición
  };

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
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                <ProfileRecipeCard
                    recipe={item}
                    showEdit={true}
                    showDelete={true}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
            />

             )}
            />
            )}
      </View>
      <ButtonBar/>
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
    flex:1,
    width: '90%',
  },
  header: {
    fontWeight: 'bold',
    fontSize: 16,
    marginHorizontal: 10,
    marginBottom: 10
  },
  emptyMessage: {
    textAlign: 'center',
    color: '#555',
    marginTop: 50,
    paddingHorizontal: 20
  }
});

export default ArchivedScreen;
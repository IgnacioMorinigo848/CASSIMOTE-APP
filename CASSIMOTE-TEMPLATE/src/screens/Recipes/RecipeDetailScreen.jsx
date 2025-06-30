import React, { useContext, useEffect, useState } from 'react';
import {
  View, Text, Image, StyleSheet, TouchableOpacity, TextInput,
  ScrollView, ActivityIndicator, SafeAreaView, Platform, StatusBar
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from "../../context/AuthContext";
import { useRoute } from '@react-navigation/native';
import Step from './Step';
import QuantityAdjuster from './QuantityAdjuster';
import CommentCard from "./commentCard";
import useRecipeDetails from '../../api/RECIPE-SERVICE/recipeDetails/recipeDetails';
import useGetDetails from "../../api/RECIPE-SERVICE/archived/getDatails";
import useComments from '../../api/RECIPE-SERVICE/comments/comments';
import useDeleteComment from '../../api/RECIPE-SERVICE/comments/deleteComment';
import { calculatePortions, calculatePortionsByIngredient } from "../../utils/portions/portionCalculator";
import ButtonBar from "../../components/BottonBar";
import useExistInList from '../../api/RECIPE-SERVICE/archived/existRecipe';
import prepareRecipeForSend from "../../helper/prepareRecipeForSend";
import addRecipeToList from '../../api/RECIPE-SERVICE/archived/addToList';
import deleteToList from "../../api/RECIPE-SERVICE/archived/deleteToList";
import BackButtonComponent from "../../components/BackButtonComponent"
import InfoRow from './InfoRows';

export default function RecipeDetailScreen({ navigation }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState('Ingredientes');
  const route = useRoute();
  const { id, source = "main" } = route.params ?? {};

  const { token } = useContext(AuthContext);

  const {
  data: recipeData,
  loading: loadingRecipe,
  error: errorRecipe
} = (source === "main" || source === "profile")
  ? useRecipeDetails(token, id)
  : useGetDetails(token, id);

   

  const { dataComment, loadingComment } = useComments(token, id);
  const { dataList } = useExistInList(token, id);

  const [portion, setPortion] = useState(0);
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    if (recipeData) {
      setPortion(recipeData.portions);
      const ingredientsWithOriginal = recipeData.ingredients.map(ing => ({
        ...ing,
        originalQuantity: ing.quantity
      }));
      setIngredients(ingredientsWithOriginal);
      setIsFavorite(dataList?.success);
    }
  }, [recipeData, loadingComment, dataComment]);

  if (loadingRecipe) return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  if (errorRecipe) return <Text style={{ color: 'red', textAlign: 'center' }}>Error: {errorRecipe}</Text>;

  const handleList = async () => {
    try {
      let response;
      if (!isFavorite) {
        const recipe = prepareRecipeForSend(recipeData, ingredients, portion);
        response = await addRecipeToList(token, recipe);
      } else {
        response = await deleteToList(token, id);
      }

      if (response?.success) {
        setIsFavorite(!isFavorite);
      } else {
        alert(response?.message || "No se pudo actualizar la lista.");
      }
    } catch (error) {
      alert("Error al actualizar favoritos: " + error.message);
    }
  };

  const updatePortion = (newPortion) => {
    const result = calculatePortions(recipeData.portions, newPortion, ingredients);
    if (result.success) {
      setPortion(result.data.newPortions);
      setIngredients(result.data.ingredients);
    }
  };

  const updateByIngredient = (index, newQuantity) => {
    const result = calculatePortionsByIngredient(recipeData.portions, newQuantity, ingredients, ingredients[index].name);
    if (result.success) {
      setPortion(result.data.newPortions);
      setIngredients(result.data.ingredients);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await useDeleteComment(token, commentId);
      navigation.replace("RecipeDetail", { id, source });
    } catch (error) {
      alert('Error al eliminar la valoración: ' + error.message);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={{ uri: recipeData.image }} style={styles.image} />
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>


        <View style={styles.starsRow}>
          {[...Array(5)].map((_, i) => (
            <Ionicons
              key={i}
              name={i < recipeData.numberOfStart ? 'star' : 'star-outline'}
              size={24}
              color="gold"
            />
          ))}
          { source !== "profile" &&
          <TouchableOpacity onPress={() => handleList()}>
            <Ionicons
              name={isFavorite ? 'bookmark' : 'bookmark-outline'}
              size={24}
              color="purple"
              style={{ marginLeft: 10 }}
            />
          </TouchableOpacity>
          }
        </View>
        <View style={{alignItems:"center"}}>
        <Text style={{fontSize:18,fontWeight:700,padding:10}}>{recipeData.name}</Text>
        </View>
        <InfoRow
        ingredients={recipeData.ingredients.length}
        difficulty={recipeData.difficulty}
        time={recipeData.time}
        />
        <View style={styles.tabsRow}>
          <TouchableOpacity onPress={() => setActiveTab('Ingredientes')}>
            <Text style={activeTab === 'Ingredientes' ? styles.activeTab : styles.inactiveTab}>
              Ingredientes
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActiveTab('Pasos')}>
            <Text style={activeTab === 'Pasos' ? styles.activeTab : styles.inactiveTab}>
              Pasos
            </Text>
          </TouchableOpacity>
        </View>

        {activeTab === 'Ingredientes' ? (
          <>
            <View style={styles.portionControl}>
              <QuantityAdjuster
                value={portion}
                unit="Porciones"
                onChange={(num) => updatePortion(portion + num)}
                disguise={source}
              />
            </View>

            {ingredients.map((item, index) => (
              <View key={index} style={styles.ingredientRow}>
                <TextInput
                  style={styles.ingredientInput}
                  editable={false}
                  value={item.name}
                />
                <QuantityAdjuster
                  value={item.quantity}
                  unit={item.unit}
                  onChange={(num) => updateByIngredient(index, item.quantity + num)}
                  disguise={source}
                />
              </View>
            ))}
          </>
        ) : (
          <View style={{ padding: 10 }}>
            {recipeData.steps.map((step, i) => (
              <Step key={i} number={i + 1} text={step.description} />
            ))}
          </View>
        )}

        {dataComment && (
          (dataComment.success && !dataComment.userHasVoted) || (!dataComment.success) ? (
            <TouchableOpacity
              style={styles.ratingButton}
              onPress={() => navigation.navigate('AddRating', { id })}
            >
              <Text style={{ color: 'white' }}>Agrega tu valoración de la receta</Text>
            </TouchableOpacity>
          ) : null
        )}

        {dataComment?.success ? (
          dataComment.votes.map((c, index) => {
            const isUserComment = index === 0 && dataComment.userHasVoted;
            return (
              <CommentCard
                key={index}
                user={c.nickName}
                comment={c.description}
                stars={c.stars}
                showDeleteButton={isUserComment}
                onDelete={() => handleDeleteComment(c._id)}
              />
            );
          })
        ) : (
          <Text>{dataComment?.message}</Text>
        )}

      </ScrollView>

      <View style={styles.buttonBarContainer}>
        <ButtonBar />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    paddingBottom: 120, 
  },
 backButton: {
  position: 'absolute',
  top: 30,
  padding: 2,
  borderWidth: 2,
  borderColor: 'white',
  borderRadius: 50,
   top: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 40,
    left: 10,
    zIndex: 10,
},
  image: {
    width: '100%',
    height: 200,
  },
  starsRow: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  recipeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingHorizontal: 10,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  tabsRow: {
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: 'purple',
    marginRight: 20,
    fontWeight: 'bold',
  },
  inactiveTab: {
    color: '#aaa',
    marginRight: 20,
  },
  portionControl: {
    alignItems: 'center',
    marginVertical: 10,
  },
  ingredientRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  ingredientInput: {
    flex: 1,
    backgroundColor: '#eee',
    borderRadius: 8,
    padding: 8,
    marginRight: 10,
  },
  ratingButton: {
    margin: 20,
    backgroundColor: 'purple',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingVertical: 10,
    // sombra ligera para levantarlo visualmente
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
});

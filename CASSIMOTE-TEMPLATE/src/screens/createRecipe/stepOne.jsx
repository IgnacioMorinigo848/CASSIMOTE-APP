import { Feather } from '@expo/vector-icons';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useState, useContext } from 'react';
import BackButtonComponent from "../../components/BackButtonComponent";
import existName from "../../api/RECIPE-SERVICE/createRecipe/existName";
import { AuthContext } from '../../context/AuthContext';

export default function StepOne({ navigation }) {
  const [title, setTitle] = useState("");
  const [exists, setExists] = useState(false);
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState(null);
  const [visible, setVisible] = useState(false); 
  const [recipeData, setRecipeData] = useState(null); 

  const { token } = useContext(AuthContext);

  const handleOptionPress = (option) => {
    const baseRecipe = {
      name: recipeData?.name,
      nickName: recipeData?.nickName,
      image:recipeData?.image,
      description: recipeData?.description || '',
      ingredients: recipeData?.ingredients || [],
      steps: recipeData?.steps || [],
      difficulty: recipeData?.difficulty || 'MEDIO',
      typeOfDiet: recipeData?.typeOfDiet || '',
      typeOfDish: recipeData?.typeOfDish || '',
      time: recipeData?.time || 0,
      image: recipeData?.image || null,
      portions: recipeData?.portions || 1,
    };

    switch (option) {
      case 'Cambiar Nombre':
        setTitle("");
        setExists(false);
        setVisible(false);
        setError(null);
        break;
      case 'Reemplazar Existente':
        navigation.navigate('stepTwo', {
          mode: 'REPLACE',
          recipe: baseRecipe
        });
        break;
      case 'Editar Existente':
        navigation.navigate('stepTwo', {
          mode: 'UPDATE',
          recipe: baseRecipe
        });
        break;
      default:
        break;
    }
  };

  const verificarTitulo = async () => {
    if (!title.trim()) {
      Alert.alert('Por favor, ingresá un título válido.');
      return;
    }
    setChecking(true);
    setError(null);
    try {
      const result = await existName(title.trim(), token);
      console.log("Resultado de existName:", result);
      setExists(result.success);
      setVisible(!result.success);
      setRecipeData(result.recipe);
    } catch (e) {
      setError(e.message);
      setExists(false);
      setVisible(false);
    } finally {
      setChecking(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <BackButtonComponent navigation={navigation} />
        <Text style={styles.headerTitle}>Crea tu propia receta</Text>
      </View>

      {/* Campo título */}
      <Text style={styles.label}>Título</Text>
      <TextInput
        placeholder="Agrega nombre a la receta"
        placeholderTextColor="#B9B9B9"
        value={title}
        onChangeText={text => {
          setTitle(text);
          setExists(false);
          setVisible(false);
          setError(null);
        }}
        editable={!exists && !checking}
        style={styles.input}
      />

      {/* Botón verificar existencia */}
      <TouchableOpacity onPress={verificarTitulo} disabled={checking || !title.trim()}>
        <Text style={styles.verificarTexto}>
          {checking ? "Verificando..." : "Verificar si el título existe"}
        </Text>
      </TouchableOpacity>

      {/* Mostrar error si lo hay */}
      {error && <Text style={{ color: 'red', marginBottom: 10 }}>{error}</Text>}

      {/* Si existe receta */}
      {exists && (
        <>
          <View style={styles.existeBox}>
            <Text style={styles.existeText}>
              Ya tenés una receta creada con el mismo nombre
            </Text>
          </View>

          <View style={styles.botonesContainer}>
            {['Cambiar Nombre', 'Reemplazar Existente', 'Editar Existente'].map((label) => (
              <TouchableOpacity key={label} style={styles.btn} onPress={() => handleOptionPress(label)}>
                <Text style={styles.btnText}>{label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}

      {/* Botón siguiente si NO existe y fue verificado */}
      {visible && (
        <TouchableOpacity
          style={styles.nextBtn}
          onPress={() => navigation.navigate('stepTwo', {
            recipe: {
              name: recipeData.name,
              nickName: recipeData.nickName, 
            }
          })}
        >
          <Text style={styles.nextText}>Crear receta</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingTop: 20,
    flex: 1,
  },
  header: {
    height: 95,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
    marginBottom: 20,
    position: 'relative',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
    fontFamily: 'Inter_700Bold',
  },
  label: {
    fontSize: 16,
    fontFamily: 'Inter_200ExtraLight',
    color: '#000',
    marginBottom: 5,
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, 0.06)',
    borderRadius: 0,
    paddingHorizontal: 10,
    fontSize: 12,
    fontFamily: 'Inter_100Thin',
    color: '#000',
    marginBottom: 10,
  },
  verificarTexto: {
    backgroundColor: 'rgba(218, 174, 235, 0.53)',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    fontSize: 9,
    color: '#000',
    fontFamily: 'Inter_100Thin',
    marginBottom: 20,
  },
  existeBox: {
    backgroundColor: '#EAEAEA',
    padding: 20,
    borderRadius: 4,
    alignItems: 'center',
    marginBottom: 20,
  },
  existeText: {
    color: '#A450D6',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
  botonesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btn: {
    backgroundColor: '#F3E9FB',
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 6,
    flex: 1,
    marginHorizontal: 3,
  },
  btnText: {
    color: '#A450D6',
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '500',
  },
  nextBtn: {
    backgroundColor: '#A450D6',
    paddingVertical: 12,
    borderRadius: 6,
    marginTop: 24,
    alignItems: 'center',
  },
  nextText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

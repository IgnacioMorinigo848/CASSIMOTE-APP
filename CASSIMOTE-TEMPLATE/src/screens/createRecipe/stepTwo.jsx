import React, { useState, useEffect, useContext, useRef } from 'react';
import {
  View, Text, TouchableOpacity, ScrollView, StyleSheet, TextInput,
  Image, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import InputField from '../../components/InputField';
import PlusMinusButton from '../../components/PlusMinusButton';
import IngredientInput from '../../components/IngredientInput';
import InstructionInput from '../../components/InstructionInput';
import GetImageComponent from '../../components/GetImageComponent';
import loadRecipe from '../../api/RECIPE-SERVICE/createRecipe/loadRecipe';
import { AuthContext } from '../../context/AuthContext';
import uploadImage from '../../api/IMAGE-SERVICE/uploadImage';
import * as FileSystem from 'expo-file-system';
import existNameForUpdate from '../../api/RECIPE-SERVICE/createRecipe/existNameForUpdate';
import NetInfo from '@react-native-community/netinfo';
import SelectionComponent from './SelectionComponent';
import questions from '../../utils/onboarding/questionScript';
import prepareRecipeForSend from '../../helper/prepareRecipeForSend';
import updateRecipe from '../../api/RECIPE-SERVICE/createRecipe/updateRecipe';

export default function StepTwo() {
  const navigation = useNavigation();
  const route = useRoute();
  const { mode = 'CREATE', recipe, activate = false, id = '' } = route.params || {};
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [portions, setPortions] = useState(1);
  const [ingredients, setIngredients] = useState([{ name: '', quantity: '', unit: '' }]);
  const [instructions, setInstructions] = useState(['']);
  const [difficulty, setDifficulty] = useState('MEDIO');
  const [minutes, setMinutes] = useState(0);
  const [diet, setDiet] = useState('');
  const [customDiet, setCustomDiet] = useState('');
  const [typeOfDish, setTypeOfDish] = useState('');
  const [customTypeOfDish, setCustomTypeOfDish] = useState('');
  const [image, setImage] = useState(null);
  const [showImagePicker, setShowImagePicker] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({
    name: '', image: '', description: '', diet: '', typeOfDish: '', minutes: '',
    ingredients: [], instructions: [], type: ''
  });
  const { token } = useContext(AuthContext);

  const dietRef = useRef();
  const typeRef = useRef();

  useEffect(() => {
    if (mode !== 'CREATE' && mode !== 'REPLACE' && recipe) {
      setName(recipe.name || '');
      setImage({ uri: recipe.image } || '');
      setDescription(recipe.description || '');
      setPortions(recipe.portions || 1);
      setIngredients(recipe.ingredients || [{ name: '', quantity: '', unit: '' }]);
      setInstructions(recipe.steps?.map(step => step.description) || ['']);
      setDifficulty(recipe.difficulty || 'MEDIO');
      setMinutes(recipe.time || 0);
      setDiet(recipe.typeOfDiet || '');
      setTypeOfDish(recipe.typeOfDish || '');
    }else{
      setName(recipe.name || '');
    }
  }, [mode, recipe]);

  const onImageSelected = async (imageUri) => {
    try {
      const base64String = await FileSystem.readAsStringAsync(imageUri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      const base64Image = `data:image/jpeg;base64,${base64String}`;
      const { url } = await uploadImage(base64Image);
      setImage({ uri: url });
    } catch (error) {
      console.error('Error al actualizar imagen:', error.message);
    }
  };

  const addIngredient = () => setIngredients([...ingredients, { name: '', quantity: '', unit: '' }]);
  const updateIngredient = (index, updated) => {
    const updatedList = [...ingredients];
    updatedList[index] = updated;
    setIngredients(updatedList);
  };
  const removeIngredient = (index) => {
    if (ingredients.length > 1) {
      setIngredients(ingredients.filter((_, i) => i !== index));
    }
  };

  const addInstruction = () => setInstructions([...instructions, '']);
  const updateInstruction = (index, value) => {
    const updated = [...instructions];
    updated[index] = value;
    setInstructions(updated);
  };
  const removeInstruction = (index) => {
    if (instructions.length > 1) {
      setInstructions(instructions.filter((_, i) => i !== index));
    }
  };

  const verifyName = async () => {
    const result = await existNameForUpdate(id, name.trim(), token);
    return result?.success ? result.message : '';
  };

  const validarYContinuar = async () => {
    let hasError = false;
    const newErrors = {
      name: '', image: '', description: '', minutes: '',
      ingredients: [], instructions: []
    };

    const isDietValid = dietRef.current?.validate?.() ?? true;
    const isTypeValid = typeRef.current?.validate?.() ?? true;

    if (!isDietValid || !isTypeValid) {
      hasError = true;
    }

    
       if(activate){
      const response = await verifyName();
      if(response){
        console.log(response)
        newErrors.name = response;
        hasError=true;
      }
      if(!name){
        newErrors.name = "El name es obligatoria";
        hasError=true;
      }
    }

    if (!image) {
      newErrors.image = 'Se debe seleccionar una imagen';
      hasError = true;
    }
    if (!description.trim()) {
      newErrors.description = 'La descripción es obligatoria';
      hasError = true;
    }

    if (!typeOfDish.trim()) {
      newErrors.typeOfDish = 'El tipo de plato es obligatorio';
      hasError = true;
    }

    if (!minutes || isNaN(minutes) || minutes <= 0) {
      newErrors.minutes = 'El tiempo debe ser mayor a cero';
      hasError = true;
    }

    if (ingredients.length === 0) {
      newErrors.ingredients.push({ name: 'Faltan ingredientes', quantity: '', unit: '' });
      hasError = true;
    } else {
      newErrors.ingredients = ingredients.map((i) => {
        const err = {};
        if (!i.name?.trim()) err.name = 'Nombre obligatorio';
        if (i.quantity === '' || isNaN(i.quantity)) err.quantity = 'Cantidad inválida';
        if (!i.unit?.trim()) err.unit = 'Seleccioná una unidad';
        if (Object.keys(err).length > 0) hasError = true;
        return err;
      });
    }

    if (instructions.length === 0) {
      newErrors.instructions.push('Debe haber al menos un paso');
      hasError = true;
    } else {
      newErrors.instructions = instructions.map((step) => {
        const err = !step.trim() ? 'Paso obligatorio' : '';
        if (err) hasError = true;
        return err;
      });
    }

    setFieldErrors((prev) => ({ ...prev, ...newErrors }));
    if (fieldErrors.diet) hasError = true;
    if (fieldErrors.typeOfDish) hasError = true;
    console.log(hasError)
    if (hasError) return;

    const finalDiet = diet.toLowerCase() === 'otro' ? customDiet.trim() : diet.trim();
    const finalTypeOfDish = typeOfDish.toLowerCase() === 'otro' ? customTypeOfDish.trim() : typeOfDish.trim();

    const commonData = {
      ...(id && { id }),
      name: name?.trim(),
      image: image.uri,
      description: description.trim(),
      portions,
      ingredients,
      steps: instructions.map((desc) => ({ description: desc.trim() })),
      difficulty,
      time: minutes,
      typeOfDiet: finalDiet,
      typeOfDish: finalTypeOfDish,
    };

    const recipeToSent = prepareRecipeForSend(commonData, ingredients, portions);
    const netState = await NetInfo.fetch();

    if (!netState.isConnected) {
      navigation.navigate('stepFour', { recipe: commonData, mode, draft });
      return;
    }
    console.log("🚀 Datos a enviar:", recipeToSent);
     console.log("is activate",activate)
    try {
  if (activate) {
    console.log("🛠 Enviando para UPDATE:", recipeToSent);
    await updateRecipe(recipeToSent, token);
  } else {
    console.log("🛠 Enviando para CREATE:", recipeToSent);
    await loadRecipe(recipeToSent, mode, token);
  }
  navigation.navigate('stepThree');
} catch (error) {
  console.error("🔥 Error en la petición:", error.message || error);
}
    navigation.navigate('stepThree');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView style={styles.container}>
          <Text style={styles.label}>Imagen</Text>
          {fieldErrors.image && <Text style={styles.error}>{fieldErrors.image}</Text>}
          {image ? (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
              <Image source={image} style={styles.imagePreview} />
              <TouchableOpacity onPress={() => setImage(null)} style={styles.removeImageBtn}>
                <Ionicons name="trash" size={20} color="black" />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity style={styles.addBtn} onPress={() => setShowImagePicker(!showImagePicker)}>
              <Text style={styles.addBtnText}>+</Text>
            </TouchableOpacity>
          )}
          <GetImageComponent visible={showImagePicker} setVisible={setShowImagePicker} onImageSelected={onImageSelected} />

          {activate && <>
            <Text style={styles.label}>Nombre</Text>
            <InputField placeholder="Nombre brevemente el plato" value={name} onChangeText={setName} />
            {fieldErrors.name && <Text style={styles.error}>{fieldErrors.name}</Text>}
          </>}

          <Text style={styles.label}>Descripción</Text>
          <InputField placeholder="Describe brevemente el plato" value={description} onChangeText={setDescription} />
          {fieldErrors.description && <Text style={styles.error}>{fieldErrors.description}</Text>}

          <Text style={styles.label}>Porciones</Text>
          <View style={styles.row}>
            <PlusMinusButton symbol="-" onPress={() => setPortions(Math.max(1, portions - 1))} />
            <Text style={styles.centeredText}>{portions} Porciones</Text>
            <PlusMinusButton symbol="+" onPress={() => setPortions(portions + 1)} />
          </View>

          <Text style={styles.label}>Ingredientes</Text>
          {ingredients.map((item, index) => (
            <View key={index} style={{ marginBottom: 12 }}>
              <IngredientInput ingredient={item} onChange={(updated) => updateIngredient(index, updated)} error={fieldErrors.ingredients[index] || {}} />
              {ingredients.length > 1 && (
                <TouchableOpacity onPress={() => removeIngredient(index)}>
                  <Text style={styles.removeText}>🗑️ Borrar ingrediente</Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
          <TouchableOpacity onPress={addIngredient} style={styles.agregarBtn}>
            <Ionicons name="add" size={14} />
            <Text style={styles.agregarBtnText}> Agregar ingrediente</Text>
          </TouchableOpacity>

          <Text style={styles.label}>Instrucciones</Text>
          {instructions.map((step, index) => (
            <View key={index} style={{ marginBottom: 12 }}>
              <InstructionInput value={step} onChange={(text) => updateInstruction(index, text)} error={fieldErrors.instructions[index]} />
              {instructions.length > 1 && (
                <TouchableOpacity onPress={() => removeInstruction(index)}>
                  <Text style={styles.removeText}>🗑️ Borrar instrucción</Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
          <TouchableOpacity onPress={addInstruction} style={styles.agregarBtn}>
            <Ionicons name="add" size={14} />
            <Text style={styles.agregarBtnText}> Agregar instrucción</Text>
          </TouchableOpacity>

          <Text style={styles.label}>Dificultad</Text>
          <View style={styles.row}>
            {['BAJO', 'MEDIO', 'ALTO'].map((level) => (
              <TouchableOpacity key={level} style={[styles.levelBtn, difficulty === level && styles.selectedLevel]} onPress={() => setDifficulty(level)}>
                <Text>{level}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>Tiempo</Text>
          <View style={styles.row}>
            <TextInput
              style={styles.timeInput}
              placeholder="Minutos"
              value={minutes.toString()}
              onChangeText={(text) => {
                const num = parseInt(text, 10);
                if (!isNaN(num) && num >= 0) setMinutes(num);
                else if (text === '') setMinutes(0);
              }}
              keyboardType="numeric"
              maxLength={3}
            />
            <Text style={styles.centeredText}>minutos</Text>
          </View>
          {fieldErrors.minutes && <Text style={styles.error}>{fieldErrors.minutes}</Text>}

          <Text style={styles.label}>Tipo de Dieta</Text>
          <SelectionComponent
            ref={dietRef}
            options={questions[2].options}
            defaultValue={diet}
            fieldKey="diet"
            fieldErrors={fieldErrors}
            setFieldErrors={setFieldErrors}
            onChange={(value) => setDiet(value)}
            customValue={customDiet}
            setCustomValue={setCustomDiet}
          />

          <Text style={styles.label}>Tipo de Plato</Text>
          <SelectionComponent
            ref={typeRef}
            options={questions[1].options}
            defaultValue={typeOfDish}
            fieldKey="typeOfDish"
            fieldErrors={fieldErrors}
            setFieldErrors={setFieldErrors}
            onChange={(value) => setTypeOfDish(value)}
            customValue={customTypeOfDish}
            setCustomValue={setCustomTypeOfDish}
          />

          <TouchableOpacity style={styles.saveBtn} onPress={validarYContinuar}>
            <Text style={styles.saveText}>Guardar y continuar</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  label: { fontSize: 16, fontWeight: 'bold', marginTop: 16 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, marginVertical: 10 },
  addBtn: { width: 24, height: 24, backgroundColor: '#DAAEEB', justifyContent: 'center', alignItems: 'center', borderRadius: 4 },
  addBtnText: { fontSize: 18, fontWeight: 'bold' },
  centeredText: { fontSize: 14 },
  agregarBtn: { flexDirection: 'row', alignItems: 'center', marginVertical: 10, gap: 4 },
  agregarBtnText: { fontSize: 12 },
  levelBtn: { flex: 1, backgroundColor: '#eee', padding: 10, borderRadius: 4, alignItems: 'center' },
  selectedLevel: { backgroundColor: '#DAAEEB' },
  saveBtn: { backgroundColor: '#A450D6', padding: 16, borderRadius: 8, marginTop: 24, marginBottom: 100, alignItems: 'center' },
  saveText: { color: '#fff', fontWeight: 'bold' },
  timeInput: { width: 60, backgroundColor: '#f0f0f0', borderRadius: 4, padding: 10, fontSize: 14, textAlign: 'center' },
  imagePreview: { width: 80, height: 80, borderRadius: 8, marginRight: 10 },
  removeImageBtn: { padding: 6, backgroundColor: '#eee', borderRadius: 8 },
  removeText: { color: '#A450D6', fontSize: 12, marginTop: 4, marginLeft: 4 },
  error: { color: '#9C1515', fontSize: 12, marginBottom: 6 },
});

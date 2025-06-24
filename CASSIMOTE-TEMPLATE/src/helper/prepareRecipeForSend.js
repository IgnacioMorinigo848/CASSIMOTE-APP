
export default function prepareRecipeForSend(data, ingredients, portion) {
  if (!data || !ingredients || !Array.isArray(ingredients)) {
    throw new Error("Datos incompletos para construir la receta.");
  }

  const cleanedIngredients = ingredients.map(({ name, quantity, unit }) => ({
    name,
    quantity,
    unit,
  }));

  const recipeToSend = {
    recipeId: data._id || data.recipeId, 
    name: data.name,
    image: data.image,
    description: data.description,
    ingredients: cleanedIngredients,
    steps: data.steps, 
    typeOfDish: data.typeOfDish,
    difficulty: data.difficulty,
    typeOfDiet: data.typeOfDiet,
    portions: portion,
    time: data.time,
    numberOfStart: data.numberOfStart || 0,
  };

  return recipeToSend;
}

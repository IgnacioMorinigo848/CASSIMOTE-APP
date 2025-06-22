export default function prepareRecipeForSend(data, ingredients, portions) {
  if (!data || !ingredients || !Array.isArray(ingredients)) {
    throw new Error("Datos incompletos para construir la receta.");
  }

  const cleanedIngredients = ingredients.map(({ name, quantity, unit }) => ({
    name,
    quantity,
    unit,
  }));

  const recipeToSend = {
    _id: data._id,
    name: data.name,
    image: data.image,
    description: data.description,
    ingredients: cleanedIngredients,
    steps: data.steps, 
    typeOfDish: data.typeOfDish,
    difficulty: data.difficulty,
    typeOfDiet: data.typeOfDiet,
    portions: portions,
    time: data.time,
    numberOfStart: data.numberOfStart || 0,
  };

  return recipeToSend;
}

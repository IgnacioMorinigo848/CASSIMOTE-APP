
export default function prepareRecipeForSend(data, ingredients, portion) {
  if (!data || !ingredients || !Array.isArray(ingredients)) {
    throw new Error("Datos incompletos para construir la receta.");
  }

  const recipeToSend = {
    ...(data.id && { _id:data.id }),
    name: data.name,
    image: data.image,
    description: data.description,
    ingredients: ingredients?.map(item => ({
      name: item.name.trim(),
      quantity: item.quantity,
      unit: item.unit.trim()
    })) || [],
    steps: data.steps?.map(step => ({ description: (step.description || step).trim() })) || [],
    typeOfDish: data.typeOfDish,
    difficulty: data.difficulty,
    typeOfDiet: data.typeOfDiet,
    portions: portion,
    time: data.time,
  };

  return recipeToSend;
}

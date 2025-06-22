export const unidades = ['gr', 'kg', 'ml', 'l', 'cucharadas', 'taza', 'unidad'];

const getDecimalsByUnit = (unit) => {
  switch (unit) {
    case 'unidad':
      return 0; // entero
    case 'cucharadas':
    case 'taza':
      return 1; // media cucharada / media taza
    case 'gr':
    case 'ml':
      return 0; // enteros
    case 'kg':
    case 'l':
      return 2; // más precisión
    default:
      return 2;
  }
};

const roundQuantity = (value, unit) => {
  const decimals = getDecimalsByUnit(unit);
  return parseFloat(value.toFixed(decimals));
};

export const calculatePortions = (recipePortions, portion, ingredients) => {
  if (portion <= 0 || !recipePortions || typeof recipePortions !== 'number') {
    return { success: false, message: 'Porción deseada o porciones originales inválidas.' };
  }

  const factor = portion / recipePortions;

  const adjustedIngredients = ingredients.map(item => {
    const quantity = parseFloat(item.originalQuantity);
    if (isNaN(quantity)) return null;

    return {
      ...item,
      quantity: roundQuantity(quantity * factor, item.unit)
    };
  }).filter(Boolean);

  return { success: true, data: { newPortions: portion, ingredients: adjustedIngredients } };
};

export const calculatePortionsByIngredient = (recipePortions, targetQuantity, ingredients, ingredientName) => {
  const referenceIngredient = ingredients.find(item => item.name === ingredientName);
  if (!referenceIngredient) {
    return { success: false, message: 'Ingrediente no encontrado en la receta.' };
  }

  const refOriginal = parseFloat(referenceIngredient.originalQuantity);
  if (isNaN(refOriginal) || refOriginal === 0 || targetQuantity <= 0) {
    return { success: false, message: 'Cantidad deseada o datos inválidos.' };
  }

  const factor = targetQuantity / refOriginal;

  const adjustedIngredients = ingredients.map(item => {
    const quantity = parseFloat(item.originalQuantity);
    if (isNaN(quantity)) return null;

    return {
      ...item,
      quantity: roundQuantity(quantity * factor, item.unit)
    };
  }).filter(Boolean);

  const adjustedPortions = roundQuantity(recipePortions * factor, 'unidad'); // porciones enteras o medias

  return {
    success: true,
    data: {
      newPortions: adjustedPortions,
      ingredients: adjustedIngredients
    }
  };
};

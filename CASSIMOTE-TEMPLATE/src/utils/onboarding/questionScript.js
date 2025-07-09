// utils/onboarding/questionScript.js
export default questions = [
  {
    label: "Habilidad en la Cocina",
    question: "¿Cuál es tu habilidad en la cocina?",
    allowCustom: false,
    options: [
      { label: "Bajo (recién empiezo)", value: "BAJO" },
      { label: "Medio (me defiendo bien)", value: "MEDIO" },
      { label: "Alto (soy todo un chef)", value: "ALTO" },
    ]
  },
  {
    label: "Tipo de Plato",
    question: "¿Qué tipo de plato te representa?",
    allowCustom: true,
    options: [
      { label: "Pastas", value: "Pastas" },
      { label: "Sopas", value: "Sopas" },
      { label: "Postres", value: "Postres" },
      { label: "Cereales", value: "Cereales" },
    ]
  },
  {
    label: "Tipo de Dieta",
    question: "¿Qué tipo de dieta te representa?",
    allowCustom: true,
    options: [
      { label: "Omnívoro", value: "Omnivoro" },
      { label: "Vegano", value: "Vegano" },
      { label: "Vegetariano", value: "Vegetariano" },
      { label: "Pescetariano", value: "Pescetariano" },
    ]
  },
  {
    label: "Alergia",
    question: "¿Tenés alguna alergia o intolerancia?",
    allowCustom: true,
    options: [
      { label: "Huevos", value: "Huevos" },
      { label: "Gluten", value: "Gluten" },
      { label: "Lactosa", value: "Lactosa" },
      { label: "Mariscos", value: "Mariscos" },
      { label: "Ninguna", value: "Ninguna" },
    ]
  },
  {
    label: "Tiempo en la Cocina",
    question: "¿Cuánto tiempo sueles dedicarle a cocinar?",
    allowCustom: false,
    options: [
      { label: "Menos de 15 min", value: { tiempoMin: 0, tiempoMax: 15 } },
      { label: "15–45 min",      value: { tiempoMin: 15, tiempoMax: 45 } },
      { label: "Más de 45 min",  value: { tiempoMin: 45, tiempoMax: 9999 } },
    ]
  }
];
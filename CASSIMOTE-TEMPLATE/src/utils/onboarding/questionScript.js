export default questions = [
  {
    label:"Habilidad en la Cocina",
    question: "Cuál es tu habilidad en la cocina ?",
    options: [
      { label: "Bajo (recién empiezo)", value: "bajo" },
      { label: "Medio (me defiendo bien)", value: "medio" },
      { label: "Alto (soy todo un chef)", value: "alto" },
    ]
  },
  {
    label:"Tipo de Plato",
    question: "Qué tipo de plato te representa?",
    options: [
      { label: "Pastas", value: "Pastas" },
      { label: "Sopas", value: "Sopas" },
      { label: "Postres", value: "Postres" },
      { label: "Cereales", value: "Cereales" },
      { label: "Otro", value: "Otro" },
    ]
  },
  {
    label:"Tipo de Dieta",
    question: "Qué tipo de dieta te representa?",
    options: [
      { label: "Omnívoro", value: "Omnivoro" },
      { label: "Vegano", value: "Vegano" },
      { label: "Vegetariano", value: "Vegetariano" },
      { label: "Pescetariano", value: "Pescetariano" },
      { label: "Otro", value: "Otro" },
    ]
  },
  {
    label:"Alergia",
    question: "Tenés alguna alergia o intolerancia?",
    options: [
      { label: "Huevos", value: "Huevos" },
      { label: "Gluten", value: "Gluten" },
      { label: "Lactosa", value: "Lactosa" },
      { label: "Mariscos", value: "Mariscos" },
      { label: "Otro", value: "Otro" },
      { label: "Ninguna", value: "Ninguna" },
    ]
  },
  {
    label:"Tiempo en la Cocina",
    question: "Cuánto tiempo sueles dedicarle a cocinar?",
    options: [
      {
        label: "Menos de 15 min (rápido y práctico)",
        value: { tiempoMin: 0, tiempoMax: 15 }
      },
      {
        label: "Entre 15 y 45 min (con tiempo)",
        value: { tiempoMin: 15, tiempoMax: 45 }
      },
      {
        label: "Más de 45 min (disfruto cada paso)",
        value: { tiempoMin: 45, tiempoMax: null } // null = sin límite superior
      }
    ]
  }
];

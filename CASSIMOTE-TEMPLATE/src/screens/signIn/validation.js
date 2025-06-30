export function validateSignIn({ email,password }) {
  const newError = {};

  if (!/\S+@\S+\.\S+/.test(email)) {
    newError.email = 'Correo electrónico inválido.';
  }

  if (!password || password.length < 8) {
    newError.password = 'Contraseña inválida.';
  }

  return newError;
}

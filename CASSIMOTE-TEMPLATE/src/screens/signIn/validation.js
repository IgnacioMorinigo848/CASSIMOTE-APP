export function validateSignIn({ email, nickName, password }) {
  const newError = {};

  if (!/\S+@\S+\.\S+/.test(email)) {
    newError.email = 'Correo electrónico inválido.';
  }

  if (!nickName || nickName.length > 25) {
    newError.nickName = 'Alias inválido.';
  }

  if (!password || password.length < 8) {
    newError.password = 'Contraseña inválida.';
  }

  return newError;
}

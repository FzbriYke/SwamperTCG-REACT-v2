export const validateName = (name) => {
  const v = name.trim();
  if (!v) return 'El nombre es obligatorio.';
  if (v.length < 2) return 'El nombre debe tener al menos 2 caracteres.';
  if (v.length > 50) return 'El nombre no puede superar los 50 caracteres.';
  if (!/^\p{L}+(?: \p{L}+)*$/u.test(v))
    return 'El nombre solo puede tener letras (sin números ni símbolos).';
  return '';
};

export const validateEmail = (email) => {
  const v = email.trim();
  if (!v) return 'El correo es obligatorio.';
  const correoValido = /^[a-z0-9]+(?:[._%+-][a-z0-9]+)*@(?:gmail\.com|duocuc\.cl|outlook\.com|hotmail\.com)$/i;
  if (!correoValido.test(v))
    return 'Ingresa un correo válido (@gmail.com, @duocuc.cl, @outlook.com o @hotmail.com).';
  return '';
};

export const validatePassword = (password) => {
  if (!password) return 'La contraseña es obligatoria.';
  if (password.length < 8) return 'Debe tener al menos 8 caracteres.';
  if (!/[a-z]/.test(password)) return 'Debe incluir una letra minúscula.';
  if (!/[A-Z]/.test(password)) return 'Debe incluir una letra mayúscula.';
  if (!/\d/.test(password)) return 'Debe incluir un número.';
  return '';
};

export const validateConfirm = (password, confirm) => {
  if (!confirm) return 'Confirma tu contraseña.';
  if (password !== confirm) return 'Las contraseñas no coinciden.';
  return '';
};
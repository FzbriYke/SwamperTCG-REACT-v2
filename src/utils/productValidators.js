export const IDIOMAS = ['ingles', 'español', 'japones', 'Bilingue'];
export const ESTADOS = ['NM', 'LP', 'MP', 'HP', 'DMG'];

const isWholeNumber = (v) => /^\d+$/.test(String(v).trim());

export const validateProduct = (v) => {
  const errors = {};

  const name = v.name.trim();
  if (!name) errors.name = 'El nombre es obligatorio.';
  else if (name.length < 2) errors.name = 'El nombre debe tener al menos 2 caracteres.';
  else if (name.length > 60) errors.name = 'El nombre no puede superar los 60 caracteres.';

  const description = v.description.trim();
  if (!description) errors.description = 'La edición o descripción es obligatoria.';
  else if (description.length > 120) errors.description = 'No puede superar los 120 caracteres.';

  if (!isWholeNumber(v.price)) errors.price = 'Ingresa un precio en pesos, solo números enteros.';
  else if (Number(v.price) <= 0) errors.price = 'El precio debe ser mayor que 0.';
  else if (Number(v.price) > 10000000) errors.price = 'El precio no puede superar $10.000.000.';

  if (!isWholeNumber(v.stock)) errors.stock = 'Ingresa un stock entero (0 o más).';
  else if (Number(v.stock) > 9999) errors.stock = 'El stock no puede superar 9999.';

  if (!IDIOMAS.includes(v.idioma)) errors.idioma = 'Selecciona un idioma.';
  if (!ESTADOS.includes(v.estado)) errors.estado = 'Selecciona un estado.';

  if (!/^(\/|https?:\/\/)\S+$/.test(v.image.trim())) {
    errors.image = 'Ingresa una ruta que empiece con / o un enlace https://.';
  }

  return errors;
};
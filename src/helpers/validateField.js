/* eslint-disable no-useless-escape */
export const validateField = (value) => {
  let error;
  if (!value) error = 'Campo requerido.';
  if (value === 0) error = undefined;
  return error;
};

export const validateFielWithNoZero = (value) => {
  let error;
  if (!value) error = 'Campo requerido.';
  return error;
};

export const validateCalendlyLink = (value) => {
  const regex = new RegExp('https://calendly.com/[a-zA-Z0-9]*/[0-9]{2}min');
  return regex.test(value)
    ? undefined
    : 'Link invalido. Formato valido: https://calendly.com/{nombreUsuario}/{tipoReunion}';
};

export const validateNumberField = (value) => {
  let error;
  if (value === '' || value === null || value === undefined) {
    error = 'Campo requerido.';
  } else if (isNaN(value)) {
    error = 'Debe ser un número.';
  } else if (Number(value) < 0) {
    error = 'El número debe ser mayor o igual a 0.';
  }
  return error;
};
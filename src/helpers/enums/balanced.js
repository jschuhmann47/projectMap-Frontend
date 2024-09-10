export const Area = {
  Financiera: 'Financiera',
  Clientes: 'Clientes',
  ProcesosInternos: 'Procesos Internos',
  Aprendizaje: 'Aprendizaje',
};

export const CheckpointsMonths = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
];

export const Trend = {
  Upwards: 'Upwards',
  Downwards: 'Downwards',
  Stable: 'Stable',
};

export const Deviation = {
  None: 'None',
  Acceptable: 'Acceptable',
  Risky: 'Risky',
};

export const DeviationColor = {
  None: '#3BB273',
  Acceptable: '#E1BC29',
  Risky: '#E15554',
};

export const getDeviation = (deviation) => Deviation[deviation] || '';

export const getDeviationColor = (deviation) => DeviationColor[deviation];

export const horizonOptions = {
  1800: 'A cinco años',
  1440: 'A cuatro años',
  1080: 'A tres años',
  720: 'A dos años',
  360: 'A un año',
}

export const frequencyOptions = {
  360: 'Anual',
  180: 'Semestral',
  90: 'Trimestral',
  60: 'Bimestral',
  30: 'Mensual',
}

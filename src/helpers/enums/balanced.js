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

// A 1 año: MENSUAL, BIMESTRAL, TRIMESTRAL
// A 2 años: BIMESTRAL, TRIMESTRAL, SEMESTRAL
// A 3 años: TRIMESTRAL, SEMESTRAL, ANUAL
// A 4 años: SEMESTRAL, ANUAL
// A 5 años: SEMESTRAL, ANUAL
export function filterFrequenciesByHorizon(horizon) {
  if (horizon === 360) {
    return ['Mensual', 'Bimestral', 'Trimestral']
  }
  if (horizon === 720) {
    return ['Bimestral', 'Trimestral', 'Semestral']
  }
  if (horizon === 1080) {
    return ['Trimestral', 'Semestral', 'Anual']
  }
  if (horizon === 1440 || horizon === 1800) {
    return ['Semestral', 'Anual']
  }
  return []
}
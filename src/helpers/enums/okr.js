export const quartersOptions = [
  {
    value: 1,
    label: 'Enero-Marzo',
  },
  {
    value: 2,
    label: 'Abril-Junio',
  },
  {
    value: 3,
    label: 'Julio-Septiembre',
  },
  {
    value: 4,
    label: 'Octubre-Diciembre',
  },
];

export const monthsPerQuarter = {
  1: ['Enero', 'Febrero', 'Marzo'],
  2: ['Abril', 'Mayo', 'Junio'],
  3: ['Julio', 'Agosto', 'Septiembre'],
  4: ['Octubre', 'Noviembre', 'Diciembre'],
};

export const getKeyResultInitialValues = (quarter) => {
  return monthsPerQuarter[quarter]?.map((monthName) => ({
    month: monthName.toLowerCase(),
    value: 0,
  }));
};

export const getKeyResultWitValues = (quarter, values) => {
  return monthsPerQuarter[quarter]?.map((monthName, index) => ({
    month: monthName.toLowerCase(),
    value: values[index].value,
  }));
};

export const horizonOptions = {
  360: 'A un año',
  180: 'A seis meses',
  90: 'A tres meses',
  60: 'A dos meses',
  30: 'A un mes',
  15: 'A quince días'
}

export const frequencyOptions = {
  180: 'Semestral',
  90: 'Trimestral',
  60: 'Bimestral',
  30: 'Mensual',
  15: 'Quincenal',
  7: 'Semanal',
  1: 'Diaria'
}

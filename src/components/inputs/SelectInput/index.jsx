import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import { BootstrapInput, SelectContainer } from './styles';

const SelectInput = (props) => {
  const { field, form, options, placeholder, fontSize } = props;

  return (
    <SelectContainer>
      <Select
        {...field}
        displayEmpty
        input={<BootstrapInput fontSize={fontSize} />}
        value={field.value || ''} // Aseguramos que siempre tenga un valor válido (vacío si no se selecciona nada)
        onChange={(e) => form.setFieldValue(field.name, e.target.value)} // Actualiza el valor en Formik
      >
        <MenuItem value="">
          <em>{placeholder}</em> {/* Mostramos "Sin área" o el placeholder */}
        </MenuItem>
        {Object.entries(options).map(([key, value]) => (
          <MenuItem key={key} value={key}> {/* `key` es el ID del área */}
            {value} {/* `value` es el label del área */}
          </MenuItem>
        ))}
      </Select>
    </SelectContainer>
  );
};

export default SelectInput;

import { Field, Form, Formik } from 'formik';

import Button from 'components/commons/Button';

import { validateField, validateNumberField } from 'helpers/validateField';
import InputV2 from 'components/inputs/InputV2';
import { ButtonsContainer } from 'styles/form';
import { Box, Checkbox, FormControlLabel, FormGroup, Grid, List, ListItem, Typography } from '@mui/material';
import { priorityOptions } from 'helpers/enums/okr';
import ImgSelect from '../ImgSelect';
import { CheckListItemsContainer, KrCheckListItem, KrCheckListItemsContainer } from './styles';
import { useEffect, useState } from 'react';

const colors = ['#FFCDD2', '#F8BBD0', '#E1BEE7', '#C5CAE9', '#BBDEFB', '#B3E5FC', '#B2DFDB', '#C8E6C9', '#DCEDC8', '#FFF9C4', '#FFECB3', '#FFE0B2'];

const KrForm = ({ onSubmit, data }) => {
  const [checklist, setChecklist] = useState(data.keyStatus);
  
  const CircleIcon = ({ color }) => {
    return (
      <Box
        sx={{
          width: 16,
          height: 16,
          borderRadius: '50%',
          backgroundColor: color,
          mr: 2
        }}
      />
    );
  };

  const ordenarFechasParaVista = () => {
    const resultado = [];
    const mitad = Math.ceil(data.keyStatus.length / 2);

    const primeraMitad = data.keyStatus.slice(0, mitad);
    const segundaMitad = data.keyStatus.slice(mitad);

    for (let i = 0; i < Math.max(primeraMitad.length, segundaMitad.length); i = i + 1) {
      if (primeraMitad[i]) {
        resultado.push(primeraMitad[i]);
      }

      if (segundaMitad[i]) {
        resultado.push(segundaMitad[i]);
      }
    }

    return resultado;
  }

  const handleCheckboxChange = (index, values) => {
    const newCheckedList = [...checklist];
    newCheckedList[index].checked = !!newCheckedList[index].checked;
    setChecklist(newCheckedList);
    values.keyStatus[index].checked = !values.keyStatus[index].checked;
  }

  const initialValues = {
    description: data.description,
    _id: data._id,
    responsible: data.responsible, 
    priority: data.priority,
    keyStatus: data.keyStatus
  }

  return (
    <Formik onSubmit={onSubmit} initialValues={ initialValues }>
      {({ values, handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <Grid container spacing={2} sx={{mt: 2, mb: 2}}>
            <Grid item xs={6}>
              <Field
                name="responsible"
                fieldLabel="Responsable"
                component={InputV2}
                validate={validateField}
                inputLayout='inline'
              />
              <Field
                fieldLabel="Prioridad"
                inputLayout='inline'
                value={data.priority}
                component={(props) => {
                  return (
                    <>
                      <Box sx={{display: 'flex'}}>
                        <Box flex={1}>
                          <Typography sx={{ mt: 1 }}>{props.fieldLabel}</Typography>
                        </Box>                    
                        <Box flex={1}>
                          <ImgSelect {...props} style={{sx: {height: "34px"}}}></ImgSelect>
                        </Box>
                      </Box>
                    </>
                  )
                }}
                name="priority"
                options={priorityOptions.map((path, i) => ({ path, value: i }))}
              />
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ display: 'flex' }}>
                <KrCheckListItemsContainer>
                  {values.keyStatus.map((key, index) => (
                    <FormControlLabel control={<Checkbox onChange={() => handleCheckboxChange(index, values)} checked={checklist[index].checked}/>} label={key.description} />
                  ))}
                </KrCheckListItemsContainer>
              </Box>
            </Grid>
          </Grid>
          <ButtonsContainer>
            <Button type="submit">
              Guardar
            </Button>
          </ButtonsContainer>
        </Form>
      )}
    </Formik>
)};

export default KrForm;

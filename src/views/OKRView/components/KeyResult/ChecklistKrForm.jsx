import { Field, Form, Formik } from 'formik';

import Button from 'components/commons/Button';

import { validateField, validateNumberField } from 'helpers/validateField';
import InputV2 from 'components/inputs/InputV2';
import { ButtonsContainer } from 'styles/form';
import { Box, Checkbox, FormControlLabel, FormGroup, Grid, List, ListItem, Typography } from '@mui/material';
import { priorityOptions } from 'helpers/enums/okr';
import ImgSelect from '../ImgSelect';
import { KrCheckListItemsContainer } from './styles';
import { useState } from 'react';

const KrForm = ({ onSubmit, data }) => {
  const [checklist, setChecklist] = useState(data.keyStatus);

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
                          <Typography sx={{ fontFamily: 'Fira Sans', fontSize: '16px', mt: 1 }}>{props.fieldLabel}</Typography>
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

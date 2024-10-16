import { Field, Form, Formik } from 'formik';

import Button from 'components/commons/Button';

import { validateField, validateNumberField } from 'helpers/validateField';
import InputV2 from 'components/inputs/InputV2';
import { ButtonsContainer } from 'styles/form';
import { Box, Grid, List, ListItem, Typography } from '@mui/material';

const colors = ['#FFCDD2', '#F8BBD0', '#E1BEE7', '#C5CAE9', '#BBDEFB', '#B3E5FC', '#B2DFDB', '#C8E6C9', '#DCEDC8', '#FFF9C4', '#FFECB3', '#FFE0B2'];

const ObjForm = ({ onSubmit, data }) => {
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
    const mitad = Math.ceil(data.checkpoints.length / 2);

    const primeraMitad = data.checkpoints.slice(0, mitad);
    const segundaMitad = data.checkpoints.slice(mitad);

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

  const initialValues = {
    action: data.action,
    frequency: data.frequency,
    _id: data._id,
    responsible: data.responsible, 
    baseline: data.baseline, 
    goal: data.goal, 
    checkpoints: data.checkpoints,
    measure: data.measure,
    category: data.category,
  }

  return (
    <Formik onSubmit={onSubmit} initialValues={ initialValues }>
      {({ handleSubmit }) => (
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
                name="baseline"
                fieldLabel="Línea base"
                type="number"
                inputLayout='inline'
                component={InputV2}
                validate={validateNumberField}
              />
              <Field
                name="goal"
                fieldLabel="Resultado esperado"
                type="number"
                inputLayout='inline'
                component={InputV2}
                validate={validateNumberField}
              />
							<Field
                name="measure"
                fieldLabel="Unidad de medida"
                inputLayout='inline'
                component={InputV2}
                validate={validateField}
              />
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ display: 'flex' }}>
                <List sx={{pt: 0, display: "flex", flexWrap: "wrap", width: "400px"}}>
                  {ordenarFechasParaVista().map((_, index) => (
                    <ListItem key={index} sx={{ width: "180px",display: 'flex', alignItems: 'center', p: 0.5, mr: 1.5 }}>
                      <Box sx={{ width: "24px" }}>
                        <CircleIcon color={colors[index]}/>
                      </Box>
                      <Field
                        name={`checkpoints[${index}].current`}
                        fieldLabel={data.checkpoints[index].period}
                        inputLayout='inline'
                        component={InputV2}
                      />
                    </ListItem>
                  ))}
                </List>
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

export default ObjForm;

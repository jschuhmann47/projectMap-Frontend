import { Field, Form, Formik } from 'formik';

import Button from 'components/commons/Button';

import { validateField } from 'helpers/validateField';
import InputV2 from 'components/inputs/InputV2';
import { ButtonsContainer } from 'styles/form';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import { Avatar, Box, Grid, List, ListItem, Slider, Stack, TextField, Typography } from '@mui/material';
import { priorityOptions } from 'helpers/enums/okr';
import ImgSelect from '../ImgSelect';
import { useEffect, useState } from 'react';

const colors = ['#FFCDD2', '#F8BBD0', '#E1BEE7', '#C5CAE9', '#BBDEFB', '#B3E5FC', '#B2DFDB', '#C8E6C9', '#DCEDC8', '#FFF9C4', '#FFECB3', '#FFE0B2'];

const KrForm = ({ onSubmit, data }) => {
  const [priority, setPriority] = useState(0);

  const CircleIcon = ({ color }) => {
    console.log(color)
    return (
      <Box
        sx={{
          width: 16, // Tamaño del círculo
          height: 16, // Tamaño del círculo
          borderRadius: '50%', // Hace que sea un círculo
          backgroundColor: color, // Color del círculo
          mr: 2
        }}
      />
    );
  };

  console.log({data})
  const {
    rangoFechaValores,
    prioridad,
    lineaBase,
    resultadoEsperado
  } = data;

  const handlePriority = (e) => {
    setPriority(e.target.value);
  }
  useEffect(() => {
    setPriority(prioridad ? prioridad : 0);
  }, [prioridad]);

  const ordenarFechasParaVista = () => {
    const resultado = [];
    const mitad = Math.ceil(rangoFechaValores.length / 2);

    const primeraMitad = rangoFechaValores.slice(0, mitad);
    const segundaMitad = rangoFechaValores.slice(mitad);

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

  return (
    <Formik onSubmit={onSubmit} initialValues={{ titulo: '', descripcion: '' }}>
      {({ handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <Grid container spacing={2} sx={{mt: 2, mb: 2}}>
            <Grid item xs={6}>
              <Field
                name="responsable"
                fieldLabel="Responsable"
                component={InputV2}
                validate={validateField}
                inputLayout='inline'
                value={data.responsable}
                props={{"multiline": false}}
              />
              <Field
                name="lineaBase"
                fieldLabel="Linea base"
                inputLayout='inline'
                component={InputV2}
                validate={validateField}
              />
              <Field
                name="resultadoEsperado"
                fieldLabel="Resultado esperado"
                inputLayout='inline'
                component={InputV2}
                validate={validateField}
              />
              <Field
                fieldLabel="Prioridad"
                inputLayout='inline'
                component={(props) => {
                  return (
                    <>
                      <Box sx={{display: 'flex'}}>
                        <Box flex={1}>
                          <Typography sx={{ mt: 1 }}>{props.fieldLabel}</Typography>
                        </Box>                    
                        <Box flex={1}>
                          <ImgSelect {...props} field={{value: priority, onChange: handlePriority, sx:{height: "34px"}}}></ImgSelect>
                        </Box>
                      </Box>
                    </>
                  )
                }}
                name="prioridad"
                options={priorityOptions.map((path, i) => ({ path, value: i }))}
              />
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ display: 'flex' }}>
                {/* Lista de fechas y entradas */}
                <List sx={{pt: 0, display: "flex", flexWrap: "wrap", width: "400px"}}>
                  {ordenarFechasParaVista().map((item, index) => (
                    <ListItem key={index} sx={{ width: "180px",display: 'flex', alignItems: 'center', p: 0.5, mr: 2 }}>
                      {/* Círculo de color */}
                      <CircleIcon color={colors[index]} />
                      {/* Fecha */}
                      <Typography sx={{ mr: 2 }}>{item.fecha}</Typography>
                      {/* Input numérico */}
                      <TextField
                        variant="outlined"
                        size="small"
                        value={item.valor}
                        //onChange={(e) => handleInputChange(index, e)}
                        fullWidth
                        inputProps={{ maxLength: 3, height: "30px" }}
                        sx={{ width: 60, }}
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

export default KrForm;

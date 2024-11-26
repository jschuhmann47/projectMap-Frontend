import { Box, Grid, List, ListItem, Typography } from '@mui/material';
import { priorityOptions } from 'helpers/enums/okr';

const colors = ['#FFCDD2', '#F8BBD0', '#E1BEE7', '#C5CAE9', '#BBDEFB', '#B3E5FC', '#B2DFDB', '#C8E6C9', '#DCEDC8', '#FFF9C4', '#FFECB3', '#FFE0B2'];

const ReadonlyKr = ({ data }) => {
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

  return (
    <Grid container spacing={2} sx={{mt: 2, mb: 2}}>
      <Grid item xs={6}>
        <Typography sx={{ fontFamily: 'Fira Sans' }}>Responsable: {data.responsible}</Typography>
        <Typography sx={{ fontFamily: 'Fira Sans' }}>Línea base: {data.baseline}</Typography>
        <Typography sx={{ fontFamily: 'Fira Sans' }}>Resultado esperado: {data.goal}</Typography>
        <Box sx={{ display: 'flex' }}>
          <Typography sx={{ fontFamily: 'Fira Sans', fontSize: '16px' }}>Prioridad:</Typography>
          <img src={priorityOptions[data.priority]} height="25" width="25" />
        </Box>
      </Grid>
      <Grid item xs={6}>
        <Box sx={{ display: 'flex' }}>
          <List sx={{pt: 0, display: "flex", flexWrap: "wrap", width: "400px"}}>
            {ordenarFechasParaVista().map((_, index) => (
              <ListItem key={index} sx={{ width: "180px",display: 'flex', alignItems: 'center', p: 0.5, mr: 1.5 }}>
                <Box sx={{ width: "24px" }}>
                  <CircleIcon color={colors[index]}/>
                </Box>
                <Typography sx={{ fontFamily: 'Fira Sans' }}>
                  {data.keyStatus[index].period}: {data.keyStatus[index].value}
                </Typography>
              </ListItem>
            ))}
          </List>
        </Box>
      </Grid>
    </Grid>
  )
};

export default ReadonlyKr;

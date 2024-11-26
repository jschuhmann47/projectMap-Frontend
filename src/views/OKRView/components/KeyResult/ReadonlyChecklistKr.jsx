import { Check } from '@mui/icons-material';
import { Box, Grid, IconButton, List, ListItem, Typography } from '@mui/material';
import { priorityOptions } from 'helpers/enums/okr';

const colors = ['#FFCDD2', '#F8BBD0', '#E1BEE7', '#C5CAE9', '#BBDEFB', '#B3E5FC', '#B2DFDB', '#C8E6C9', '#DCEDC8', '#FFF9C4', '#FFECB3', '#FFE0B2'];

const ReadonlyChecklistKr = ({ data }) => {
  const hitos = data?.keyStatus;

  return (
    <Grid container spacing={2} sx={{mt: 2, mb: 2}}>
      <Grid item xs={6}>
        <Typography sx={{ fontFamily: 'Fira Sans' }}>Responsable: {data.responsible}</Typography>
        <Box sx={{ display: 'flex' }}>
          <Typography sx={{ fontFamily: 'Fira Sans', fontSize: '16px' }}>Prioridad:</Typography>
          <img src={priorityOptions[data.priority]} height="25" width="25" />
        </Box>
      </Grid>
      <Grid item xs={6}>
        <Box sx={{ display: 'flex', height: '200px', overflow: 'scroll', width: '100%' }}>
          <List sx={{pt: 0, display: "flex", flexDirection: 'column'}}>
            {hitos && hitos.length && hitos.map((hito, index) => (
              <ListItem key={index} sx={{ display: 'flex',alignItems: 'baseline',flexDirection: 'column', p: 0.5, mr: 1.5 }}>
                <Box sx={{display: 'flex'}}>
                  <Box sx={{width: "35px"}}>
                    {
                    hito.checked && 
                      <>
                        <IconButton size="small" sx={{cursor: 'default',height: "10px", alignItems: "center", pt: 0}} disableRipple>
                          <Check sx={{fontSize: 20, mt: "10px"}}/>
                        </IconButton>
                      </>
                    }
                  </Box>
                  <Box>
                    <Typography sx={{ fontFamily: 'Fira Sans' }}>
                      {hito.description}
                    </Typography>
                  </Box>
                </Box>
                
              </ListItem>
            ))}
          </List>
        </Box>
      </Grid>
    </Grid>
  )
};

export default ReadonlyChecklistKr;

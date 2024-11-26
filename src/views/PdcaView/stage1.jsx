import { ArrowBack, Check, Delete } from "@mui/icons-material";
import { Box, IconButton, TextField, Typography } from "@mui/material";

function ActionItem({ action, onClickRemove }) {
  return <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
    <Typography sx={{ fontFamily: 'Fira Sans' }}>{action.name}</Typography>
    <IconButton onClick={onClickRemove}>
      <Delete htmlColor='black' />
    </IconButton>
  </Box>
}

export default function Stage1View({
  loading,
  pdcaData,
  onClickBack,
  onAddAction,
  onRemoveAction,
  inputValue,
  setInputValue,
  userPermission,
}) {
  return (
    <Box sx={{
      marginLeft: '5%',
      marginRight: '5%',
      marginTop: '5%',
      display: 'flex',
      flexDirection: 'column',
      width: '90%',
    }}>
      <Box sx={{
        display: 'flex',
        position: 'relative',
        justifyContent: 'center',
        marginBottom: '10px',
        alignItems: 'center'
      }}>
        <IconButton size="small" onClick={onClickBack} sx={{ position: 'absolute', left: 0 }}>
          <ArrowBack />
        </IconButton>
        <Typography sx={{ fontFamily: 'Fira Sans', fontSize: 30, fontWeight: 'bold' }}>
          {pdcaData.name}
        </Typography>
      </Box>
      <Box sx={{
        display: 'flex',
        marginBottom: '10px',
        justifyContent: 'center'
      }}>
        <Typography sx={{ fontFamily: 'Fira Sans', fontSize: 26, fontWeight: 'bold' }}>
          Etapa 1: planificar
        </Typography>
      </Box>
      <Box sx={{ display: 'grid', gridTemplateColumns: '2fr 3fr', width: '100%' }}>
        <Box sx={{ border: '1px black solid', backgroundColor: '#E1ECEB', padding: 2 }}>
          Es crucial generar accionables que permitan abordar las causas raíz del problema y preparar soluciones efectivas. Algunas dinámicas útiles son el diagrama de espina de pescado, que desglosa un problema en categorías como personas, métodos, maquinaria, materiales, entorno y mediciones; la técnica de los "5 Porqués", que profundiza en la identificación de causas subyacentes preguntando repetidamente "¿por qué?" hasta encontrar la raíz; y la lluvia de ideas o brainstorming, donde los miembros del equipo aportan soluciones creativas y colaborativas para explorar diferentes enfoques.
          <br />
          <br />
          Una vez identificadas las causas raíz mediante herramientas como el diagrama de espina de pescado, los "5 Porqués" o el brainstorming, es fundamental traducir estos hallazgos en acciones concretas. Esto se logra priorizando las causas con mayor impacto y viabilidad de resolución, y diseñando un plan detallado que asigne tareas específicas, responsables y plazos. Las acciones deben estar alineadas con los objetivos del proyecto y enfocadas en abordar las causas identificadas.
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography sx={{ fontFamily: 'Fira Sans', fontSize: 20 }}>
            Acciones a realizar
          </Typography>
          {userPermission === 'edit' ? (
            <>
              <Box sx={{ display: 'flex', width: '80%' }}>
                <TextField 
                  sx={{ width: '100%' }}
                  inputProps={{ style: { fontFamily: 'Fira Sans' } }}
                  variant="standard"
                  placeholder="Agregar acción"
                  onChange={setInputValue}
                  value={inputValue}
                >
                </TextField>
                <IconButton size="small" disabled={!inputValue} onClick={onAddAction} disableRipple>
                  <Check sx={{fontSize: 40, color: !inputValue ? 'gray' : 'black' }}/>
                </IconButton>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '80%' }}>
                {pdcaData.actions.map((a) =>
                  <ActionItem action={a} onClickRemove={() => onRemoveAction(a.name)} />
                )}
              </Box>
            </>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '80%' }}>
              {pdcaData.actions.map((a) =>
                <Typography sx={{ fontFamily: 'Fira Sans' }}>{a.name}</Typography>
              )}
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  )
}
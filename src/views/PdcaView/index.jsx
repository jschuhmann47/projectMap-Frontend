import { ArrowBack, Check, Delete } from "@mui/icons-material";
import { Box, IconButton, TextField, Typography } from "@mui/material";

function ActionItem({ action, onClickRemove }) {
  return <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '80%' }}>
    <Typography sx={{ fontFamily: 'Fira Sans' }}>{action.name}</Typography>
    <IconButton onClick={onClickRemove}>
      <Delete htmlColor='black' />
    </IconButton>
  </Box>
}

export default function PdcaView({
  loading,
  pdcaData,
  onClickBack,
  onAddAction,
  onRemoveAction,
  inputValue,
  setInputValue,
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
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 2fr', width: '100%' }}>
        <Box sx={{ border: '1px black solid', backgroundColor: '#E1ECEB', padding: 2 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et tortor fringilla, rhoncus augue et, egestas nunc. Fusce luctus viverra odio, a dignissim magna egestas ut. Morbi commodo leo ante, id ultrices erat laoreet ut. Fusce congue ipsum in molestie ornare. Praesent vestibulum facilisis dui. In mattis, ex non aliquet consectetur, mauris purus consequat tellus, vitae suscipit tortor mi vitae enim. Proin vehicula laoreet est, eget volutpat nulla aliquet in. Morbi non odio ac nulla porta dictum. Sed convallis, elit facilisis iaculis sodales, ante odio posuere lectus, eu lobortis est purus vitae tellus. Fusce ut ligula suscipit, venenatis urna ut, bibendum lacus. 
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography sx={{ fontFamily: 'Fira Sans', fontSize: 20 }}>
            Acciones a realizar
          </Typography>
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
          {pdcaData.actions.map((a) =>
            <ActionItem action={a} onClickRemove={() => onRemoveAction(a.name)} />
          )}
        </Box>
      </Box>
    </Box>
  )
}
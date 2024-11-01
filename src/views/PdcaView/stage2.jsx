import { ArrowBack } from "@mui/icons-material";
import { Box, IconButton, TextField, Typography } from "@mui/material";
import { useState } from "react";

function ActionItem({ action, onClickEdit }) {
  // I know this breaks the container/presentational pattern...
  // but I think this component is too simple to break down into two
  const [responsible, setResponsible] = useState(action.responsible)
  const [deadline, setDeadline] = useState(action.deadline.substring(0, 10))

  function edit() {
    onClickEdit({
      _id: action._id,
      name: action.name,
      responsible: responsible,
      deadline: deadline,
      progress: action.progress,
    })
  }
  return (
    <Box
      sx={{
        border: '1px solid #405C5E',
        width: '95%',
        display: 'grid',
        gridTemplateColumns: '4fr 1fr',
        padding: '5px 20px',
      }}
    >
      <Box>
        <Typography sx={{ fontFamily: 'Fira Sans', fontSize: 20 }}>
          {action.name}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography sx={{ fontFamily: 'Fira Sans', fontSize: 14 }}>
            Responsable:
          </Typography>
          <TextField
            sx={{ width: '50%' }}
            inputProps={{ style: { fontFamily: 'Fira Sans', fontSize: 14 } }}
            variant="standard"
            onBlur={edit}
            value={responsible}
            onChange={(e) => setResponsible(e.target.value)}
          >
          </TextField>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography sx={{ fontFamily: 'Fira Sans', fontSize: 14 }}>
          Fecha límite
        </Typography>
        <TextField
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          inputProps={{ style: { fontFamily: 'Fira Sans', fontSize: 14 } }}
          onBlur={edit}
          size="small"
        />
      </Box>
    </Box>
  )
}

export default function Stage2View({
  loading,
  pdcaData,
  onClickBack,
  onEditAction,
}) {
  return (
    <Box sx={{
      marginLeft: '5%',
      marginRight: '5%',
      marginTop: '5%',
      display: 'flex',
      flexDirection: 'column',
      width: '90%',
      alignItems: 'center',
    }}>
      <Box sx={{
        display: 'flex',
        position: 'relative',
        justifyContent: 'center',
        marginBottom: '10px',
        alignItems: 'center',
        width: '100%',
      }}>
        <IconButton size="small" onClick={onClickBack} sx={{ position: 'absolute', left: 0 }}>
          <ArrowBack />
        </IconButton>
        <Typography sx={{ fontFamily: 'Fira Sans', fontSize: 30, fontWeight: 'bold' }}>
          {pdcaData.name}
        </Typography>
      </Box>
      <Typography sx={{ fontFamily: 'Fira Sans', fontSize: 26, fontWeight: 'bold', marginBottom: '10px' }}>
        Etapa 2: hacer
      </Typography>
      <Typography sx={{ fontFamily: 'Fira Sans', fontSize: 20, marginBottom: '5px' }}>
        ¿Cómo se llevarán a cabo las acciones?
      </Typography>
      {pdcaData.actions.map((a) =>
        <ActionItem action={a} onClickEdit={onEditAction} />
      )}
    </Box>
  )
}
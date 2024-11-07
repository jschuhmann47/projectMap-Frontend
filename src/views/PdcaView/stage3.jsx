import { ArrowBack } from "@mui/icons-material";
import { Box, IconButton, TextField, Typography } from "@mui/material";
import { useState } from "react";

function ActionItem({ action, onClickEdit, userPermission }) {
  // I know this breaks the container/presentational pattern...
  // but I think this component is too simple to break down into two
  const [progress, setProgress] = useState(action.progress)

  function edit() {
    onClickEdit({
      _id: action._id,
      name: action.name,
      responsible: action.responsible,
      deadline: action.deadline,
      progress: progress,
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
        <Box sx={{ display: 'grid', gridTemplateColumns: '3fr 2fr' }}>
          <Typography sx={{ fontFamily: 'Fira Sans', fontSize: 14 }}>
            Responsable: {action.responsible}
          </Typography>
          <Typography sx={{ fontFamily: 'Fira Sans', fontSize: 14 }}>
            Fecha límite: {action.deadline?.substring(0, 10)}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        {userPermission === 'edit' ? (
          <>
            <Typography sx={{ fontFamily: 'Fira Sans', fontSize: 16 }}>
              Cumplimiento (%)
            </Typography>
            <TextField
              type='number'
              value={progress}
              onChange={(e) => setProgress(e.target.value)}
              inputProps={{
                style: { fontFamily: 'Fira Sans', fontSize: 14 },
              }}
              onBlur={edit}
              size='small'
              sx={{ width: '40%' }}
            />
          </>
        ) : (
          <Typography sx={{ fontFamily: 'Fira Sans', fontSize: 16 }}>
            Cumplimiento: {progress}%
          </Typography>
        )
      }
      </Box>
    </Box>
  )
}

export default function Stage3View({
  loading,
  pdcaData,
  onClickBack,
  onEditAction,
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
        Etapa 3: hacer
      </Typography>
      <Typography sx={{ fontFamily: 'Fira Sans', fontSize: 20, marginBottom: '5px' }}>
        ¿Cuál es el grado de cumplimiento de cada acción?
      </Typography>
      {pdcaData.actions.map((a) =>
        <ActionItem action={a} onClickEdit={onEditAction} userPermission={userPermission} />
      )}
    </Box>
  )
}
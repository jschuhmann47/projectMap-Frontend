import { Delete } from "@mui/icons-material";
import { Box, IconButton, LinearProgress, Typography } from "@mui/material";
import { priorityOptions } from "helpers/enums/okr";
import { OkrProgress, OkrProgressBar } from "views/OKRView/styles";

export default function KeyResult({
  krData,
  openConfirmDeleteModal,
  handleKrClick,
  userPermission,
}) {
  return (
    <Box
      onClick={() => handleKrClick(krData)}
      sx={{
        border: '1px solid #405C5E',
        width: '100%',
        display: 'grid',
        gridTemplateColumns: '1fr 14fr 4fr 1fr',
        paddingTop: '5px',
        paddingBottom: '5px',
        cursor: 'pointer',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img src={priorityOptions[krData?.priority]} height="25" width="25" />
      </Box>
      <Box>
        <Typography sx={{ fontFamily: 'Fira Sans', fontSize: 20 }}>{krData.description}</Typography>
        <Typography sx={{ fontFamily: 'Fira Sans', fontSize: 14 }}>
          {krData.area ? `Área: ${krData.area}` : `Responsable: ${krData.responsible}`}
        </Typography>
      </Box>
      <OkrProgress>
        <OkrProgressBar>
          <LinearProgress value={krData?.progress} variant="determinate" sx={{
            height: 20,
            backgroundColor: 'transparent',
            border: '1px solid',
            borderRadius: '8px',
            ['.MuiLinearProgress-bar1Determinate']: { backgroundColor: '#405C5E' },
          }} />
        </OkrProgressBar>
        <span>{krData?.progress}%</span>
      </OkrProgress>
      {userPermission === 'edit' &&
        <IconButton onClick={(event) => {
          event.stopPropagation();
          openConfirmDeleteModal?.(krData)
        }}>
          <Delete htmlColor='black' />
        </IconButton>
      }
    </Box>
  )
}
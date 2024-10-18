import { Delete, TrendingDown, TrendingFlat, TrendingUp } from "@mui/icons-material";
import { Box, IconButton, LinearProgress, Typography } from "@mui/material";
import { Trend } from "helpers/enums/balanced";
import { OkrProgress, OkrProgressBar } from "views/OKRView/styles";

export default function Objective({
  objData,
  openConfirmDeleteModal,
  handleObjClick,
  userPermission,
}) {
  return (
    <Box
      onClick={() => handleObjClick(objData)}
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
        {getTrendIcon(objData.trend)}
      </Box>
      <Box>
        <Typography sx={{ fontFamily: 'Fira Sans', fontSize: 20 }}>{objData.action}</Typography>
        <Typography sx={{ fontFamily: 'Fira Sans', fontSize: 14 }}>Responsable: {objData.responsible}</Typography>
      </Box>
      <OkrProgress>
        <OkrProgressBar>
          <LinearProgress value={objData?.progress} variant="determinate" sx={{
            height: 20,
            backgroundColor: 'transparent',
            border: '1px solid',
            borderRadius: '8px',
            ['.MuiLinearProgress-bar1Determinate']: { backgroundColor: '#405C5E' },
          }} />
        </OkrProgressBar>
        <span>{objData?.progress}%</span>
      </OkrProgress>
      {userPermission === 'edit' && (
        <IconButton
          onClick={(event) => {
            event.stopPropagation();
            openConfirmDeleteModal(objData)
          }}
        >
          <Delete htmlColor='black' />
        </IconButton>
      )}
    </Box>
  )
}

const getTrendIcon = (trend) => {
  switch (trend) {
    case Trend.Upwards:
      return <TrendingUp />;
    case Trend.Stable:
      return <TrendingFlat />;
    case Trend.Downwards:
      return <TrendingDown />;
    default:
      break;
  }
};
  
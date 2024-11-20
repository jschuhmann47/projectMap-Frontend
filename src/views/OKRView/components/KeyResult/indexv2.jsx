import ModalV2 from "components/commons/ModalV2";
import KrForm from "./KrForm";
import { Box, Slider, Stack } from "@mui/material";
import ReadonlyKr from "./ReadonlyKr";
import ChecklistKrForm from "./ChecklistKrForm";
import ReadonlyChecklistKr from "./ReadonlyChecklistKr";

export default function KeyResultModal({
  isOpen,
  onClose,
  data,
  onSubmit,
  userPermission,
}) {
  const { krType } = data
  const showProgressNumber = () => {
    if (krType == 'normal') {
      if (data.baseline < data.goal) { 
        return data.currentScore > data.baseline && data.currentScore < data.goal;
      } else {
        return data.currentScore < data.baseline && data.currentScore > data.goal
      }
    } else {
      return data.currentScore > 0 && data.currentScore < data.keyStatus.length;
    }
  };

  const getBaseValue = () => {
    if (krType == 'normal') {
      return data.baseline;
    } else {
      return 0;
    }
  }

  const getGoalValue = () => {
    if (krType == 'normal') {
      return data.goal;
    } else {
      return data.keyStatus?.length >= 1 ? `${data.keyStatus?.length} ítems` : `${data.keyStatus?.length} ítem`;
    }
  }

  const displayProgressBar = () => {
    if (krType == 'normal') {
      if (data.baseline < data.goal) {
        return data.currentScore > data.baseline ? 'block' : 'none';
      } else {
        return data.currentScore < data.baseline ? 'block' : 'none';
      }
    } else {
      return data.currentScore > 0 ? 'block' : 'none';
    }
  }
  
  return (
    <ModalV2 width={900} isOpen={isOpen} onClose={onClose} title={data.description}>
      <Box
        sx={{
          position: "relative",
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Stack spacing={3} direction="row" sx={{ width: '450px', alignItems: 'center', mb: 1 }}>
          <p>{getBaseValue()}</p>
            <Slider 
              valueLabelDisplay="on" 
              value={data.progress} 
              aria-label="Default"
              sx={{
                height: 20,
                '& .MuiSlider-thumb': {
                  backgroundColor: '#405C5E',
                  boxShadow: 'none',
                  width: "0px",
                  height: "0px",
                  border: 'none',
                  '&::before': {
                    boxShadow: 'none'
                  },
                  '&:hover': {
                    boxShadow: 'none',        
                  },
                  '&:focus, &:active': {
                    boxShadow: 'none',         
                  },
                },
                '& .MuiSlider-track': {
                  backgroundColor: '#405C5E', 
                  borderRadius: "8px",
                  borderColor: "#000000",
                  display: displayProgressBar(),
                },
                '& .MuiSlider-rail': {
                  backgroundColor: '#FFFFFF',
                  border: '1px solid black',
                  borderRadius: "8px",
                },
                '& .MuiSlider-valueLabelOpen': {
                  backgroundColor: 'transparent'
                },
              }}
              valueLabelFormat={() => (
                <Box
                  sx={{
                    backgroundColor: 'transparent',
                    position: 'absolute',
                    top: '400%',
                    color: "black",
                    transform: 'translateX(-50%)',
                    left: `${data.progress}`,
                    padding: '0px',
                    marginTop: '5px',
                    display: showProgressNumber() ? "block" : "none"
                  }}
                >
                  {`${data.currentScore} `}
                </Box>
              )} />
          <p style={{width: '70px'}}>{getGoalValue()}</p>
        </Stack>
      </Box>
      {userPermission === 'edit' ? (
        krType == 'normal' ? <KrForm onSubmit={onSubmit} data={data}/> : <ChecklistKrForm onSubmit={onSubmit} data={data}/>
      ) : (
        krType == 'normal' ? <ReadonlyKr data={data} /> : <ReadonlyChecklistKr data={data}/>
      )}
    </ModalV2>
  )
  
}
import ModalV2 from "components/commons/ModalV2";
import ObjForm from "./objForm";
import { Box, Slider, Stack } from "@mui/material";

export default function ObjectiveModal({
  isOpen,
  onClose,
  data,
  onSubmit
}) {
  const showProgress = () => {
    return data.currentScore > data.baseline && data.currentScore < data.goal
  };

  return (
    <ModalV2 width={900} isOpen={isOpen} onClose={onClose} title={data.action}>
      <Box
        sx={{
          position: "relative",
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Stack spacing={4} direction="row" sx={{ width: '400px', alignItems: 'center', mb: 1 }}>
          <p>{data.baseline}</p>
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
								display: data.currentScore > data.baseline ? 'block' : 'none',
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
									display: showProgress() ? "block" : "none"
								}}
							>
								{data.currentScore}
							</Box>
						)}
					/>
          <p>{data.goal}</p>
        </Stack>
      </Box>
      <ObjForm onSubmit={onSubmit} data={data}/>
    </ModalV2>
  )
  
}
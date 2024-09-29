import ModalV2 from "components/commons/ModalV2";
import KrForm from "./KrForm";
import { Box, Slider, Stack } from "@mui/material";

export default function KeyResultModal({
  isOpen,
  onClose,
  data,
  onSubmit
}) {

  return (
    <ModalV2 width={900} isOpen={isOpen} background={'#FFFFFF'} onClose={onClose} title={data.description}>
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
              value={data.currentScore} 
              aria-label="Default"
              valueLabelFormat={() => (
                <Box
                  sx={{
                    backgroundColor: 'transparent',
                    position: 'absolute',
                    top: '500%',
                    color: "black",
                    transform: 'translateX(-50%)',
                    left: `${data.currentScore}`,
                    padding: '0px',
                    marginTop: '5px',
                  }}
                >
                  {`${data.currentScore} `}
                </Box>
              )} />
          <p>{data.goal}</p>
        </Stack>
      </Box>
      <KrForm onSubmit={onSubmit} data={data}/>
    </ModalV2>
  )
  
}
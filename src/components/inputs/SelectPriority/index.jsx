import { Box, Typography } from "@mui/material"
import ImgSelect from "views/OKRView/components/ImgSelect"

export default function SelectPriority(props) {
  return (
    <>
    <Box sx={{display: 'flex'}}>
      <Box flex={1}>
        <Typography sx={{ mt: 1 }}>{props.fieldLabel}</Typography>
      </Box>                    
      <Box flex={1}>
        <ImgSelect {...props} field={{value: priority, onChange: handlePriority, sx:{height: "34px"}}}></ImgSelect>
      </Box>
    </Box>
  </>
  )
}

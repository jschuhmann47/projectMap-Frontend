import { Box, InputBase, Typography } from "@mui/material";
import { useState } from "react";

export default function InputV2({
  type,
  field,
  disable,
  fieldLabel,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordInput = type === 'password';
  const getInputType = () => {
    let inputType = type;
    if (isPasswordInput) {
      inputType = showPassword ? 'text' : type;
    }
    return inputType;
  };

  return (
    <Box>
      <Typography sx={{ fontFamily: 'Fira Sans', fontSize: 16 }}>{fieldLabel}</Typography>
      <InputBase
        {...field}
        disabled={disable}
        type={getInputType()}
        sx={{
          paddingLeft: '14px',
          paddingRight: '14px',
          border: '1px solid #344345',
          borderRadius: '8px',
          fontFamily: 'Fira Sans',
          fontSize: 16,
          width: '100%',
        }}
      />
    </Box>
  )
}
import { Box, InputBase, Typography } from "@mui/material";
import { useState } from "react";

export default function InputV2({
  type,
  field,
  disable,
}) {
  console.log(field);
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
    <Box sx={{ fontFamily: 'Fira Sans', fontSize: 16 }}>
      <Typography>Nombre</Typography>
      <InputBase
        {...field}
        disabled={disable}
        type={getInputType()}
      />
    </Box>
  )
}
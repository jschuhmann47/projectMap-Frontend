import { Box, InputBase, Typography } from "@mui/material";
import { useState } from "react";
import { getIn } from "formik";
import ToolTip from "components/commons/ToolTip";

// to do: support password type
export default function InputV2(props) {
  const {
    type,
    field,
    disable,
    fieldLabel,
    form,
    multiline,
    tooltip,
  } = props;
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
    <Box sx={{ marginTop: '5px', marginBottom: '5px' }}>
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <Typography sx={{ fontFamily: 'Fira Sans', fontSize: 16 }}>
          {fieldLabel}
        </Typography>
        {tooltip && <ToolTip text={tooltip} fontSize='14px' placement='right' />}
      </Box>
      <InputBase
        {...field}
        disabled={disable}
        type={getInputType()}
        minRows={3}
        maxRows={3}
        sx={{
          paddingLeft: '14px',
          paddingRight: '14px',
          border: '1px solid',
          borderRadius: '4px',
          fontFamily: 'Fira Sans',
          fontSize: 16,
          width: '100%',
          borderColor: getIn(form.errors, field.name) && getIn(form.touched, field.name)
            ? '#FF0000' :
            '#344345',
        }}
        multiline={multiline}
      />
    </Box>
  )
}
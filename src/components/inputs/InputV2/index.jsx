import { Box, InputBase, Typography } from "@mui/material";
import { useState } from "react";
import { getIn } from "formik";
import ToolTip from "components/commons/ToolTip";

// to do: support password type
export default function InputV2(props) {
  const {
    inputLayout = 'stacked',
    type,
    field,
    disable,
    fieldLabel,
    value,
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
    <Box sx={{ display: inputLayout == 'inline' ? 'flex': 'block', marginTop: '5px', marginBottom: '5px' }}>
      <Box 
        sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
        {...(inputLayout == 'inline' ? {flex: 1} : {})}
      >
        <Typography sx={{ fontFamily: 'Fira Sans', fontSize: 16, mr: 1 }}>
          {fieldLabel}
        </Typography>
        {tooltip && <ToolTip text={tooltip} fontSize='14px' placement='right' />}
      </Box>
      <Box {...(inputLayout == 'inline' ? {flex: 1} : {})}>
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
          value={value || field.value} // Si value viene vacio, no toma los initialValues de Formik
        />
      </Box>
    </Box>
  )
}
import { Box, MenuItem, Select, Typography } from "@mui/material"
import { getIn } from "formik"

export default function SelectInputV2(props) {
  const { field, options, fieldLabel, form } = props

  return (
    <Box sx={{ marginTop: '5px', marginBottom: '5px' }}>
      <Typography sx={{ fontFamily: 'Fira Sans', fontSize: 16 }}>
        {fieldLabel}
      </Typography>
      <Select
        {...field}
        size='small'
        sx={{
          border: '1px solid',
          borderRadius: '4px',
          fontFamily: 'Fira Sans',
          fontSize: 16,
          width: '100%',
          borderColor: getIn(form.errors, field.name) && getIn(form.touched, field.name)
            ? '#FF0000' :
            '#344345',
        }}
      >
        {options?.map((option) => (
          <MenuItem value={option}>{option}</MenuItem>
        ))}
      </Select>
    </Box>
  )
}

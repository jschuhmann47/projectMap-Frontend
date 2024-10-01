import { Box, MenuItem, Select, Typography } from "@mui/material"
import ToolTip from "components/commons/ToolTip"
import { getIn } from "formik"

export default function SelectInputV2(props) {
  const { field, options, fieldLabel, form, tooltip } = props;

  return (
    <Box sx={{ marginTop: '5px', marginBottom: '5px' }}>
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <Typography sx={{ fontFamily: 'Fira Sans', fontSize: 16 }}>
          {fieldLabel}
        </Typography>
        {tooltip && <ToolTip text={tooltip} fontSize='14px' placement='right' />}
      </Box>
      <Select
        {...field}
        size='small'
        value={field.value || ""}
        onChange={(e) => form.setFieldValue(field.name, e.target.value)}
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
        <MenuItem value="">
          <em>Seleccioná una opción</em>
        </MenuItem>
        {options && Object.entries(options).map(([key, label]) => (
          <MenuItem key={key} value={key}>
            {label}
          </MenuItem>
        ))}
      </Select>
    </Box>
  )
}

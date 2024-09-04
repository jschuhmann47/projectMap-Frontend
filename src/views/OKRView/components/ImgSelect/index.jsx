const { Select, MenuItem } = require("@mui/material");

// contract: options: { path: string, value: string }[]
export default function ImgSelect({ field, options }) {
  return <Select {...field}>
    {options.map((o) =>
      <MenuItem value={o.value}>
        <img src={o.path} height="20" width="20" />
      </MenuItem>
    )}
  </Select>
}
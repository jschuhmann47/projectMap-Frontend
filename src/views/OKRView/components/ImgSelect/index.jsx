const { Select, MenuItem } = require("@mui/material");

// contract: options: { path: string, value: string }[]
export default function ImgSelect({ field, options, style }) {
  return <Select {...field} {...style}>
    {options.map((o, index) =>
      <MenuItem value={o.value} key={index}>
        <img src={o.path} height="20" width="20" />
      </MenuItem>
    )}
  </Select>
}
import { Table, TableCell, tableCellClasses, TableHead, TableRow } from "@mui/material";

export default function KeyResult({
  krData
}) {
  return <Table
    sx={{
      borderRadius: 5,
      backgroundColor: '#C7DAD9',
      [`& .${tableCellClasses.root}`]: {
        borderBottom: "none",
        fontSize: 16,
      },
    }}
  >
    <TableHead>
      <TableRow>
        <TableCell>Key Result</TableCell>
        <TableCell>Responsable</TableCell>
        <TableCell>Prioridad</TableCell>
        <TableCell>Línea base</TableCell>
        <TableCell>Actual</TableCell>
        <TableCell>Resultado esperado</TableCell>
        <TableCell>Avance</TableCell>
        <TableCell>Edición</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>{krData.description}</TableCell>
        <TableCell>{krData.responsible}</TableCell>
        <TableCell>{krData.priority}</TableCell>
        <TableCell>{krData.baseline}</TableCell>
        <TableCell>{krData.currentScore}</TableCell>
        <TableCell>{krData.goal}</TableCell>
        <TableCell>{krData.progress}</TableCell>
        <TableCell>editar/eliminar</TableCell>
      </TableRow>
    </TableHead>
  </Table>
}
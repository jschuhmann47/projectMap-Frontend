import { Box, IconButton, Table, TableBody, TableCell, tableCellClasses, TableHead, TableRow } from "@mui/material";
import { Cancel, Check, Delete, Edit } from "@mui/icons-material"
import { useState } from "react";

export default function KeyResult({
  krData,
  editKr,
  deleteKr,
}) {
  console.log('krData', krData);
  const [isEditingKr, setIsEditingKr] = useState(false);

  function onEditKr() {
    editKr();
    setIsEditingKr(false);
  }

  return (
    <Box sx={{ borderRadius: 5, backgroundColor: '#C7DAD9' }}>
      <Table
        sx={{
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
        </TableHead>
        <TableBody>
          {isEditingKr ? (
            <TableRow>
              <TableCell>{krData.description}</TableCell>
              <TableCell>{krData.responsible}</TableCell>
              <TableCell>{krData.priority}</TableCell>
              <TableCell>{krData.baseline}</TableCell>
              <TableCell>{krData.currentScore}</TableCell>
              <TableCell>{krData.goal}</TableCell>
              <TableCell>{krData.progress}</TableCell>
              <TableCell>
                <IconButton onClick={onEditKr}>
                  <Check />
                </IconButton>
                <IconButton onClick={() => setIsEditingKr(false)}>
                  <Cancel />
                </IconButton>
              </TableCell>
            </TableRow>
          ) : (
            <TableRow>
              <TableCell>{krData.description}</TableCell>
              <TableCell>{krData.responsible}</TableCell>
              <TableCell>{krData.priority}</TableCell>
              <TableCell>{krData.baseline}</TableCell>
              <TableCell>{krData.currentScore}</TableCell>
              <TableCell>{krData.goal}</TableCell>
              <TableCell>{krData.progress}</TableCell>
              <TableCell>
                <IconButton onClick={() => setIsEditingKr(true)}>
                  <Edit />
                </IconButton>
                <IconButton onClick={deleteKr}>
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Table
        sx={{
          backgroundColor: '#C7DAD9',
          [`& .${tableCellClasses.root}`]: {
            borderBottom: "none",
          },
        }}
      >
        <TableHead>
          {krData.keyStatus.map((ks) => (
            <TableCell>{ks.period} {ks.value}</TableCell>
          ))}
        </TableHead>
        <TableBody>
          {krData.keyStatus.map((ks) => (
            <TableCell>{ks.value}</TableCell>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}
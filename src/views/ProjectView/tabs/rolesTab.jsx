import { Box, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import Button from "components/commons/Button";
import Modal from "components/commons/Modal";
import { useState } from "react";
import AddUserModal from "./addUserModal";

export default function RolesTab({ members, onSearchUserByEmail, onAddUserToProject, addUserModalInfo }) {
  const [open, setOpen] = useState(false);

  const roles = ['Participante', 'Coordinador'];
  const permissionOptions = ['Editar', 'Ver', 'Ocultar'];

  return (
    <div>
      <Button variant="contained" onClick={() => setOpen(true)}>Agregar Integrante</Button>
      <AddUserModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onSearchUserByEmail={onSearchUserByEmail}
        onAddUserToProject={onAddUserToProject}
        info={addUserModalInfo}
      />
      <TableContainer component={Paper} style={{ marginTop: 20 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre y apellido</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Rol</TableCell>
              <TableCell>Evaluación del entorno externo</TableCell>
              <TableCell>Evaluación de la situación interna</TableCell>
              <TableCell>Definición de lineamientos estratégicos</TableCell>
              <TableCell>Formulación de la estrategia competitiva</TableCell>
              <TableCell>Definición de los planes de transformación</TableCell>
              <TableCell>Planeamiento financiero y medición de resultados</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {integrantes.map((integrante, index) => (
              <TableRow key={index}>
                <TableCell>{integrante.name}</TableCell>
                <TableCell>{integrante.email}</TableCell>
                <TableCell>
                  <Select
                    value={integrante.role}
                    onChange={(e) => {
                      const newIntegrantes = [...integrantes];
                      newIntegrantes[index].role = e.target.value;
                      setIntegrantes(newIntegrantes);
                    }}
                  >
                    {roles.map((role) => (
                      <MenuItem key={role} value={role}>
                        {role}
                      </MenuItem>
                    ))}
                  </Select>
                </TableCell>
                <TableCell>
                  <Select
                    value={integrante.permissions.entornoExterno || 'Ver'}
                    onChange={(e) => handlePermissionChange(index, 'entornoExterno', e.target.value)}
                  >
                    {permissionOptions.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </TableCell>
                <TableCell>
                  <Select
                    value={integrante.permissions.situacionInterna || 'Ver'}
                    onChange={(e) => handlePermissionChange(index, 'situacionInterna', e.target.value)}
                  >
                    {permissionOptions.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </TableCell>
                <TableCell>
                  <Select
                    value={integrante.permissions.lineamientosEstrategicos || 'Ver'}
                    onChange={(e) => handlePermissionChange(index, 'lineamientosEstrategicos', e.target.value)}
                  >
                    {permissionOptions.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </TableCell>
                <TableCell>
                  <Select
                    value={integrante.permissions.estrategiaCompetitiva || 'Ver'}
                    onChange={(e) => handlePermissionChange(index, 'estrategiaCompetitiva', e.target.value)}
                  >
                    {permissionOptions.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </TableCell>
                <TableCell>
                  <Select
                    value={integrante.permissions.planesTransformacion || 'Ver'}
                    onChange={(e) => handlePermissionChange(index, 'planesTransformacion', e.target.value)}
                  >
                    {permissionOptions.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </TableCell>
                <TableCell>
                  <Select
                    value={integrante.permissions.planeamientoFinanciero || 'Ver'}
                    onChange={(e) => handlePermissionChange(index, 'planeamientoFinanciero', e.target.value)}
                  >
                    {permissionOptions.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {hasNewMembers && (
        <Button variant="contained" style={{ marginTop: 20 }} onClick={handleSave}>
          Guardar
        </Button>
      )}
      <Modal
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        aria-labelledby="modal-confirmation-title"
        aria-describedby="modal-confirmation-description"
      >
        <Typography id="modal-confirmation-title" variant="h6" component="h2">
          Guardado Exitoso
        </Typography>
        <Typography id="modal-confirmation-description" sx={{ mt: 2 }}>
          Los integrantes se guardaron correctamente.
        </Typography>
        <Button onClick={() => setShowConfirmation(false)} variant="contained" sx={{ mt: 2 }}>
          Cerrar
        </Button>
      </Modal>
    </div>
  )
}
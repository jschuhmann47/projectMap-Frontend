import { Box, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import Button from "components/commons/Button";
import AddUserModal from "./addUserModal";

export default function RolesTab({
  members,
  onSearchUserByEmail,
  onAddUserToProject,
  addUserModalInfo,
  onOpenModal,
  onCloseModal,
}) {
  const roles = ['Participante', 'Coordinador'];
  const permissionOptions = ['Editar', 'Ver', 'Ocultar'];

  return (
    <div>
      <Button variant="contained" onClick={onOpenModal}>Agregar Integrante</Button>
      <AddUserModal
        onClose={onCloseModal}
        onSearchUserByEmail={onSearchUserByEmail}
        onAddUserToProject={onAddUserToProject}
        info={addUserModalInfo}
      />
      {/* <TableContainer component={Paper} style={{ marginTop: 20 }}>
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
            {members.map((integrante, index) => (
              <TableRow key={index}>
                <TableCell>{integrante.name}</TableCell>
                <TableCell>{integrante.email}</TableCell>
                <TableCell>
                  <Select
                    value={integrante.role}
                    onChange={(e) => { console.log(e.target.value) }}
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
      </TableContainer> */}
      {/* {hasNewMembers && (
        <Button variant="contained" style={{ marginTop: 20 }} onClick={handleSave}>
          Guardar
        </Button>
      )} */}
    </div>
  )
}
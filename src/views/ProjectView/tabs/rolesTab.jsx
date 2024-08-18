import { Box, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import Button from "components/commons/Button";
import AddUserModal from "./addUserModal";

const stepNames = {
  externalEnvironment: 'Evaluación de la situación externa',
  internalSituation: 'Evaluación de la situación interna',
  strategicGuidelines: 'Definición de lineamientos estratégicos',
  competitiveStrategy: 'Formulación de la estrategia competitiva',
  transformationPlans: 'Definición de los planes de transformación',
  financialPlanning: 'Planeamiento financiero y medición de resultados',
  continuousImprovement: 'Mejora continua'
}

const permissionNames = {
  edit: 'Editar',
  read: 'Ver',
  hide: 'Ocultar'
}

const roleNames = {
  participant: 'Participante',
  coordinator: 'Coordinador'
}

function memberStepPermissionCell(userId, stepId, permission, changeCallback) {
  function onChange(e) {
    const permissionKey = Object.entries(permissionNames)
      .find((entry) => entry[1] == e.target.value)[0]
    changeCallback(userId, stepId, permissionKey)
  }

  return <TableCell>
    <Select
      value={permissionNames[permission]}
      onChange={onChange}
    >
      {Object.values(permissionNames).map((option) => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </Select>
  </TableCell>
}

function memberRoleCell(userId, role, changeCallback) {
  function onChange(e) {
    const roleKey = Object.entries(roleNames)
      .find((entry) => entry[1] == e.target.value)[0]
    changeCallback(userId, roleKey)
  }

  return <TableCell>
    <Select
      value={roleNames[role]}
      onChange={onChange}
    >
      {Object.values(roleNames).map((role) => (
        <MenuItem key={role} value={role}>
          {role}
        </MenuItem>
      ))}
    </Select>
  </TableCell>
}

export default function RolesTab({
  members,
  onSearchUserByEmail,
  onAddUserToProject,
  addUserModalInfo,
  onOpenModal,
  onCloseModal,
  onChangeMemberPermission,
  onChangeMemberRole
}) {
  return (
    <div>
      <Button variant="contained" onClick={onOpenModal}>Agregar Integrante</Button>
      <AddUserModal
        onClose={onCloseModal}
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
              {Object.values(stepNames).map((name) => <TableCell>{name}</TableCell>)}
            </TableRow>
          </TableHead>
          <TableBody>
            {members.map((member, index) => (
              <TableRow key={index}>
                <TableCell>{member.user.firstName} {member.user.lastName}</TableCell>
                <TableCell>{member.user.email}</TableCell>
                {memberRoleCell(member.user._id, member.role, onChangeMemberRole)}
                {Object.keys(stepNames).map((step) =>
                  member.role == 'participant' ? (
                    memberStepPermissionCell(member.user._id, step, member.spheres.find((s) => s.id == step)?.permission, onChangeMemberPermission)
                  ) : <TableCell>-</TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* {hasNewMembers && (
        <Button variant="contained" style={{ marginTop: 20 }} onClick={handleSave}>
          Guardar
        </Button>
      )} */}
    </div>
  )
}
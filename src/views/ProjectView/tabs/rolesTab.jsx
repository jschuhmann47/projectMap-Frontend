import { Box, Checkbox, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import Button from "components/commons/Button";
import AddUserModal from "./addUserModal";
import { useState } from "react";

// to do: use helpers/enums/steps.js
export const stepNames = {
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
  view: 'Ver',
  hide: 'Ocultar'
}

const roleNames = {
  participant: 'Participante',
  coordinator: 'Coordinador'
}

function memberStepPermissionCell(userId, stepId, permission, changeCallback) {
  function onChange(e) {
    const permissionKey = Object.entries(permissionNames)
      .find((entry) => entry[1] === e.target.value)[0]
    changeCallback(userId, stepId, permissionKey)
  }

  return <TableCell key={stepId}>
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
      .find((entry) => entry[1] === e.target.value)[0]
    changeCallback(userId, roleKey)
  }

  return <TableCell key={userId + "_role"}>
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
  onGoBackModal,
  onChangeMemberPermission,
  onChangeMemberRole,
  onSaveChanges,
}) {
  const [usersToDelete, setUsersToDelete] = useState(new Set());

  const handleToggleDeleteUser = (userId) => {
    setUsersToDelete((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(userId)) {
        newSet.delete(userId)
      } else {
        newSet.add(userId)
      }
      return newSet
    });
  };

  const handleSaveChanges = () => {
    const remainingMembers = members.filter(member => !usersToDelete.has(member.user._id))
    onSaveChanges(remainingMembers)
  }

  return (
    <div>
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <Box width='20%'>
          <Button variant="contained" onClick={onOpenModal}>Agregar Integrante</Button>
        </Box>
        <Box width='20%'>
          <Button variant="contained" onClick={handleSaveChanges}>Guardar</Button>
        </Box>
      </Box>
      <AddUserModal
        onClose={onCloseModal}
        onSearchUserByEmail={onSearchUserByEmail}
        onAddUserToProject={onAddUserToProject}
        onGoBack={onGoBackModal}
        info={addUserModalInfo}
      />
      <TableContainer component={Paper} style={{ marginTop: 20 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>🗑️</TableCell>
              <TableCell>Nombre y apellido</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Rol</TableCell>
              {Object.entries(stepNames).map(([stepKey, name]) => (
                <TableCell key={stepKey}>{name}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {members.map((member, index) => (
              <TableRow key={member.user._id}>
                <TableCell>
                  <Checkbox
                    checked={usersToDelete.has(member.user._id)}
                    onChange={() => handleToggleDeleteUser(member.user._id)}
                  />
                </TableCell>
                <TableCell>{member.user.firstName} {member.user.lastName}</TableCell>
                <TableCell>{member.user.email}</TableCell>
                {memberRoleCell(member.user._id, member.role, onChangeMemberRole)}
                {Object.keys(stepNames).map((step) =>
                  member.role === 'participant' ? (
                    memberStepPermissionCell(member.user._id, step, member.stages.find((s) => s.id === step)?.permission, onChangeMemberPermission)
                  ) : <TableCell key={step}>-</TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
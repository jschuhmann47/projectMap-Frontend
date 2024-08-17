import { Box, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import Button from "components/commons/Button";
import Modal from "components/commons/Modal";
import { useState } from "react";

export default function RolesTab() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);
  const [integrantes, setIntegrantes] = useState([]);
  const [hasNewMembers, setHasNewMembers] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const roles = ['Participante', 'Coordinador'];
  const permissionOptions = ['Editar', 'Ver', 'Ocultar'];

  const handlePermissionChange = (index, field, value) => {
    const newIntegrantes = [...integrantes];
    newIntegrantes[index].permissions[field] = value;
    setIntegrantes(newIntegrantes);
  };

  const handleSave = async () => {
    const coordinators = integrantes.filter(integrante => integrante.role === 'Coordinador');
    const participants = integrantes.filter(integrante => integrante.role === 'Participante');

    if (coordinators.length > 0) {
      // const resultCoordinators = await saveCoordinators(coordinators);
      const resultCoordinators = await searchUserByEmail(coordinators);
      if (!resultCoordinators) {
        console.error('Fallo al guardar los coordinadores');
        return;
      }
    }

    if (participants.length > 0) {
      // const resultParticipants = await saveParticipants(participants);
      const resultParticipants = await searchUserByEmail(participants);
      if (!resultParticipants) {
        console.error('Fallo al guardar los participantes');
        return;
      }
    }

    console.log('Todos los datos se guardaron correctamente');
    setShowConfirmation(true);
    setHasNewMembers(false);
  };

  async function searchUserByEmail(email) {
    return "implementame"
  }

  const handleSearchUser = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Por favor, ingresa un email válido.');
      return;
    }

    setError('');
    const foundUser = await searchUserByEmail(email);
    if (foundUser) {
      setUser(foundUser);
    } else {
      setError('No se encontró un usuario con ese email.');
    }
  };

  const handleConfirmUser = () => {
    setIntegrantes([...integrantes, user]);
    setHasNewMembers(true);
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" onClick={() => setOpen(true)}>Agregar Integrante</Button>
      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Buscar Integrante
        </Typography>
        <TextField
          fullWidth
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
          error={!!error}
          helperText={error}
        />
        <Button variant="contained" onClick={handleSearchUser}>Buscar</Button>
        {user && (
          <Box mt={2}>
            <Typography variant="body1">Usuario encontrado: {user.name}</Typography>
            <Button variant="contained" color="primary" onClick={handleConfirmUser}>Confirmar</Button>
          </Box>
        )}
      </Modal>
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
        <Box sx={modalStyle}>
          <Typography id="modal-confirmation-title" variant="h6" component="h2">
            Guardado Exitoso
          </Typography>
          <Typography id="modal-confirmation-description" sx={{ mt: 2 }}>
            Los integrantes se guardaron correctamente.
          </Typography>
          <Button onClick={() => setShowConfirmation(false)} variant="contained" sx={{ mt: 2 }}>
            Cerrar
          </Button>
        </Box>
      </Modal>
    </div>
  )
}
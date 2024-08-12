import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Button, MenuItem, Modal, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { Header, MainContainer, ProjectTab, Title } from "./styles";
import StepsTab from "./tabs/stepsTab";

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default function ProjectView({ titulo, items }) {
  const [activeTab, setActiveTab] = useState("1");
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [integrantes, setIntegrantes] = useState([]);
  const [hasNewMembers, setHasNewMembers] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const roles = ['Participante', 'Coordinador'];
  const permissionOptions = ['Editar', 'Ver', 'Ocultar'];

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

  const handlePermissionChange = (index, field, value) => {
    const newIntegrantes = [...integrantes];
    newIntegrantes[index].permissions[field] = value;
    setIntegrantes(newIntegrantes);
  };

  const searchUserByEmail = async (email) => {
    return {
      name: 'Usuario Ejemplo',
      email,
      role: 'Participante',
      permissions: {
        entornoExterno: 'Ver',
        situacionInterna: 'Ver',
        lineamientosEstrategicos: 'Ver',
        estrategiaCompetitiva: 'Ver',
        planesTransformacion: 'Ver',
        planeamientoFinanciero: 'Ver'
      }
    };
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

  const tabs = [
    {
      id: "1",
      name: 'Etapas',
      content: <StepsTab steps={items} />
    },
    {
      id: "2",
      name: 'Organigrama',
      content: <div>organigrama</div>
    },
    {
      id: "3",
      name: 'Roles y permisos',
      content: (
        <div>
          <Button variant="contained" onClick={() => setOpen(true)}>Agregar Integrante</Button>
          <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={modalStyle}>
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
            </Box>
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
            open={showConfirmation}
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
  ];

  return (
    <MainContainer>
      <TabContext value={activeTab}>
        <Header position='static'>
          <Title>{titulo}</Title>
          <TabList
            onChange={(_, newActiveTab) => setActiveTab(newActiveTab)}
            TabIndicatorProps={{ sx: { height: 4, backgroundColor: 'white' } }}
          >
            {tabs.map((tab) => (
              <ProjectTab
                label={tab.name}
                key={tab.id}
                value={tab.id}
              />
            ))}
          </TabList>
        </Header>
        {tabs.map((tab) => (
          <TabPanel key={tab.id} value={tab.id}>
            {tab.content}
          </TabPanel>
        ))}
      </TabContext>
    </MainContainer>
  );
}
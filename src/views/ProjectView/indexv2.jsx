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
  const [integrantes, setIntegrantes] = useState([
    {
      name: 'Pedro Gomez',
      email: 'pgomez@frba.utn.edu.ar',
      role: 'Participante',
      permissions: {
        entornoExterno: 'Editar',
        situacionInterna: 'Ver',
        lineamientosEstrategicos: 'Ocultar',
        estrategiaCompetitiva: 'Ocultar',
        planesTransformacion: 'Ocultar',
        planeamientoFinanciero: 'Ocultar'
      }
    },
    {
      name: 'Fulantio Perez',
      email: 'fperez@frba.utn.edu.ar',
      role: 'Coordinador',
      permissions: {
        entornoExterno: 'Ver',
        situacionInterna: 'Ver',
        lineamientosEstrategicos: 'Ver',
        estrategiaCompetitiva: 'Ver',
        planesTransformacion: 'Ver',
        planeamientoFinanciero: 'Ver'
      }
    },
  ]);

  const handleSearchUser = async () => {
    // Simulación de búsqueda de usuario por email
    const foundUser = await fakeUserSearch(email);
    setUser(foundUser);
  };

  const handleConfirmUser = () => {
    // Lógica para confirmar y agregar el usuario al proyecto
    setIntegrantes([...integrantes, user]);
    setOpen(false);
  };

  const handlePermissionChange = (index, field, value) => {
    const newIntegrantes = [...integrantes];
    newIntegrantes[index].permissions[field] = value;
    setIntegrantes(newIntegrantes);
  };

  const fakeUserSearch = async (email) => {
    // Simulación de búsqueda de usuario
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
                        <MenuItem value="Participante">Participante</MenuItem>
                        <MenuItem value="Coordinador">Coordinador</MenuItem>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={integrante.permissions.entornoExterno || 'Ver'}
                        onChange={(e) => handlePermissionChange(index, 'entornoExterno', e.target.value)}
                      >
                        <MenuItem value="Editar">Editar</MenuItem>
                        <MenuItem value="Ver">Ver</MenuItem>
                        <MenuItem value="Ocultar">Ocultar</MenuItem>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={integrante.permissions.situacionInterna || 'Ver'}
                        onChange={(e) => handlePermissionChange(index, 'situacionInterna', e.target.value)}
                      >
                        <MenuItem value="Editar">Editar</MenuItem>
                        <MenuItem value="Ver">Ver</MenuItem>
                        <MenuItem value="Ocultar">Ocultar</MenuItem>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={integrante.permissions.lineamientosEstrategicos || 'Ver'}
                        onChange={(e) => handlePermissionChange(index, 'lineamientosEstrategicos', e.target.value)}
                      >
                        <MenuItem value="Editar">Editar</MenuItem>
                        <MenuItem value="Ver">Ver</MenuItem>
                        <MenuItem value="Ocultar">Ocultar</MenuItem>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={integrante.permissions.estrategiaCompetitiva || 'Ver'}
                        onChange={(e) => handlePermissionChange(index, 'estrategiaCompetitiva', e.target.value)}
                      >
                        <MenuItem value="Editar">Editar</MenuItem>
                        <MenuItem value="Ver">Ver</MenuItem>
                        <MenuItem value="Ocultar">Ocultar</MenuItem>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={integrante.permissions.planesTransformacion || 'Ver'}
                        onChange={(e) => handlePermissionChange(index, 'planesTransformacion', e.target.value)}
                      >
                        <MenuItem value="Editar">Editar</MenuItem>
                        <MenuItem value="Ver">Ver</MenuItem>
                        <MenuItem value="Ocultar">Ocultar</MenuItem>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={integrante.permissions.planeamientoFinanciero || 'Ver'}
                        onChange={(e) => handlePermissionChange(index, 'planeamientoFinanciero', e.target.value)}
                      >
                        <MenuItem value="Editar">Editar</MenuItem>
                        <MenuItem value="Ver">Ver</MenuItem>
                        <MenuItem value="Ocultar">Ocultar</MenuItem>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Button variant="contained" style={{ marginTop: 20 }}>Guardar</Button>
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
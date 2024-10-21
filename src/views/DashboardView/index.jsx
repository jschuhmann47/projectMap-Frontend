import React from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import Button from 'components/commons/Button';
import ProjectCard from 'components/commons/ProjectCard';
import {
  AdminButtonsContainer,
  ButtonContainer,
  ButtonContent,
  Container,
  Content,
  NoProjectsMessage,
  Title,
  TitleContainer,
} from './styles';
import { Box, TextField } from '@mui/material';
import { Clear } from '@mui/icons-material';

const DashboardView = (props) => {
  const {
    onAddNew,
    onClickProject,
    items,
    onClickDelete,
    isAdmin,
    searchText,
    onChangeSearchText,
    onClearSearch,
    userId,
    totalProjects,
    currentPage,
    projectsPerPage,
    onPageChange,
  } = props;

  return (
    <Container>
      <Content
        sx={{
          position: 'sticky',
          maxWidth: '100%',
          top: 0,
          backgroundColor: 'white',
          zIndex: 10,
          padding: '10px 0',
        }}
      >
        <TitleContainer>
          <Title>Proyectos</Title>
          {isAdmin && (
            <AdminButtonsContainer>
              {searchText && (
                <ButtonContainer>
                  <Button onClick={onClearSearch}>
                    <ButtonContent>
                      <Clear />Limpiar búsqueda
                    </ButtonContent>
                  </Button>
                </ButtonContainer>
              )}
              <>
                <TextField
                  placeholder='Buscar proyectos'
                  value={searchText}
                  onChange={onChangeSearchText}
                />
              </>
              <ButtonContainer>
                <Button onClick={onAddNew}>
                  <ButtonContent>
                    <AddCircleIcon />Nuevo
                  </ButtonContent>
                </Button>
              </ButtonContainer>
            </AdminButtonsContainer>
          )}
        </TitleContainer>
        {items.length === 0 ? (
          <NoProjectsMessage>
            {isAdmin ? 'No hay proyectos con este nombre.' : 'No tenés proyectos asignados.'}
          </NoProjectsMessage>
        ) : (
          <>
            <Grid container rowSpacing={1} columnSpacing={2}>
              {items.map(({ _id, color, name, description, coordinators, participants }) => (
                <Grid item xs={12} key={_id}>
                  <ProjectCard
                    key={_id}
                    color={color}
                    title={name}
                    description={description}
                    onClick={() => onClickProject(_id)}
                    onClickDelete={isAdmin ? () => onClickDelete(_id) : null}
                    isAdmin={isAdmin}
                    userRole={
                      coordinators.some((id) => id === userId)
                        ? 'Coordinador'
                        : participants.some((p) => p.user === userId)
                        ? 'Participante'
                        : ''
                    }
                  />
                </Grid>
              ))}
            </Grid>

            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
              <Pagination
                count={Math.ceil(totalProjects / projectsPerPage)}
                page={currentPage}
                onChange={onPageChange}
                color="primary"
              />
            </Box>
          </>
        )}
      </Content>
    </Container>
  );
};

export default DashboardView;

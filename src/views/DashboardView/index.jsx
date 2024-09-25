import AddCircleIcon from '@mui/icons-material/AddCircle';
import Grid from '@mui/material/Grid';

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
import { TextField } from '@mui/material';
import { Clear, Search } from '@mui/icons-material';
import KeyResultPopup from 'views/OKRView/components/KeyResult/indexv2';

const DashboardView = (props) => {
  const {
    onAddNew,
    onClickProject,
    items,
    onClickDelete,
    isAdmin,
    searchText,
    onChangeSearchText,
    onSearch,
    onClearSearch,
    userId
  } = props;

  return (
    <Container>
      <KeyResultPopup></KeyResultPopup>
      <Content>
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
                <ButtonContainer>
                  <Button onClick={onSearch}>
                    <ButtonContent>
                      <Search />
                    </ButtonContent>
                  </Button>
                </ButtonContainer>
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
          <Grid container rowSpacing={2} columnSpacing={4}>
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
        )}
      </Content>
    </Container>
  );
};

export default DashboardView;

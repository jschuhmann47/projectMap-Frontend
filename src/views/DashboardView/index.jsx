import AddCircleIcon from '@mui/icons-material/AddCircle';
import FilterListIcon from '@mui/icons-material/FilterList';
import Grid from '@mui/material/Grid';

import Button from 'components/commons/Button';
import ProjectCard from 'components/commons/ProjectCard';

import {
  ButtonContainer,
  ButtonContent,
  Container,
  Content,
  NoProjectsMessage,
  Title,
  TitleContainer,
} from './styles';

const DashboardView = (props) => {
  const { onAddNew, onClickProject, items, onClickDelete, onFilterProjects, isAdmin } = props;

  const handleFilterClick = () => {
    onFilterProjects({ date: '2021-01-01', name: 'Project' });
  };

  return (
    <Container>
      <Content>
        <TitleContainer>
          <Title>Proyectos</Title>
          {isAdmin && (
            <ButtonContainer>
              <Button onClick={onAddNew}>
                <ButtonContent>
                  <AddCircleIcon /> Nuevo
                </ButtonContent>
              </Button>
              <Button onClick={handleFilterClick}>
                <ButtonContent>
                  <FilterListIcon /> Filtros
                </ButtonContent>
              </Button>
            </ButtonContainer>
          )}
        </TitleContainer>
        {items.length === 0 ? (
          <NoProjectsMessage>Aún no hay proyectos</NoProjectsMessage>
        ) : (
          <Grid container rowSpacing={2} columnSpacing={4}>
            {items.map(({ _id, color, titulo, descripcion, coordinators }) => (
              <Grid item xs={12} key={_id}>
                <ProjectCard
                  key={_id}
                  color={color}
                  titulo={titulo}
                  descripcion={descripcion}
                  onClick={() => onClickProject(_id)}
                  onClickDelete={isAdmin ? () => onClickDelete(_id) : null}
                  isAdmin={isAdmin}
                  coordinators={coordinators}
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

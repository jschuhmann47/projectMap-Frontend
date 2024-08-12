import AddCircleIcon from '@mui/icons-material/AddCircle';
import FilterListIcon from '@mui/icons-material/FilterList';
import Grid from '@mui/material/Grid';
import { useState } from 'react';

import Button from 'components/commons/Button';
import ProjectCard from 'components/commons/ProjectCard';
import FilterProjectsModal from '../../components/commons/ProjectCard/components/FilterProjectsModal';

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
  const { onAddNew, onClickProject, items, onClickDelete, isAdmin } = props;

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filteredItems, setFilteredItems] = useState(items);

  const handleFilterClick = () => {
    setIsFilterModalOpen(true);
  };

  const handleCloseFilterModal = () => {
    setIsFilterModalOpen(false);
  };

  const handleApplyFilters = (filters) => {
    const { date, name } = filters;

    const filtered = items.filter(item => {
      const matchDate = date ? item.date === date : true;
      const matchName = name ? item.titulo.toLowerCase().includes(name.toLowerCase()) : true;
      return matchDate && matchName;
    });

    setFilteredItems(filtered);
    handleCloseFilterModal();
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
        {filteredItems.length === 0 ? (
          <NoProjectsMessage>Aún no hay proyectos</NoProjectsMessage>
        ) : (
          <Grid container rowSpacing={2} columnSpacing={4}>
            {filteredItems.map(({ _id, color, titulo, descripcion, coordinators, participants }) => (
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
                  participants={participants}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Content>
      <FilterProjectsModal
        isOpen={isFilterModalOpen}
        onClose={handleCloseFilterModal}
        onApplyFilters={handleApplyFilters}
      />
    </Container>
  );
};

export default DashboardView;

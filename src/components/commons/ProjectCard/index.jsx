import DeleteIcon from '@mui/icons-material/Delete';
import PersonIcon from '@mui/icons-material/Person';
import { Box, IconButton, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from 'redux/actions/user.actions';
import ConfirmDeleteModal from './components/confirmDeleteModal';
import { Card, CardContent, Description, Title, TitleContainer } from './styles';

const ProjectCard = (props) => {
  const {
    color,
    description,
    title,
    onClick,
    onClickDelete,
    onDeleteDisable = false,
    isAdmin,
    userRole,
  } = props;

  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmDeleteError, setConfirmDeleteError] = useState(null);

  const closeModal = () => {
    setIsModalOpen(false);
    setConfirmDeleteError(null);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const onSubmit = ({ name }) => {
    if (name !== title) {
      setConfirmDeleteError('Nombre del proyecto incorrecto.');
    } else {
      onClickDelete();
      closeModal();
    }
  };

  return (
    <>
      <Card style={{ backgroundColor: color }} onClick={onClick}>
        <CardContent>
          <TitleContainer>
            <Title>{title}</Title>
            <Box display="flex" alignItems="center">
              {!isAdmin && (
                <Typography variant="body2" sx={{ marginRight: 1 }}>
                  {userRole}
                </Typography>
              )}
              {!isAdmin ? (
                <PersonIcon style={{ color: 'black' }} />
              ) : (
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    openModal();
                  }}
                  disabled={onDeleteDisable}
                >
                  <DeleteIcon style={{ color: 'black' }} />
                </IconButton>
              )}
            </Box>
          </TitleContainer>
          <Description>{description}</Description>
        </CardContent>
      </Card>
      {isAdmin && (
        <ConfirmDeleteModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onSubmit={onSubmit}
          errors={confirmDeleteError}
          titulo="Eliminar proyecto"
          descripcion="Para confirmar la eliminación, confirme escribiendo el nombre del proyecto"
          placeholder="Nombre del proyecto."
        />
      )}
    </>
  );
};

export default ProjectCard;

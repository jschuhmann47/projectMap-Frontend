import { Box, Button, Modal, TextField } from '@mui/material';
import { useState } from 'react';

const FilterProjectsModal = ({ isOpen, onClose, onApplyFilters }) => {
  const [filterData, setFilterData] = useState({ date: '', name: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilterData({ ...filterData, [name]: value });
  };

  const handleSubmit = () => {
    onApplyFilters(filterData);
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box 
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <h2>Filtrar Proyectos</h2>
        <TextField
          label="Fecha"
          type="date"
          name="date"
          value={filterData.date}
          onChange={handleInputChange}
          fullWidth
          sx={{ marginBottom: 2 }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Nombre del Proyecto"
          name="name"
          value={filterData.name}
          onChange={handleInputChange}
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Aplicar Filtros
        </Button>
      </Box>
    </Modal>
  );
};

export default FilterProjectsModal;

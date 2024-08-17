import { Box, TextField, Typography } from "@mui/material";
import Button from "components/commons/Button";
import Modal from "components/commons/Modal";
import { useState } from "react";

export default function AddUserModal({
  onClose,
  onSearchUserByEmail,
  onAddUserToProject,
  info
}) {
  const [email, setEmail] = useState('');

  function onCloseModal() {
    setEmail('');
    onClose();
  }

  function addUserToProject() {
    onAddUserToProject(info.user.email, 'participant') // TODO: allow adding coordinator directly
  }

  return <Modal isOpen={info.isOpen} onClose={onCloseModal}>
    <Box>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Buscar Integrante
      </Typography>
      <TextField
        fullWidth
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        margin="normal"
        error={!!info.error}
        helperText={info.error}
      />
      <Button variant="contained" onClick={() => onSearchUserByEmail(email)}>Buscar</Button>
      {info.user && (
        <Box mt={2}>
          <Typography variant="body1">Usuario encontrado: {info.user.firstName} {info.user.lastName}</Typography>
          <Button variant="contained" color="primary" onClick={addUserToProject}>Confirmar</Button>
        </Box>
      )}
    </Box>
  </Modal>;
}
import { Box, TextField, Typography } from "@mui/material";
import Button from "components/commons/Button";
import Modal from "components/commons/Modal";
import { useState } from "react";

export default function AddUserModal({
  isOpen,
  onClose,
  onSearchUserByEmail,
  onAddUserToProject,
  info
}) {
  const [email, setEmail] = useState('');

  return <Modal isOpen={isOpen} onClose={onClose}>
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
      <Button variant="contained" onClick={onSearchUserByEmail}>Buscar</Button>
      {info.user && (
        <Box mt={2}>
          <Typography variant="body1">Usuario encontrado: {info.user.name}</Typography>
          <Button variant="contained" color="primary" onClick={onAddUserToProject}>Confirmar</Button>
        </Box>
      )}
    </Box>
  </Modal>;
}
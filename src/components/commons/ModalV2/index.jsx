import { Close } from '@mui/icons-material';
import { Box, IconButton, Modal, Typography } from '@mui/material';

export default function ModalV2({
  title,
  content,
  isOpen,
  onClose
}) {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      sx={{ display: 'flex', flexDirection: 'column' }}
    >
      <ModalV2Header title={title} onClose={onClose} />
      <Box sx={{ backgroundColor: '#E1ECEB' }}>
        {content}
      </Box>
    </Modal>
  )
}

function ModalV2Header({ title, onClose }) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        height: 30,
        backgroundColor: '#344345',
        fontSize: 18,
        color: 'white',
      }}
    >
      <Typography
        sx={{
          justifySelf: 'center',
          fontFamily: 'Fira Sans',
        }}
      >
        {title}
      </Typography>
      <IconButton onClick={onClose}>
        <Close />
      </IconButton>
    </Box>
  )
}
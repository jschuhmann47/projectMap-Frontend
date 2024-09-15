import { Close } from '@mui/icons-material';
import { Box, IconButton, Modal, Paper, Typography } from '@mui/material';

export default function ModalV2({
  title,
  children,
  isOpen,
  onClose
}) {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Paper
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: 500,
          borderRadius: '8px',
        }}
      >
        <ModalV2Header title={title} onClose={onClose} />
        <Box sx={{ backgroundColor: '#E1ECEB' }}>
          {children}
        </Box>
      </Paper>
    </Modal>
  )
}

function ModalV2Header({ title, onClose }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        height: 50,
        width: 'inherit',
        borderRadius: '8px 8px 0px 0px',
        backgroundColor: '#344345',
      }}
    >
      <Typography
        sx={{
          fontFamily: 'Fira Sans',
          fontSize: 18,
          color: 'white',
        }}
      >
        Crear proyecto
      </Typography>
      <IconButton onClick={onClose} sx={{ position: 'absolute', right: 1 }}>
        <Close htmlColor='white' />
      </IconButton>
    </Box>
  )
}
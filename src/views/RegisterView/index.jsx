import React from 'react';

import { Container } from 'styles/form';

import RegisterForm from './components/RegisterForm';
import { Box } from '@mui/material';

const RegisterView = ({ onSubmit }) => {
  return (
    <Container>
      <Box sx={{ width: '40%' }}>
        <img src='projectmap-logo-transparent.png' width='100%' />
      </Box>
      <RegisterForm onSubmit={onSubmit} />
    </Container>
  );
};

export default RegisterView;

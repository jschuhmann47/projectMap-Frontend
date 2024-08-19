import React from 'react';

import { Container } from 'styles/form';

import LoginForm from './components/LoginForm';
import { Box } from '@mui/material';

const LoginView = (props) => {
  const { onSubmit } = props;
  return (
    <Container>
      <Box sx={{ width: '40%' }}>
        <img src='projectmap-logo-transparent.png' width='100%' />
      </Box>
      <LoginForm onSubmit={onSubmit} />
    </Container>
  );
};

export default LoginView;

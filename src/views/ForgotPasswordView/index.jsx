import { Box } from '@mui/material';
import React from 'react';

import { Container } from 'styles/form';

import ForgotPasswordForm from 'views/ForgotPasswordView/components/ForgotPasswordForm';

const ForgotPasswordView = ({ onSubmit }) => {
  return (
    <Container>
      <Box sx={{ width: '40%' }}>
        <img src='projectmap-logo-transparent.png' width='100%' />
      </Box>
      <ForgotPasswordForm onSubmit={onSubmit} />
    </Container>
  );
};

export default ForgotPasswordView;

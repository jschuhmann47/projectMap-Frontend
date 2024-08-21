import React from 'react';

import { LogoLink } from './styles';
import { Box } from '@mui/material';

const Logo = () => {
  return (
    <LogoLink to="/dashboard">
      <Box sx={{ height: '100%' }}>
        <img src='projectmap-logo-for-header.png' height='100%' />
      </Box>
      <span>ProjectMap</span>
    </LogoLink>
  );
};

export default Logo;

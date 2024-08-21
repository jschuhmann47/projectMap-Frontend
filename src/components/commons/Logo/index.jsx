import React from 'react';

import { LogoLink } from './styles';
import { Box } from '@mui/material';

const Logo = () => {
  return (
    <LogoLink to="/dashboard">
      <Box sx={{ height: '100%' }}>
        <img src='projectMap-logo-for-header.png' height='100%' />
      </Box>
      <span>ProjectMap</span>
    </LogoLink>
  );
};

export default Logo;

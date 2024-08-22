import React from 'react';

import { LogoLink } from './styles';

const Logo = () => {
  return (
    <LogoLink to="/dashboard">
      <img src='/projectmap-logo-for-header.png' height='100%' />
      <span>ProjectMap</span>
    </LogoLink>
  );
};

export default Logo;

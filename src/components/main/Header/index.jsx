import React, { useState } from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { InfoOutlined, KeyboardArrowDown, KeyboardArrowUp, Star } from '@mui/icons-material';

import Logo from 'components/commons/Logo';

import {
  HeaderContainer,
  HeaderAccountContainer,
  ToolbarContainer,
  AccountButton,
  MenuItemText,
  ProfileAvatar,
} from './styles';
import { StepInfo } from 'views/ProjectView/styles';
import parse from 'html-react-parser';
import ModalV2 from 'components/commons/ModalV2';

const Header = (props) => {
  const { menuItems, user } = props;
  const [anchorElement, setAnchorElement] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const initials = `${user?.firstName?.charAt(0)}${
    user?.lastName?.charAt(0) || ''
  }`;

  const onCloseAccountMenu = () => setAnchorElement(null);

  return (
    <>
      <HeaderContainer data-testid="header" position="fixed">
        <ToolbarContainer>
          <Logo />
          {user && (
            <HeaderAccountContainer>
              { !user.isAdmin ? (
                <>
                  Planificación estratégica
                  <IconButton onClick={() => setIsModalOpen(true)}>
                    <InfoOutlined htmlColor='#FFFFFF' />
                  </IconButton>
                </>
              ) : 
                <Star />
              }
              
              {!!menuItems?.length && (
                <AccountButton
                  aria-haspopup="true"
                  id="basic-button"
                  endIcon={
                    !anchorElement ? <KeyboardArrowDown /> : <KeyboardArrowUp />
                  }
                  onClick={(event) => setAnchorElement(event.currentTarget)}
                >
                  <ProfileAvatar alt={initials}>{initials}</ProfileAvatar>
                </AccountButton>
              )}
              <Menu
                anchorEl={anchorElement}
                onClose={onCloseAccountMenu}
                open={!!anchorElement}
              >
                {menuItems?.map(({ key, label, onClick }) => (
                  <MenuItem
                    key={key}
                    onClick={() => {
                      onClick();
                      onCloseAccountMenu();
                    }}
                  >
                    <MenuItemText>{label}</MenuItemText>
                  </MenuItem>
                ))}
              </Menu>
              <ModalV2 isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title='Proceso de planificación estratégica'>
                <StepInfo>
                  {parse(info)}
                </StepInfo>
              </ModalV2>
            </HeaderAccountContainer>
          )}
        </ToolbarContainer>
      </HeaderContainer>
    </>
  );
};

// to do: alargar el texto (la mayoría del texto viejo hablaba de las esferas)
const info = `
<br>
El proceso de Planificación Estratégica se puede dividir en varias fases, cada una con herramientas específicas diseñadas para evaluar la situación actual de su proyecto, definir lineamientos estratégicos y establecer un plan de acción que le permita alcanzar los objetivos que decida plantear. En ProjectMap, hemos adaptado el proceso a nuestra herramienta definiendo siete etapas, cada una con sus respectivas herramientas. Estas etapas pueden completarse en cualquier orden, según la información que usted tenga disponible.
`

export default Header;

import React, { useState } from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { InfoOutlined, KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';

import Logo from 'components/commons/Logo';

import {
  HeaderContainer,
  HeaderAccountContainer,
  ToolbarContainer,
  AccountButton,
  MenuItemText,
  ProfileAvatar,
} from './styles';
import Modal from 'components/commons/Modal';
import { StepInfo, Title } from 'views/ProjectView/styles';
import parse from 'html-react-parser';

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
              <IconButton onClick={() => setIsModalOpen(true)}>
                <InfoOutlined htmlColor='#FFFFFF' />
              </IconButton>
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
              <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <StepInfo>
                  <Title>Proceso de planificación estratégica</Title>
                  {parse(info)}
                </StepInfo>
              </Modal>
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
El proceso de Planificación Estratégica puede ser dividido en varias fases, todas con sus distintas herramientas orientadas a evaluar la situación actual de su proyecto, definir lineamientos estratégicos y un plan de acción para alcanzar los objetivos que usted decida definir. En ProjectMap, y con el propósito de simplificar el mismo, nos limitamos a 7 etapas con sus respectivas herramientas. Las mismas pueden ser completadas en cualquier orden, dependiendo de la información que usted tenga a su disposición.
`

export default Header;

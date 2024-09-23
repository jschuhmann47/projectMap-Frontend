import { styled } from '@mui/system';
import { Link } from 'react-router-dom';

import { COLORS } from 'helpers/enums/colors';

import { Form } from 'formik';

export const Container = styled('div')({
  display: 'flex',
  flex: 1,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-around',
  background: '#273638',
});

export const FormContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: 32,
  width: '100%',
  maxWidth: '400px',
});

export const CustomForm = styled(Form)({
  display: 'flex',
  flexDirection: 'column',
  gap: 15,
  alignItems: 'center',
});

export const Title = styled('span')({
  fontFamily: 'Fira Sans, sans-serif',
  fontSize: '50px',
  color: COLORS.white,
});

export const CustomLink = styled(Link)({
  textDecoration: 'none',
  fontFamily: 'Fira Sans, sans-serif',
  fontSize: '18px',
  color: COLORS.BlueDianne,
  width: '100%'
});

export const ButtonsContainer = styled('div')({
  display: 'flex',
  width: '40%',
  gap: 15,
  justifyContent: 'space-between',
  paddingLeft: '30%',
  paddingRight: '30%',
});

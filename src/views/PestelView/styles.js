import { styled } from '@mui/system';
import { IconButton } from '@mui/material';

import { COLORS } from 'helpers/enums/colors';

export const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
});

export const ButtonContainer = styled('div')({
  display: 'flex',
  alignSelf: 'flex-end',
  button: {
    fontSize: 15,
  },
});

export const CardContent = styled('div')((props) => ({
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  backgroundColor: props.backgroundcolor,
  borderRadius: 15,
  padding: '12px 20px',
  maxHeight: 265,
}));

export const CardTitleContainer = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const CardTitle = styled('span')({
  fontFamily: "'Fira Sans'",
  fontStyle: 'normal',
  fontWeight: 700,
  fontSize: '24px',
  color: COLORS.BlueDianne,
});

export const AddButton = styled(IconButton)({
  color: COLORS.white,
});

export const CreateContent = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: 30,
});

export const FactoresContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  gap: 5,
  overflowY: 'auto',
});

export const FactorContent = styled('div')({
  display: 'flex',
  background: 'rgba(217, 217, 217, 0.7)',
  borderRadius: 15,
  padding: 10,

  button: {
    color: COLORS.BlueDianne,
  },
});

export const FactorDescription = styled('span')({
  display: 'flex',
  flex: 1,
  fontFamily: "'Fira Sans'",
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '16px',
  lineHeight: '14px',
  alignItems: 'center',
});

export const TitleContainer = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  flex: 1,
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  marginTop: '50px',
});

export const Title = styled('span')({
  fontFamily: 'Fira Sans',
  fontWeight: 500,
  fontSize: 24,
});

export const Puntuacion = styled('span')({
  fontFamily: 'Fira Sans',
  fontWeight: 500,
  fontSize: 24,
});

export const ChipContainer = styled('div')({
  padding: 8,
  span: {
    fontSize: 18,
    fontWeight: 700,
  },
});

export const ViewContainer = styled('div')({
  display: 'flex',
  margin: '0 auto',
  flexDirection: 'column',
  width: '90%',
});

export const ChartContainer = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  padding: '30px 0',
});

export const SectionTable = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  padding: '30px 0',
  gap: 20,
});
export const SectionRadar = styled('div')({});
export const SectionPie = styled('div')({});

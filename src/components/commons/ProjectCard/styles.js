import { styled } from '@mui/system';

export const Card = styled('div')({
  margin: '10px 0',
  width: '100%',
  cursor: 'pointer', // Añadimos el cursor de pointer para indicar que es clickeable
});

export const CardContent = styled('div')({
  padding: '20px',
  borderRadius: '8px',
});

export const TitleContainer = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const Title = styled('h2')({
  fontSize: '22px',
  margin: 0,
  color: 'black',
});

export const Description = styled('p')({
  fontSize: '14px',
  color: '#000',
});

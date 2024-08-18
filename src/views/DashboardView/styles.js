import { styled } from '@mui/system';

export const Container = styled('div')({
  display: 'flex',
  width: '100%',
  margin: '0 auto',
  maxWidth: 1200,
});

export const Content = styled('div')({
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  padding: '20px',
  gap: '20px',
});

export const TitleContainer = styled('div')({
  display: 'flex',
  width: '100%',
  flexDirection: 'row',
  paddingBottom: 16,
  borderBottom: '1px solid black',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const Title = styled('span')({
  fontSize: 24,
  fontWeight: 500,
});

export const ButtonContainer = styled('div')({
  display: 'flex',
  gap: 10,
});

export const ButtonContent = styled('span')({
  display: 'flex',
  fontSize: '14px',
  gap: 10,
  alignItems: 'center',

  svg: {
    fontSize: '16px',
  },
});

export const NoProjectsMessage = styled('div')({
  fontSize: 18,
  color: 'grey',
  textAlign: 'center',
  marginTop: 20,
});

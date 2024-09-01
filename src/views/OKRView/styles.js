import { styled } from '@mui/system';

export const KeyResultCell = styled('div')({
  display: 'flex',
  flex: 1,
  justifyContent: 'center',
});

export const OkrContainer = styled('div')({
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  gap: '40px',
});

export const OkrContainerV2 = styled('div')({
  fontFamily: "'Fira Sans'",
  marginLeft: '10%',
  marginRight: '10%',
  marginTop: '5%',
  display: 'flex',
  flexDirection: 'column',
})

export const OkrHeader = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const EditObjectiveButton = styled('div')({
  height: '60%',
  width: '20%',
})

export const OkrTitle = styled('span')({
  fontSize: 30,
});

export const OkrMoreData = styled('div')({
  fontSize: 24,
  display: 'flex',
  justifyContent: 'space-between',
});
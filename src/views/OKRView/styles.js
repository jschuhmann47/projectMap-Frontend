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
  marginLeft: '5%',
  marginRight: '5%',
  marginTop: '5%',
  display: 'flex',
  flexDirection: 'column',
})

export const OkrHeader = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  width: '100%',
  marginBottom: 10,
});

export const EditObjectiveButton = styled('div')({
  height: '60%',
  width: '20%',
});

export const OkrTitle = styled('span')({
  fontSize: 30,
  fontWeight: 'bold',
});

export const OkrProgressAndMoreData = styled('div')({
  display: 'grid',
  gridTemplateColumns: '2fr 1fr',
  fontSize: 18,
  width: '100%',
});

export const OkrProgress = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  height: '100%',
})

export const OkrProgressBar = styled('div')({
  width: '90%',
  marginRight: '5px',
})

export const OkrMoreData = styled('div')({
  display: 'flex',
  flexDirection: 'column',
});

export const KeyResultsHeader = styled('div')({
  fontSize: 22,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
})

export const KeyResultsContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: 10,
  marginTop: 10,
  marginBottom: 10,
});

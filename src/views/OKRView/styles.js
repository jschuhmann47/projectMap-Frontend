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
  width: '90%',
})

export const OkrHeader = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  width: '100%',
  marginBottom: 10,
  position: 'relative',
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

export const KeyResultsSubTitle = styled('div')({
  fontSize: 18,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
})

export const KeyResultsContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  marginTop: 10,
  marginBottom: 10,
  ['& >p']: {
    marginBottom: '20px'
  }
});

export const NoMeasurableContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column'
})

export const NoMeasurableList = styled('div')({
  margin: '30px 0 0 30px',
  height: "250px",
  overflow: "scroll"
})

export const NoMeasurableLine = styled('div')({
  marginTop: '15px',
  fontFamily: "'Fira Sans'"
})

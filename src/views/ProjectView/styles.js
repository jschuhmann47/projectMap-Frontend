import { styled } from '@mui/system';
import { AppBar, CircularProgress, Tab } from '@mui/material';
import { circularProgressClasses } from '@mui/material/CircularProgress';

import { COLORS } from 'helpers/enums/colors';

export const Container = styled('div')({
  display: 'flex',
  width: '100%',
  margin: '50px 20px 10px',
  alignItems: 'center',
  justifyContent: 'space-around',
  gap: '50px',
});

export const Content = styled('div')({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  borderRadius: '50%',
  height: '95%',
  maxWidth: '95%',
  aspectRatio: '1',
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

export const StepContainer = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  flex: 1,
});

export const Step = styled('div')({
  display: 'flex',
  position: 'relative',
  aspectRatio: '1',
});

export const ItemContainer = styled('div')({
  height: 160,
  position: 'absolute',
  aspectRatio: '1',
  borderRadius: '50%',
  backgroundColor: COLORS.GhostGray,
  display: 'flex',
});

export const Item = styled('div')({
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  alignItems: 'center',
});

export const ContentContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  svg: {
    fontSize: 14,
  },
  button: {
    backgroundColor: COLORS.white,
    marginBottom: 8,
  },
});

export const StepTitle = styled('span')({
  fontFamily: 'Fira Sans',
  fontWeight: 600,
  fontSize: 16,
  textAlign: 'center',
  padding: '0 20px',
});

export const MenuItemText = styled('div')({
  fontSize: 14,
  color: COLORS.BlueDianne,
});

export const CustomCircularProgress = styled(CircularProgress)({
  position: 'absolute',

  [`& .${circularProgressClasses.circle}`]: {
    strokeLinecap: 'round',
  },
});

export const TitleButtonContainer = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  padding: '40px',
  position: 'absolute',
  alignItems: 'center',
  width: '90%',
});

export const ButtonContainer = styled('div')({});

export const Title = styled('span')({
  fontFamily: 'Fira Sans',
  fontWeight: 500,
  fontSize: 36,
  padding: 10,
});

export const MainContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
});

export const Header = styled(AppBar)({
  position: 'relative',
  top: 'initial',
  height: 'fit-content',
  backgroundColor: '#405C5E',
});

export const ProjectTab = styled(Tab)({
  color: 'white !important',
  fontFamily: 'Fira Sans',
  fontSize: 20,
})

export const StepsContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
})

export const StepCard = styled('div')({
  width: '80%',
  height: 60,
  backgroundColor: '#719F9D',
  marginTop: 10,
  marginBottom: 10,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  paddingLeft: 20,
  fontSize: 20,
  border: 'solid 1px',
})

export const StepIcons = styled('div')({
  marginLeft: 'auto',
})

export const StepInfo = styled('div')({
  textAlign: 'left',
  display: 'flex',
  flexDirection: 'column',
  fontSize: 18,
  paddingTop: 5,
})

export const ChartHUD = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  position: 'fixed',
  zIndex: 9999,
  width: 'min-content',
})

export const ChartButtons = styled('div')({
  display: 'flex',
  gap: 10,
})

export const StageToolView = styled('div', )({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  alignItems: 'center'
});

export const ToolsView = styled('div',
  {shouldForwardProp: (prop) => prop !== 'columns',}
)(({ columns }) => ({
  display: 'grid',
  gap: '20px',
  gridTemplateColumns: `repeat(${columns}, 1fr)`,
  justifyItems: 'center',
  width: '100%'
}));

export const ToolCard = styled('div')({
  height: 60,
  backgroundColor: '#719F9D',
  marginTop: 10,
  marginBottom: 10,
  display: 'grid',
  gridTemplateColumns: '5fr 1fr',
  alignItems: 'center',
  paddingLeft: 20,
  fontSize: 20,
  border: 'solid 1px',
  ['p']: {
    textAlign: 'center',
  },
  minWidth: '500px'
})

export const ToolCardTitle = styled('div')({
  ['p']: {
    fontSize: '30px',
  },
  ['button']: {
    alignSelf: 'center',
    marginLeft: '10px'
  },
  display: 'flex',
  justifyContent: 'center'
})

export const ToolCardContainer = styled('div')({
  overflowY: 'scroll',
  height: '400px',
})
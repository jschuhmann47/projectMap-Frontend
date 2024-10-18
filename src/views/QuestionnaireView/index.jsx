import { ArrowBack } from '@mui/icons-material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Box, IconButton } from '@mui/material';
import Tab from '@mui/material/Tab';
import Button from 'components/commons/Button';
import TextStepper from 'components/commons/TextCarousel';
import parse from 'html-react-parser';
import { useState } from 'react';
import { ButtonContainer, Title, TitleContainer } from 'views/FodaView/styles';

const QuestionnaireView = ({
  title,
  onClickButtonGoBack,
  onClickNextButton,
  openComments,
  subjects,
}) => {
  const [subjectId, setSubjectId] = useState(1);

  const renderTitle = () => (
    <TitleContainer>
      <ButtonContainer>
        <IconButton size="small" onClick={onClickButtonGoBack}>
          <ArrowBack />
        </IconButton>
      </ButtonContainer>
      <Title sx={{ marginRight: '46%' }}>{title}</Title>
    </TitleContainer>
  );

  const handleChange = (event, newValue) => {
    setSubjectId(newValue);
  };

  const renderPPTs = (ppts) => {
    const pptsReady = ppts?.map((ppt, index) => ({
      label: `Página ${index + 1}`,
      description: parse(ppt),
    }));

    return <TextStepper steps={pptsReady} />;
  };

  const renderTabs = () => (
    <Box sx={{ marginTop: '40px' }}>
      <TabContext value={subjectId}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange}>
            {subjects?.map((subject) => (
              <Tab label={subject.titulo} value={subject.id} />
            ))}
          </TabList>
        </Box>
        {subjects?.map((subject) => (
          <TabPanel value={subject.id}>{renderPPTs(subject.ppts)}</TabPanel>
        ))}
      </TabContext>
    </Box>
  );

  const renderNextButton = () => (
    <Box sx={{ display: 'flex', justifyContent: 'end' }}>
      <ButtonContainer>
        <Button onClick={onClickNextButton}>
          Pasar al cuestionario
        </Button>
      </ButtonContainer>
    </Box>
  );

  return (
    <>
      {renderTitle()}
      {renderTabs()}
      {renderNextButton()}
    </>
  );
};

export default QuestionnaireView;

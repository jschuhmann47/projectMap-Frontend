import { ArrowBack } from '@mui/icons-material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Box, Grid, IconButton, Typography } from '@mui/material';
import Tab from '@mui/material/Tab';
import Button from 'components/commons/Button';
import SelectInput from 'components/inputs/SelectInput';
import { ErrorMessage, Field, Formik } from 'formik';
import { COLORS } from 'helpers/enums/colors';
import { validateField } from 'helpers/validateField';
import { useState } from 'react';
import { CustomForm } from 'styles/form';
import { ButtonContainer, Title, TitleContainer } from 'views/FodaView/styles';

function isEmpty(obj) {
  for(var i in obj) { return false; }
  return true;
}

const QuestionnaireQuestionsView = ({
  title,
  onClickButtonGoBack,
  onClickNextButton,
  openComments,
  questions,
  handleSubmit,
  initialValues,
  userPermission
}) => {
  const [subjectId, setSubjectId] = useState(1);
  const handleChange = (event, newValue) => {
    setSubjectId(newValue);
  };

  const renderTitle = () => (
    <TitleContainer>
      <ButtonContainer>
        <IconButton size="small" onClick={onClickButtonGoBack}>
          <ArrowBack />
        </IconButton>
      </ButtonContainer>
      <Title>{title}</Title>
    </TitleContainer>
  );

  const renderNextButton = () => (
    <Box sx={{ display: 'flex', justifyContent: 'end' }}>
      <ButtonContainer>
        <Button type="submit">
          Finalizar cuestionario
        </Button>
      </ButtonContainer>
    </Box>
  );

  const renderQuestions = () => (
    <Formik onSubmit={handleSubmit} initialValues={initialValues}>
      {({ handleSubmit }) => (
        <CustomForm onSubmit={handleSubmit} sx={{ gap: '0px' }}>
          <Box sx={{ marginTop: '40px', width: '100%' }}>
            <TabContext value={subjectId}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange}>
                  {questions?.map((subject) => (
                    <Tab label={subject.title} value={subject.chapterId} />
                  ))}
                </TabList>
              </Box>
              {questions?.map((subject) => (
                <TabPanel value={subject.chapterId}>
                  {subject.questions?.map(
                    ({ questionId, question, answers }) => (
                      <Grid
                        container
                        columnSpacing={3}
                        direction="row"
                        alignItems="center"
                        sx={{
                          backgroundColor:
                            questionId % 2 === 0
                              ? COLORS.Geyser
                              : COLORS.GhostGray,
                          width: '100%',
                          marginLeft: '0px',
                          padding: '20px',
                        }}
                      >
                        <Grid item xs={6}>
                          <Typography key={questionId}>{question}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Box sx={{ width: '100%' }}>
                            {userPermission === 'edit' ? (
                              <Field
                                name={`${subject.chapterId}.${questionId}.${question}`}
                                component={SelectInput}
                                options={answers?.map((answer) => answer.answer)}
                                placeholder="Respuesta.."
                                validate={validateField}
                              />
                            ) : (
                              initialValues[subject.chapterId][questionId][question]
                            )}
                            <ErrorMessage
                              name={`${subject.chapterId}.${questionId}.${question}`}
                            >
                              {(msg) => (
                                <Typography
                                  sx={{
                                    textAlign: 'left',
                                    color: 'red',
                                    marginLeft: 2,
                                    marginTop: '2px',
                                    fontSize: '14px',
                                  }}
                                >
                                  {msg}
                                </Typography>
                              )}
                            </ErrorMessage>
                          </Box>
                        </Grid>
                      </Grid>
                    )
                  )}
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      pt: 2,
                      width: '100%',
                      justifyContent: 'flex-end',
                    }}
                  >
                    {renderNextButton()}
                  </Box>
                </TabPanel>
              ))}
            </TabContext>
          </Box>
        </CustomForm>
      )}
    </Formik>
  );

  return (
    <>
      {renderTitle()}
      {!isEmpty(initialValues) && renderQuestions()}
    </>
  );
};

export default QuestionnaireQuestionsView;

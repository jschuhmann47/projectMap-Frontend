import React from 'react';
import {
  ButtonsContainer,
  CardTitle,
  CreateContent,
} from 'views/PorterView/styles';
import Button from 'components/commons/Button';
import { Formik, Field, ErrorMessage } from 'formik';
import { CustomForm } from 'styles/form';
import SelectInput from 'components/inputs/SelectInput';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { ArrowBack } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { ButtonContainer } from 'views/FodaView/styles';
import { validateField } from 'helpers/validateField';
import ToolTip from 'components/commons/ToolTip';
import { tooltips } from './tooltips';

const PorterView = ({
  options,
  questions,
  activeStep,
  handleBack,
  handleSubmit,
  steps,
  initialValues,
  titulo,
  onClickResults,
  onClickButtonGoBack,
  openComments,
  userPermission
}) => {
  return (
    <CreateContent>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
          justifyContent: 'space-between',
        }}
      >
        <IconButton size="small" onClick={onClickButtonGoBack}>
          <ArrowBack />
        </IconButton>
        <Box sx={{ display: 'flex', alignItems: 'center', marginRight: '30%' }}>
          <CardTitle sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{titulo}</CardTitle>
          <ToolTip text={tooltips[titulo]} placement="right" fontSize="14px" />
        </Box>
      </Box>
      <Formik onSubmit={handleSubmit} initialValues={initialValues}>
        {({ handleSubmit }) => (
          <CustomForm onSubmit={handleSubmit} sx={{ gap: '0px' }}>
            {questions?.map(({ id, pregunta }) => (
              <Grid
                container
                columnSpacing={3}
                direction="row"
                alignItems="center"
                sx={{
                  backgroundColor: id % 2 === 0 ? '#A0DBC0' : '#94BFBE',
                  width: '100%',
                  marginLeft: '0px',
                  padding: '20px',
                  borderTopLeftRadius: id === 1 ? '15px' : '0px',
                  borderBottomLeftRadius:
                    id === questions?.length ? '15px' : '0px',
                  borderTopRightRadius: id === 1 ? '15px' : '0px',
                  borderBottomRightRadius:
                    id === questions?.length ? '15px' : '0px',
                  borderTop: id === 1 ? '3px solid #264653' : '0',
                  borderRight: '3px solid #264653',
                  borderLeft: '3px solid #264653',
                  borderBottom: '3px solid #264653',
                }}
              >
                <Grid item xs={4}>
                  <Typography key={id}>{pregunta}</Typography>
                </Grid>
                {Object.entries(options)?.map(([key, value]) => (
                  <Grid item xs={4}>
                    <Box sx={{ width: '100%' }}>
                      {userPermission === 'edit' ? (
                        <Field
                          name={`${steps[activeStep]}.${id}.${key}`}
                          component={SelectInput}
                          options={value}
                          placeholder={
                            key === 'nivelDeConcordancia'
                              ? 'nivel de concordancia'
                              : 'valoración'
                          }
                          validate={validateField}
                        />
                        ) : (
                          initialValues[steps[activeStep]][id][key]
                        )
                      }
                    </Box>
                  </Grid>
                ))}
              </Grid>
            ))}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                pt: 2,
                width: '100%',
                justifyContent: 'flex-end',
              }}
            >
              <ButtonsContainer width={activeStep === 0 ? '25%' : null}>
                {activeStep !== 0 && (
                  <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                    type="button"
                  >
                    Atrás
                  </Button>
                )}
                <Button color="primary" type="submit">
                  {activeStep === steps.length - 1 ? 'Finalizar' : 'Siguiente'}
                </Button>
              </ButtonsContainer>
            </Box>
          </CustomForm>
        )}
      </Formik>
    </CreateContent>
  );
};

export default PorterView;

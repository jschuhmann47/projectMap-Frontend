import { Box, Typography } from '@mui/material';
import Button from 'components/commons/Button';
import Input from 'components/inputs/Input';
import { ErrorMessage, Field, Formik } from 'formik';
import { validateField, validatePasswordStrength } from 'helpers/validateField';
import React from 'react';

import { Container, CustomForm, FormContainer, Title } from 'styles/form';

const ResetPasswordView = ({ onVerifyCode, onResetPassword, step }) => {
  return (
    <Container>
      <Box sx={{ width: '40%' }}>
        <img src='projectmap-logo-transparent.png' width='100%' />
      </Box>
      {step === 'verifyCode' && <VerifyCodeForm onSubmit={onVerifyCode} />}
      {step === 'newPassword' && <NewPasswordForm onSubmit={onResetPassword} />}
    </Container>
  );
};

const VerifyCodeForm = ({ onSubmit }) => (
  <FormContainer>
    <Title>Verificar código</Title>
    <Formik onSubmit={onSubmit} initialValues={{ code: undefined }}>
      {({ handleSubmit }) => (
        <CustomForm onSubmit={handleSubmit}>
          <Box sx={{ width: '100%' }}>
            <Field
              name="code"
              placeholder="Código de seis dígitos"
              type="number"
              component={Input}
              validate={validateField}
            />
            <ErrorMessage name="code">
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
          <Button type="submit">Verificar</Button>
        </CustomForm>
      )}
    </Formik>
  </FormContainer>
);

const NewPasswordForm = ({ onSubmit }) => (
  <FormContainer>
    <Title>Nueva contraseña</Title>
    <Formik onSubmit={onSubmit} initialValues={{ password: '', repeat: '' }}>
      {({ handleSubmit, values }) => (
        <CustomForm onSubmit={handleSubmit}>
          <Box sx={{ width: '100%' }}>
            <Field
              name="password"
              type="password"
              placeholder="Contraseña"
              component={Input}
              validate={validatePasswordStrength}
            />
            <ErrorMessage name="password">
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
          <Box sx={{ width: '100%' }}>
            <Field
              name="repeat"
              type="password"
              placeholder="Repetir contraseña"
              component={Input}
              validate={(value) => {
                let error;
                if (!value) {
                  error = 'Confirma tu contraseña';
                } else if (value !== values.password) {
                  error = 'Las contraseñas no coinciden';
                }
                return error;
              }}
            />
            <ErrorMessage name="repeat">
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
          <Button type="submit">Cambiar contraseña</Button>
        </CustomForm>
      )}
    </Formik>
  </FormContainer>
);

export default ResetPasswordView;

import React from 'react';
import { ErrorMessage, Field, Formik } from 'formik';

import Input from 'components/inputs/Input';

import { Title } from 'styles/form';
import { FormContainer, CustomForm } from 'styles/form';
import { validateField, validatePasswordStrength } from 'helpers/validateField';
import { Box, Typography } from '@mui/material';
import Button from 'components/commons/Button';

const RegisterForm = ({ onSubmit }) => (
  <FormContainer>
    <Title>Registrate</Title>
    <Formik
      onSubmit={onSubmit}
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
      }}
    >
      {({ handleSubmit, values }) => (
        <CustomForm onSubmit={handleSubmit}>
          <Box sx={{ width: '100%' }}>
            <Field
              name="firstName"
              type="text"
              placeholder="Nombre"
              component={Input}
              validate={validateField}
            />
            <ErrorMessage name="firstName">
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
              name="lastName"
              type="text"
              placeholder="Apellido"
              component={Input}
              validate={validateField}
            />
            <ErrorMessage name="lastName">
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
              name="email"
              type="email"
              placeholder="Email"
              component={Input}
              validate={validateField}
            />
            <ErrorMessage name="email">
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
              name="confirmPassword"
              type="password"
              placeholder="Confirmar contraseña"
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
            <ErrorMessage name="confirmPassword">
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
          <Button type="submit">Enviar</Button>
        </CustomForm>
      )}
    </Formik>
  </FormContainer>
);

export default RegisterForm;

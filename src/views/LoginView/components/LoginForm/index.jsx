import React from 'react';
import { ErrorMessage, Field, Formik } from 'formik';

import Input from 'components/inputs/Input';
import Button from 'components/commons/Button';

import { Title } from 'styles/form';
import {
  FormContainer,
  CustomForm,
  CustomLink,
} from 'styles/form';
import { validateField } from 'helpers/validateField';
import { Box, Typography } from '@mui/material';

const LoginForm = ({ onSubmit }) => (
  <FormContainer>
    <Title>Iniciar sesión</Title>
    <Formik onSubmit={onSubmit} initialValues={{ email: '', password: '' }}>
      {({ handleSubmit }) => (
        <CustomForm onSubmit={handleSubmit}>
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
              validate={validateField}
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
          <Button type="submit">Iniciar sesión</Button>
          <CustomLink to="/register">
            <Button color='primary'>Crear una cuenta</Button>
          </CustomLink>
          <CustomLink to="/forgot-password">
            Olvidé mi contraseña
          </CustomLink>
        </CustomForm>
      )}
    </Formik>
  </FormContainer>
);

export default LoginForm;

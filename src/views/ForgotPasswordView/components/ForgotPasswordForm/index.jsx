import React from 'react';
import { ErrorMessage, Field, Formik } from 'formik';

import Input from 'components/inputs/Input';

import { Title } from 'styles/form';
import { FormContainer, CustomForm } from 'styles/form';
import { validateField } from 'helpers/validateField';
import { Box, Typography } from '@mui/material';
import Button from 'components/commons/Button';

const ForgotPasswordForm = ({ onSubmit }) => (
  <FormContainer>
    <Title>Olvidé mi contraseña</Title>
    <Formik onSubmit={onSubmit} initialValues={{ email: '' }}>
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
          <Button type="submit">Enviar</Button>
        </CustomForm>
      )}
    </Formik>
  </FormContainer>
);

export default ForgotPasswordForm;

import { ErrorMessage, Field, Formik } from 'formik';

import Input from 'components/inputs/Input';
import Textarea from 'components/inputs/Textarea';

import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { validateField } from 'helpers/validateField';
import { CustomForm, FormContainer, SubmitButton } from 'styles/form';

const ProjectForm = ({ onSubmit }) => (
  <FormContainer>
    <Formik onSubmit={onSubmit} initialValues={{ titulo: '', descripcion: '' }}>
      {({ handleSubmit, errors, touched }) => (
        <CustomForm onSubmit={handleSubmit}>
          <Box sx={{ width: '100%', height: '100px' }}>
            <Field
              name="titulo"
              type="text"
              placeholder="Titulo"
              component={Input}
              validate={validateField}
            />
            <ErrorMessage name="titulo">
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
          <Box sx={{ width: '100%', height: '140px' }}>
            <Field
              name="descripcion"
              placeholder="Descripción"
              component={Textarea}
              validate={validateField}
            />
            <ErrorMessage name="descripcion">
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

          <SubmitButton type="submit" color="primary">
            Crear
          </SubmitButton>
        </CustomForm>
      )}
    </Formik>
  </FormContainer>
);

export default ProjectForm;

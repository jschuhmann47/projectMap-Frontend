import { ErrorMessage, Field, Form, Formik } from 'formik';

import Input from 'components/inputs/Input';
import Textarea from 'components/inputs/Textarea';
import Button from 'components/commons/Button';

import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { validateField } from 'helpers/validateField';
import InputV2 from 'components/inputs/InputV2';

const ProjectForm = ({ onSubmit }) => (
  <Formik onSubmit={onSubmit} initialValues={{ titulo: '', descripcion: '' }}>
    {({ handleSubmit }) => (
      <Form onSubmit={handleSubmit}>
        <Box sx={{ width: '100%', height: '100px' }}>
          <Field
            name="titulo"
            type="text"
            placeholder="Titulo"
            component={InputV2}
            validate={validateField}
          />
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

        <Button type="submit" color="primary">
          Crear
        </Button>
      </Form>
    )}
  </Formik>
);

export default ProjectForm;

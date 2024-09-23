import { Field, Form, Formik } from 'formik';

import Button from 'components/commons/Button';

import { validateField } from 'helpers/validateField';
import InputV2 from 'components/inputs/InputV2';
import { Box } from '@mui/material';
import { ButtonsContainer } from 'styles/form';

const ProjectForm = ({ onSubmit }) => (
  <Formik onSubmit={onSubmit} initialValues={{ titulo: '', descripcion: '' }}>
    {({ handleSubmit }) => (
      <Form onSubmit={handleSubmit}>
        <Field
          name="titulo"
          fieldLabel="Nombre del proyecto"
          component={InputV2}
          validate={validateField}
        />
        <Field
          name="descripcion"
          fieldLabel="Descripción"
          multiline
          component={InputV2}
          validate={validateField}
        />
        <ButtonsContainer>
          <Button type="submit">
            Crear
          </Button>
        </ButtonsContainer>
      </Form>
    )}
  </Formik>
);

export default ProjectForm;

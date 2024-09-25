import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import Button from 'components/commons/Button';
import ModalV2 from 'components/commons/ModalV2';
import InputV2 from 'components/inputs/InputV2';
import { Field, Form, Formik } from 'formik';
import { validateField } from 'helpers/validateField';
import React from 'react';
import { ButtonsContainer } from 'styles/form';

const ConfirmDeleteModal = ({
  isOpen,
  onClose,
  onSubmit,
  errors,
  titulo,
  descripcion,
  fieldLabel,
}) => {
  const initialValues = {};
  return (
    <ModalV2 isOpen={isOpen} title={titulo} onClose={onClose}>
      <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '5px' }}>
        <span
          style={{
            fontFamily: "'Fira Sans'",
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: '18px',
          }}
        >
          {descripcion}
        </span>
      </Box>
      <Box sx={{ alignItems: 'center' }}>
        <Formik onSubmit={onSubmit} initialValues={initialValues}>
          {({ handleSubmit, setFieldValue }) => (
            <Form
              onSubmit={handleSubmit}
            >
              <Box
                sx={{
                  display: 'flex',
                  width: '100%',
                  gap: 15,
                  justifyContent: 'space-between',
                }}
              >
                <Box sx={{ width: '100%' }}>
                  <Field
                    name="name"
                    component={InputV2}
                    fieldLabel={fieldLabel}
                    validate={validateField}
                    onChange={(name) => {
                      setFieldValue('name', name);
                    }}
                  />
                  {errors ? (
                    <Typography
                      sx={{
                        textAlign: 'left',
                        color: 'red',
                        marginLeft: 2,
                        marginTop: '2px',
                        fontSize: '14px',
                      }}
                    >
                      {errors}
                    </Typography>
                  ) : (
                    <></>
                  )}
                </Box>
              </Box>
              <ButtonsContainer>
                <Button color="secondary" onClick={() => onClose()}>
                  Cancelar
                </Button>
                <Button type="submit">
                  Confirmar
                </Button>
              </ButtonsContainer>
            </Form>
          )}
        </Formik>
      </Box>
    </ModalV2>
  );
};

export default ConfirmDeleteModal;

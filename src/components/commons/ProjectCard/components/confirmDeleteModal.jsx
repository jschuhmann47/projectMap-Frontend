import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import Button from 'components/commons/Button';
import ModalV2 from 'components/commons/ModalV2';
import InputV2 from 'components/inputs/InputV2';
import { Field, Form, Formik } from 'formik';
import { COLORS } from 'helpers/enums/colors';
import { validateField } from 'helpers/validateField';
import React from 'react';

const ConfirmDeleteModal = ({
  isOpen,
  onClose,
  onSubmit,
  errors,
  titulo,
  descripcion,
  placeholder,
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
                    fieldLabel={placeholder}
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
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '40%',
                  paddingLeft: '30%',
                  paddingRight: '30%',
                }}
              >
                <Button color="secondary" onClick={() => onClose()}>
                  Cancelar
                </Button>
                <Button color="primary" type="submit">
                  Confirmar
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </ModalV2>
  );
};

export default ConfirmDeleteModal;

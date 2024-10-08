import { Box, Typography } from "@mui/material";
import Button from "components/commons/Button";
import ModalV2 from "components/commons/ModalV2";
import InputV2 from "components/inputs/InputV2";
import { Field, Form, Formik } from "formik";
import { validateField } from "helpers/validateField";

export default function AddUserModal({
  onClose,
  onSearchUserByEmail,
  onAddUserToProject,
  onGoBack,
  info
}) {
  function addUserToProject() {
    onAddUserToProject(info.user.email, 'participant') // TODO: allow adding coordinator directly
  }

  return (
    <ModalV2 isOpen={info.isOpen} onClose={onClose} title='Agregar integrante' width={800}>
      <Box sx={{ height: 150 }}>
        {!info.user && (
          <Formik onSubmit={({ userEmail }) => onSearchUserByEmail(userEmail)} initialValues={{ userEmail: '' }}>
            {({ handleSubmit }) => (
              <Form onSubmit={handleSubmit} style={{ position: 'relative', height: 150 }}>
                <Field
                  name='userEmail'
                  fieldLabel='Email'
                  component={InputV2}
                  validate={validateField}
                />
                <Box sx={{ color: 'red', marginTop: 1 }}>
                  {info.error ? 'No se encontró un usuario con este email.' : ''}
                </Box>
                <Box sx={{ paddingLeft: '30%', paddingRight: '30%', width: '40%', position: 'absolute', bottom: 0 }}>
                  <Button type='submit'>Buscar</Button>
                </Box>
              </Form>
            )}
          </Formik>
        )}
        {info.user && (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '5px' }}>
            <Typography sx={{ fontFamily: 'Fira Sans', fontSize: 18, fontWeight: 'bold', marginBottom: 1 }}>
              ¡Usuario encontrado!
            </Typography>
            <Typography sx={{ fontFamily: 'Fira Sans', fontSize: 18, marginBottom: 0.5 }}>
              Email: {info.user.email}
            </Typography>
            <Typography sx={{ fontFamily: 'Fira Sans', fontSize: 18, marginBottom: 0.5 }}>
              Nombre: {info.user.firstName} {info.user.lastName}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '40%',
                paddingLeft: '30%',
                paddingRight: '30%',
                marginTop: 0.5
              }}
            >
              <Button color="secondary" onClick={onGoBack}>Atrás</Button>
              <Button onClick={addUserToProject}>Confirmar</Button>
            </Box>
          </Box>
        )}
      </Box>
    </ModalV2>
  );
}
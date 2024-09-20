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
  
  return <ModalV2 isOpen={info.isOpen} onClose={onClose} title='Buscar Integrante'>
    <Box sx={{ minHeight: 150, maxHeight: 150 }}>
      {!info.user && (
        <Formik onSubmit={({ userEmail }) => onSearchUserByEmail(userEmail)} initialValues={{ userEmail: '' }}>
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <Field
                name='userEmail'
                fieldLabel='Email'
                component={InputV2}
                validate={validateField}
              />
              <Box sx={{ paddingLeft: '30%', paddingRight: '30%', width: '40%' }}>
                <Button type='submit'>Buscar</Button>
              </Box>
            </Form>
          )}
        </Formik>
      )}
      {info.user && (
        <Box mt={2} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography sx={{ fontFamily: 'Fira Sans', fontSize: 18 }}>
            ¡Usuario encontrado!
          </Typography>
          <Typography sx={{ fontFamily: 'Fira Sans', fontSize: 18 }}>
            Email: {info.user.email}
          </Typography>
          <Typography sx={{ fontFamily: 'Fira Sans', fontSize: 18 }}>
            Nombre: {info.user.firstName} {info.user.lastName}
          </Typography>
          <Button onClick={onGoBack}>Atrás</Button>
          <Button onClick={addUserToProject}>Confirmar</Button>
        </Box>
      )}
    </Box>
  </ModalV2>;
}
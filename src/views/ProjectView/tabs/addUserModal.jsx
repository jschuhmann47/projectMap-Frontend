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
  info
}) {
  function addUserToProject() {
    onAddUserToProject(info.user.email, 'participant') // TODO: allow adding coordinator directly
  }

  return <ModalV2 isOpen={info.isOpen} onClose={onClose} title='Buscar Integrante'>
    <Box>
      <Formik onSubmit={({ userEmail }) => onSearchUserByEmail(userEmail)} initialValues={{ userEmail: '' }}>
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Field
              name='userEmail'
              fieldLabel='Email'
              component={InputV2}
              validate={validateField}
            />
            <Button type='submit'>Buscar</Button>
          </Form>
        )}
      </Formik>
      {info.user && (
        <Box mt={2}>
          <Typography variant="body1">Usuario encontrado: {info.user.firstName} {info.user.lastName}</Typography>
          <Button onClick={addUserToProject}>Confirmar</Button>
        </Box>
      )}
    </Box>
  </ModalV2>;
}
import { horizonOptions } from "helpers/enums/okr";
import { EditObjectiveButton, OkrContainerV2, OkrHeader, OkrMoreData, OkrTitle } from "./styles";
import Button from "components/commons/Button";
import Modal from "components/commons/Modal";
import { ButtonsContainer, CustomForm, FormContainer } from "styles/form";
import { ErrorMessage, Field, Formik } from "formik";
import { CardTitle } from "views/FodaView/styles";
import { Box, Typography } from "@mui/material";
import { validateField } from "helpers/validateField";
import Input from "components/inputs/Input";

const OKRView = ({
  okrData,
  openEditOkrModal,
  closeEditOkrModal,
  isEditOkrModalOpen,
  editObjective,
}) => {
  return <OkrContainerV2>
    <OkrHeader>
      <OkrTitle>{okrData?.description}</OkrTitle>
      <EditObjectiveButton>
        <Button onClick={openEditOkrModal}>Editar objetivo</Button>
      </EditObjectiveButton>
    </OkrHeader>
    <OkrMoreData>
      <span>Área: {okrData?.area}</span>
      <span>Horizonte: {horizonOptions[okrData?.horizon]}</span>
      <span>Prioridad: {okrData?.priority}</span>
      <span>Avance: {okrData?.progress * 100}%</span>
    </OkrMoreData>
    {isEditOkrModalOpen && 'se abrió el modal'}
    <Modal isOpen={isEditOkrModalOpen} onClose={closeEditOkrModal} backgroundColor='#C7DAD9'>
      <FormContainer>
        <Formik
          onSubmit={editObjective}
          initialValues={{ description: okrData?.description, area: okrData?.area }}
        >
          {({ handleSubmit }) => (
            <CustomForm onSubmit={handleSubmit}>
              <CardTitle>Editar objetivo</CardTitle>
              <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Field
                  name="description"
                  placeholder="Título"
                  component={Input}
                  validate={validateField}
                />
                <ErrorMessage name="description">
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
                <Field
                  name="area"
                  placeholder="Área"
                  component={Input}
                  validate={validateField}
                />
              </Box>
              <ButtonsContainer>
                <Button color="secondary" onClick={closeEditOkrModal}>
                  Cancelar
                </Button>
                <Button color="primary" type="submit">
                  Agregar
                </Button>
              </ButtonsContainer>
            </CustomForm>
          )}
        </Formik>
      </FormContainer>
    </Modal>
  </OkrContainerV2>
};

export default OKRView;

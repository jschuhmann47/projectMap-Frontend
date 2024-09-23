import { filterFrequenciesByHorizon, horizonOptions, priorityOptions } from "helpers/enums/okr";
import { EditObjectiveButton, KeyResultsContainer, OkrContainerV2, OkrHeader, OkrMoreData, OkrTitle } from "./styles";
import Button from "components/commons/Button";
import Modal from "components/commons/Modal";
import { ButtonsContainer, CustomForm, FormContainer } from "styles/form";
import { ErrorMessage, Field, Formik } from "formik";
import { CardTitle } from "views/FodaView/styles";
import { Box, Typography } from "@mui/material";
import { validateField } from "helpers/validateField";
import Input from "components/inputs/Input";
import KeyResult from "./components/KeyResult";
import SelectInput from "components/inputs/SelectInput";

const OKRView = ({
  okrData,
  openEditOkrModal,
  closeEditOkrModal,
  isEditOkrModalOpen,
  editObjective,
  openAddKrModal,
  closeAddKrModal,
  isAddKrModalOpen,
  addKr,
  editKr,
  deleteKr,
  organizationalNodes,
  handleAreaChange,
  setFieldValue
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
      <span>Prioridad: <img src={priorityOptions[okrData?.priority]} height="20" width="20" /></span>
      <span>Avance: {okrData?.progress}%</span>
    </OkrMoreData>
    <KeyResultsContainer>
      {okrData?.keyResults.map((kr) => (
        <KeyResult krData={kr} editKr={editKr} deleteKr={deleteKr} />
      ))}
    </KeyResultsContainer>
    <Button onClick={openAddKrModal}>Agregar Key Result</Button>
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
                  component={SelectInput}
                  options={[
                    { value:"", label: "Sin área" },
                    ...organizationalNodes.map((node) => ({
                      value: node.id,
                      label: node.data.label
                    }))
                  ].map(option => option.label)}
                  onChange={(e) => handleAreaChange(e, setFieldValue)}
                  validate={validateField}
                />
              </Box>
              <ButtonsContainer>
                <Button color="secondary" onClick={closeEditOkrModal}>
                  Cancelar
                </Button>
                <Button color="primary" type="submit">
                  Editar
                </Button>
              </ButtonsContainer>
            </CustomForm>
          )}
        </Formik>
      </FormContainer>
    </Modal>
    <Modal isOpen={isAddKrModalOpen} onClose={closeAddKrModal} backgroundColor='#C7DAD9'>
      <FormContainer>
        <Formik
          onSubmit={addKr}
          initialValues={{ description: '', frequency: '', responsible: '' }}
        >
          {({ handleSubmit }) => (
            <CustomForm onSubmit={handleSubmit}>
              <CardTitle>Agregar Key Result</CardTitle>
              <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Field
                  name="description"
                  placeholder="Nombre"
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
                  name="frequency"
                  placeholder="Frecuencia"
                  component={SelectInput}
                  options={filterFrequenciesByHorizon(okrData?.horizon)}
                  validate={validateField}
                />
                <ErrorMessage name="frequency">
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
                  name="responsible"
                  placeholder="Responsable"
                  component={Input}
                  validate={validateField}
                />
                <ErrorMessage name="responsible">
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

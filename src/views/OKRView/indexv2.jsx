import { filterFrequenciesByHorizon, horizonOptions, priorityOptions } from "helpers/enums/okr";
import { EditObjectiveButton, KeyResultsContainer, OkrContainerV2, OkrHeader, OkrMoreData, OkrTitle } from "./styles";
import Button from "components/commons/Button";
import Modal from "components/commons/Modal";
import { ButtonsContainer, CustomForm, FormContainer } from "styles/form";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { CardTitle } from "views/FodaView/styles";
import { Box, Typography } from "@mui/material";
import { validateField } from "helpers/validateField";
import Input from "components/inputs/Input";
import KeyResult from "./components/KeyResult";
import SelectInput from "components/inputs/SelectInput";
import ModalV2 from "components/commons/ModalV2";
import InputV2 from "components/inputs/InputV2";
import SelectInputV2 from "components/inputs/SelectInputV2";

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
  deleteKr
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
    <ModalV2
      isOpen={isEditOkrModalOpen}
      onClose={closeEditOkrModal}
      title='Editar objetivo'
    >
      <Formik
        onSubmit={editObjective}
        initialValues={{ description: okrData?.description, area: okrData?.area }}
      >
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Field
              name="description"
              fieldLabel="Título"
              component={InputV2}
              validate={validateField}
            />
            <Field
              name="area"
              fieldLabel="Área"
              component={InputV2}
              validate={validateField}
            />
            <ButtonsContainer>
              <Button color="secondary" onClick={closeEditOkrModal}>
                Cancelar
              </Button>
              <Button color="primary" type="submit">
                Editar
              </Button>
            </ButtonsContainer>
          </Form>
        )}
      </Formik>
    </ModalV2>
    <ModalV2
      isOpen={isAddKrModalOpen}
      onClose={closeAddKrModal}
      title='Agregar Key Result'
    >
      <Formik
        onSubmit={addKr}
        initialValues={{ description: '', frequency: '', responsible: '' }}
      >
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Field
              name="description"
              fieldLabel="Nombre"
              component={InputV2}
              validate={validateField}
            />
            <Field
              name="frequency"
              fieldLabel="Frecuencia"
              component={SelectInputV2}
              options={filterFrequenciesByHorizon(okrData?.horizon)}
              validate={validateField}
            />
            <Field
              name="responsible"
              fieldLabel="Responsable"
              component={InputV2}
              validate={validateField}
            />
            <ButtonsContainer>
              <Button color="secondary" onClick={closeEditOkrModal}>
                Cancelar
              </Button>
              <Button color="primary" type="submit">
                Agregar
              </Button>
            </ButtonsContainer>
          </Form>
        )}
      </Formik>
    </ModalV2>
  </OkrContainerV2>
};

export default OKRView;

import { filterFrequenciesByHorizon, horizonOptions, priorityOptions } from "helpers/enums/okr";
import { EditObjectiveButton, KeyResultsContainer, KeyResultsHeader, OkrContainerV2, OkrHeader, OkrMoreData, OkrProgress, OkrProgressAndMoreData, OkrProgressBar, OkrTitle } from "./styles";
import Button from "components/commons/Button";
import { ButtonsContainer } from "styles/form";
import { Field, Form, Formik } from "formik";
import { validateField } from "helpers/validateField";
import KeyResult from "./components/KeyResult";
import ModalV2 from "components/commons/ModalV2";
import InputV2 from "components/inputs/InputV2";
import SelectInputV2 from "components/inputs/SelectInputV2";
import { IconButton, LinearProgress } from "@mui/material";
import { AddCircle } from "@mui/icons-material";

const OKRView = ({
  okrData,
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
    </OkrHeader>
    <OkrProgressAndMoreData>
      <OkrProgress>
        <OkrProgressBar>
          <LinearProgress value={okrData?.progress} variant="determinate" sx={{
            height: 20,
            backgroundColor: 'transparent',
            border: '1px solid',
            borderRadius: '8px',
            ['.MuiLinearProgress-bar1Determinate']: { backgroundColor: '#405C5E' },
          }} />
        </OkrProgressBar>
        <span>{okrData?.progress}%</span>
      </OkrProgress>
      <OkrMoreData>
        <span>Área: {okrData?.area}</span>
        <span>Horizonte: {horizonOptions[okrData?.horizon]}</span>
        <span>Prioridad: <img src={priorityOptions[okrData?.priority]} height="20" width="20" /></span>
      </OkrMoreData>
    </OkrProgressAndMoreData>
    <KeyResultsHeader>
      Key Results
      <IconButton onClick={openAddKrModal}>
        <AddCircle htmlColor='black' />
      </IconButton>
    </KeyResultsHeader>
    <KeyResultsContainer>
      {okrData?.keyResults.map((kr) => (
        <KeyResult krData={kr} editKr={editKr} deleteKr={deleteKr} />
      ))}
    </KeyResultsContainer>
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
              <Button color="secondary" onClick={closeAddKrModal}>
                Cancelar
              </Button>
              <Button type="submit">
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

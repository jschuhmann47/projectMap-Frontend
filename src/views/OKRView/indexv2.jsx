import { filterFrequenciesByHorizon, horizonOptions, priorityOptions } from "helpers/enums/okr";
import { KeyResultsContainer, KeyResultsHeader, OkrContainerV2, OkrHeader, OkrMoreData, OkrProgress, OkrProgressAndMoreData, OkrProgressBar, OkrTitle } from "./styles";
import Button from "components/commons/Button";
import { ButtonsContainer } from "styles/form";
import { Field, Form, Formik } from "formik";
import { validateField } from "helpers/validateField";
import KeyResult from "./components/KeyResult";
import ModalV2 from "components/commons/ModalV2";
import InputV2 from "components/inputs/InputV2";
import SelectInputV2 from "components/inputs/SelectInputV2";
import { Box, IconButton, LinearProgress, Typography } from "@mui/material";
import ConfirmDeleteModal from "components/commons/ProjectCard/components/confirmDeleteModal";
import ImgSelect from "./components/ImgSelect";
import { AddCircle, ArrowBack } from "@mui/icons-material";
import { format, parseISO } from 'date-fns';

const OKRView = ({
  okrData,
  openAddKrModal,
  closeAddKrModal,
  isAddKrModalOpen,
  addKr,
  openConfirmDeleteModal,
  closeConfirmDeleteModal,
  isConfirmDeleteModalOpen,
  submitConfirmDeleteModal,
  confirmDeleteModalError,
  openKrEditModal,
  onClickBack,
}) => {

  return <OkrContainerV2>
    <OkrHeader>
      <IconButton size="small" onClick={onClickBack} sx={{ position: 'absolute', left: 0 }}>
        <ArrowBack />
      </IconButton>
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
        <span>Fecha de inicio: {okrData?.startingDate ? format(parseISO(okrData.startingDate), 'dd-MM-yyyy') : ''}</span>
      </OkrMoreData>
    </OkrProgressAndMoreData>
    <KeyResultsHeader>
      Key Results
      <IconButton onClick={openAddKrModal}>
        <AddCircle htmlColor='black' />
      </IconButton>
    </KeyResultsHeader>
    <KeyResultsContainer>
      {okrData?.keyResults.map((kr, index) => (
        <KeyResult
          key={index}
          krData={kr}
          openConfirmDeleteModal={openConfirmDeleteModal}
          handleKrClick={openKrEditModal}
        />
      ))}
    </KeyResultsContainer>
    <ModalV2
      isOpen={isAddKrModalOpen}
      onClose={closeAddKrModal}
      title='Agregar Key Result'
    >
      <Formik
        onSubmit={addKr}
        initialValues={{ description: '', frequency: '', responsible: '', priority: 0 }}
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
              name="baseline"
              fieldLabel="Línea Base"
              component={InputV2}
              validate={validateField}
            />
            <Field
              name="goal"
              fieldLabel="Resultado esperado"
              component={InputV2}
              validate={validateField}
            />
            <Field
              fieldLabel="Prioridad"
              inputLayout='inline'
              component={(props) => {
                return (
                  <>
                    <Box sx={{display: 'flex'}}>
                      <Box sx={{mr: 1}}>
                        <Typography sx={{ mt: 1 }}>{props.fieldLabel}</Typography>
                      </Box>                    
                      <Box>
                        <ImgSelect {...props} style={{sx: {height: "34px"}}}></ImgSelect>
                      </Box>
                    </Box>
                  </>
                )
                }}
                name="priority"
                options={priorityOptions.map((path, i) => ({ path, value: i }))}
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
    <ConfirmDeleteModal
      isOpen={isConfirmDeleteModalOpen}
      onClose={closeConfirmDeleteModal}
      onSubmit={submitConfirmDeleteModal}
      errors={confirmDeleteModalError}
      titulo='Eliminar Key Result'
      descripcion='Para confirmar, escriba el nombre del Key Result'
      fieldLabel='Nombre del Key Result'
    />
  </OkrContainerV2>
};

export default OKRView;

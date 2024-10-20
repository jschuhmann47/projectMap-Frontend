import { filterFrequenciesByHorizon, horizonOptions, priorityOptions } from "helpers/enums/okr";
import { KeyResultsContainer, KeyResultsHeader, KeyResultsSubTitle, NoMeasurableContainer, NoMeasurableLine, NoMeasurableList, OkrContainerV2, OkrHeader, OkrMoreData, OkrProgress, OkrProgressAndMoreData, OkrProgressBar, OkrTitle } from "./styles";
import Button from "components/commons/Button";
import { ButtonsContainer } from "styles/form";
import { Field, Form, Formik } from "formik";
import { validateField, validateNumberField } from "helpers/validateField";
import KeyResult from "./components/KeyResult";
import ModalV2 from "components/commons/ModalV2";
import InputV2 from "components/inputs/InputV2";
import SelectInputV2 from "components/inputs/SelectInputV2";
import { Box, IconButton, LinearProgress, Slide, TextField, Typography } from "@mui/material";
import ConfirmDeleteModal from "components/commons/ProjectCard/components/confirmDeleteModal";
import ImgSelect from "./components/ImgSelect";
import { AddCircle, ArrowBack, Check } from "@mui/icons-material";
import { format, parseISO } from 'date-fns';
import { useState } from "react";
import React from "react";

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
  userPermission,
  openChild
}) => {
  const isParent = !!okrData?.childOkrs.length
  const [index, setIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState('left');
  const [showContent, setShowContent] = useState(true);
  const [currentKrType, setCurrentKrType] = useState('');
  const [disableAddKr, setDisableAddKr] = useState(true);

  const commonContent = <>
      <Field
        name="description"
        fieldLabel="Nombre"
        component={InputV2}
        validate={validateField}
      />
      <Field
        name="responsible"
        fieldLabel="Responsable"
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
    </>;

  const measurableContent = <>
    <Field
      name="baseline"
      fieldLabel="Línea Base"
      type="number"
      component={InputV2}
      validate={validateNumberField}
    />
    <Field
      name="goal"
      fieldLabel="Resultado esperado"
      type="number"
      component={InputV2}
      validate={validateNumberField}
    />
    <Field
      name="frequency"
      fieldLabel="Frecuencia de medición"
      component={SelectInputV2}
      options={filterFrequenciesByHorizon(okrData?.horizon)}
      validate={validateField}
    />
  </>

  const NotMeasurableContent = ({values}) => {
    const [inputValue, setInputValue] = useState('');

    const handleChange = (event) => {
      setInputValue(event.target.value);
    }

    const handleAddNewHito = () => {
      values.hitos 
        ? values.hitos.push(inputValue) 
        : values.hitos = [inputValue]; 

      setInputValue("");
      setDisableAddKr(false);
    }
    return (
      <NoMeasurableContainer>
        <Box sx={{display: 'flex'}}>
          <TextField 
            sx={{width:'100%', marginTop:'20px'}}
            variant="standard"
            placeholder="Agregar hito a cumplir"
            onChange={handleChange}
            value={inputValue}
            >
          </TextField>
          <IconButton size="small" disabled={!inputValue} onClick={handleAddNewHito} disableRipple>
            <Check sx={{fontSize: 40, color: !inputValue ? 'gray' : 'black', mt: "10px"}}/>
          </IconButton>
        </Box>
        <NoMeasurableList>
          {
          values.hitos && values.hitos.length && 
            values.hitos.map((hito) => (
              <NoMeasurableLine>{hito}</NoMeasurableLine>
            ))
          }
        </NoMeasurableList>
      </NoMeasurableContainer>
    )}

  const handleNext = (event) => {
    event.preventDefault();
    setSlideDirection('left');
    setShowContent(false);
    setTimeout(() => {
      setIndex((prevIndex) => (prevIndex + 1));
      setShowContent(true);
    }, 300);
  };

  const disableNextPage = (values) => {
    return !(values.description != "" &&  values.responsible != "")
  }

  const disableForNormalKr = ({baseline, goal, frequency}) => {
    return !(typeof baseline == "number" && typeof goal == "number" && frequency != "")
  }

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
    {isParent ? (
      <>
        <KeyResultsHeader>
          OKR hijos
        </KeyResultsHeader>
        <KeyResultsContainer>
          {okrData?.childOkrs.map((child, index) => (
            <KeyResult
              key={index}
              krData={child}
              handleKrClick={(child) => openChild(child._id)}
            />
          ))}
        </KeyResultsContainer>
      </>
    ) : (
      <>
        <KeyResultsHeader>
          Key Results
        </KeyResultsHeader>
        <KeyResultsContainer>
          <KeyResultsSubTitle>
            <p>Medibles</p>
            {userPermission === 'edit' && (
              <IconButton onClick={() => {openAddKrModal(); setCurrentKrType('normal')}}>
                <AddCircle htmlColor='black' />
              </IconButton>
            )}
          </KeyResultsSubTitle>
          {okrData?.keyResults.map((kr, index) => (
            <KeyResult
              key={index}
              krData={kr}
              openConfirmDeleteModal={openConfirmDeleteModal}
              handleKrClick={() => openKrEditModal({...kr, krType: 'normal'})}
              userPermission={userPermission}
            />
          ))}
        </KeyResultsContainer>

        <KeyResultsContainer>
          <KeyResultsSubTitle>
            <p>No medibles</p>
            {userPermission === 'edit' && (
              <IconButton onClick={() => {openAddKrModal(); setCurrentKrType('checklist')}}>
                <AddCircle htmlColor='black' />
              </IconButton>
            )}
          </KeyResultsSubTitle>
          {okrData?.checklistKeyResults.map((kr, index) => (
            <KeyResult
              key={index}
              krData={kr}
              openConfirmDeleteModal={openConfirmDeleteModal}
              handleKrClick={() => openKrEditModal({...kr, krType: 'checklist'})}
              userPermission={userPermission}
            />
          ))}
        </KeyResultsContainer>

      </>
    )}
    <ModalV2
      isOpen={isAddKrModalOpen}
      onClose={() => {closeAddKrModal(); setIndex(0)}}
      title='Agregar Key Result'
    >
      <Formik
        onSubmit={(values) => {
          setDisableAddKr(true);
          setIndex(0);
          addKr({...values, krType: currentKrType});
        }}
        
        initialValues={{ description: '', frequency: '', responsible: '', priority: 0}}
      >
        {({ values, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
              <Slide
                direction={slideDirection}
                in={showContent}
                timeout={300}
                mountOnEnter
                unmountOnExit
              >
                <Box sx={{minHeight: '200px'}}>
                  {index == 0 && (commonContent)}
                  {index != 0 && currentKrType == 'normal' && (measurableContent)}
                  {index != 0 && currentKrType != 'normal' && (<NotMeasurableContent values={values}></NotMeasurableContent>)}
                </Box>
              </Slide>
            <ButtonsContainer>
              <Button color="secondary" onClick={() => {setIndex(0); closeAddKrModal()}}>
                Cancelar
              </Button>
              {
                index == 0 ? 
                (<Button disabled={disableNextPage(values)} onClick={(event) => handleNext(event)}>
                  Siguiente
                </Button>) : (
                <Button type="submit" disabled={disableAddKr && disableForNormalKr(values)}>
                  Agregar
                </Button>
                )
              }
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

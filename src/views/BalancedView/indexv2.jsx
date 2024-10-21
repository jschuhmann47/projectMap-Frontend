import { AddCircle, ArrowBack } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import Button from "components/commons/Button";
import ModalV2 from "components/commons/ModalV2";
import InputV2 from "components/inputs/InputV2";
import SelectInputV2 from "components/inputs/SelectInputV2";
import { Field, Form, Formik } from "formik";
import { Area, filterFrequenciesByHorizon } from "helpers/enums/balanced";
import { validateField } from "helpers/validateField";
import { useState } from "react";
import { ButtonsContainer } from "styles/form";
import { KeyResultsContainer, KeyResultsHeader, OkrContainerV2, OkrHeader, OkrTitle } from "views/OKRView/styles";
import Objective from "./components/Objective";
import ConfirmDeleteModal from "components/commons/ProjectCard/components/confirmDeleteModal";
import ObjectiveModal from "./components/ObjectiveModal";

export default function BalancedView({
  objectives,
  onClickButtonGoBack,
  title,
  isAddObjModalOpen,
  openAddObjModal,
  closeAddObjModal,
  onSubmitObjective,
  horizon,
  openConfirmDeleteModal,
  closeConfirmDeleteModal,
  isConfirmDeleteModalOpen,
  submitConfirmDeleteModal,
  confirmDeleteModalError,
  onEditObjective,
  openObjEditModal,
  closeObjEditModal,
  isObjEditModalOpen,
  currentObj,
}) {
  const [selectedArea, setSelectedArea] = useState(null);

  function onClickAdd(area) {
    setSelectedArea(area)
    openAddObjModal()
  }

  function onCloseModal() {
    setSelectedArea(null)
    closeAddObjModal()
  }

  function renderArea(area) {
    return (
      <>
        <KeyResultsHeader>
          {area}
          <IconButton onClick={() => onClickAdd(area)}>
            <AddCircle htmlColor="black" />
          </IconButton>
        </KeyResultsHeader>
        <KeyResultsContainer>
          {objectives[area].map((obj, index) => (
            <Objective
              key={index}
              objData={obj}
              openConfirmDeleteModal={openConfirmDeleteModal}
              handleObjClick={openObjEditModal}
            />
          ))}
        </KeyResultsContainer>
      </>
    )
  }

  return (
    <OkrContainerV2>
      <OkrHeader>
        <IconButton size="small" onClick={onClickButtonGoBack} sx={{ position: 'absolute', left: 0 }}>
          <ArrowBack />
        </IconButton>
        <OkrTitle>{title}</OkrTitle>
      </OkrHeader>
      {Object.values(Area).map(renderArea)}
      <ModalV2 isOpen={isAddObjModalOpen} onClose={closeAddObjModal} title='Agregar objetivo'>
        <Formik
          onSubmit={(formData) => onSubmitObjective(selectedArea, formData)}
          initialValues={{ action: '', frequency: '', responsible: '', measure: '' }}
        >
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <Field
                name="action"
                fieldLabel="Nombre"
                component={InputV2}
                validate={validateField}
              />
              <Field
                name="frequency"
                fieldLabel="Frecuencia"
                component={SelectInputV2}
                options={filterFrequenciesByHorizon(horizon)}
                validate={validateField}
              />
              <Field
                name="responsible"
                fieldLabel="Responsable"
                component={InputV2}
                validate={validateField}
              />
              <Field
                name="baseline"
                fieldLabel="Línea base"
                type="number"
                component={InputV2}
                validate={validateField}
              />
              <Field
                name="goal"
                fieldLabel="Resultado esperado"
                type="number"
                component={InputV2}
                validate={validateField}
              />
              <Field
                name="measure"
                fieldLabel="Unidad de medida"
                component={InputV2}
                validate={validateField}
              />
              <ButtonsContainer>
                <Button color="secondary" onClick={closeAddObjModal}>
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
        titulo='Eliminar objetivo'
        descripcion='Para confirmar, escriba el nombre del objetivo'
        fieldLabel='Nombre del objetivo'
      />
      <ObjectiveModal
        isOpen={isObjEditModalOpen}
        onClose={closeObjEditModal}
        data={currentObj}
        onSubmit={onEditObjective}
      />
    </OkrContainerV2>
  )
}
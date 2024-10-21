import { useParams } from "react-router-dom";
import LayoutContainer from "./LayoutContainer";
import { useDispatch, useSelector } from "react-redux";
import {
  onGetAnsoff,
  onGetBalanced,
  onGetFoda,
  onGetMckinsey,
  onGetOKR,
  onGetOne,
  onGetPestel,
  onGetPorter,
  onGetQuestionnaire,
} from 'redux/actions/projects.actions';
import { Box, IconButton } from "@mui/material"
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Button from 'components/commons/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom"
import { selectorByStage } from "redux/selectors/project.selector";
import { StageToolView, StepCard, ToolCard, ToolCardContainer, ToolCardTitle, ToolsView } from "views/ProjectView/styles";
import { ArrowBack, HelpOutlined } from "@mui/icons-material";
import { getMenuItemsBy, STEPS } from "helpers/enums/steps";
import ConfirmDeleteModal from "components/commons/ProjectCard/components/confirmDeleteModal";
import { onDelete as onDeletePestel } from 'redux/actions/pestel.actions';
import { onDelete as onDeletePorter } from 'redux/actions/porter.actions';
import { onDelete as onDeleteFoda } from 'redux/actions/foda.actions';
import { onDelete as onDeleteAnsoff } from 'redux/actions/ansoff.actions';
import { onDelete as onDeleteMckinsey } from 'redux/actions/mckinsey.actions';
import { onDelete as onDeleteBalanceScorecard } from 'redux/actions/balanceScorecard.actions';
import { onDeleteTool as onDeleteOkr } from 'redux/actions/okr.actions';
import { onDelete } from 'redux/actions/questionnarie.actions';
import ModalV2 from "components/commons/ModalV2";
import { COLORS } from "helpers/enums/colors";
import { Field, Form, Formik, useFormikContext } from "formik";
import InputV2 from "components/inputs/InputV2";
import { validateField } from "helpers/validateField";
import SelectInputV2 from "components/inputs/SelectInputV2";
import DateInput from "components/inputs/DateInput";
import { ButtonsContainer } from "styles/form";
import StepInfoModal from "views/ProjectView/tabs/stepInfoModal";

const isValidStage = (name) => [
  'externalEnvironment',
  'internalSituation',
  'strategicGuidelines',
  'competitiveStrategy',
  'transformationPlans',
  'financialPlanning'
].includes(name);

const NO_AREA = 'Sin área'
const NO_PARENT = 'Sin padre'

function Card({ onClick, step, item, showDeleteIcon, handleOnDelete }) {
  return <ToolCard onClick={() => onClick(item.redirectUrl)} style={{ cursor: 'pointer', backgroundColor: step?.color }}>
      <p>{item?.titulo  || item?.description}</p>

      {showDeleteIcon &&
        <IconButton
          sx={{
            display: 'flex',
            width: '10px',
            height: '10px',
            alignItems: 'right',
          }}
          onClick={(e) => { handleOnDelete(item); e.stopPropagation() }}
        >
          <DeleteIcon />
        </IconButton>
      }
    </ToolCard>
}

function ToolColumn({ onHandleClick, tool, step, showDeleteIcon, handleOnDelete, handleOnAdd }) {
  return (
    <>
      <Box sx={{  }}>
        <ToolCardTitle>
          <p>{tool?.title}</p>
          <IconButton
            sx={{
              display: 'flex',
              width: '10px',
              height: '10px',
              alignItems: 'right',
            }}
            onClick={() => handleOnAdd(tool.toolName)}
          >
            <AddCircleIcon />
          </IconButton>
        </ToolCardTitle>
        <ToolCardContainer>
          {
            tool?.items?.map(item =>
              <Card onClick={onHandleClick} step={step} item={item} showDeleteIcon={showDeleteIcon} handleOnDelete={handleOnDelete}></Card>
          )}
        </ToolCardContainer>
      </Box>
    </>
  )
}

const StageContainer = () => {
  const dispatch = useDispatch();
  const { id: projectId, stageName } = useParams();
  const navigate = useNavigate();
  const [step, setStep] = useState(null);
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] =
    useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [confirmDeleteError, setConfirmDeleteError] = useState(null);
  const [addTool, setAddTool] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toolItems = useSelector(selectorByStage[stageName]);
  const allOkrs = useSelector((state) => state.projects.okrs);
  const user = useSelector((state) => state.user.data);
  
  const projectInfo = useSelector((state) => state.projects.data);
  const { organizationalChart } = useSelector((state) => state.projects);

  const userIsCoordinator = user?.isAdmin ||
    projectInfo?.coordinators.find((u) => u.email === user?.email);

  const userCanEdit = () => {
    const userStages = projectInfo?.participants?.find((u) => u.user.email === user?.email)?.stages;
    const currentStage = userStages?.find(stage => stage.id == stageName);
    return currentStage?.permission == 'edit'
  };

  const onHandleCardClick = (url) => {
    navigate(`/projects/${projectId}/${url}`)
  };

  const getToolsFor = {
    'externalEnvironment': () => { dispatch(onGetPestel(projectId)); dispatch(onGetPorter(projectId)) },
    'internalSituation': () => { dispatch(onGetFoda(projectId)) },
    'strategicGuidelines': () => { dispatch(onGetAnsoff(projectId)) },
    'competitiveStrategy': () => { dispatch(onGetMckinsey(projectId)) },
    'transformationPlans': () => { dispatch(onGetQuestionnaire(projectId)) },
    'financialPlanning': () => { dispatch(onGetBalanced(projectId)); dispatch(onGetOKR(projectId)) }
  }

  const deleteTool = (item) => {
    const tool = item.redirectUrl.split('/')[0];
    const id = item._id;
    const deleteTool = {
      pestel: () => {
        dispatch(onDeletePestel(id));
      },
      porter: () => {
        dispatch(onDeletePorter(id));
      },
      foda: () => {
        dispatch(onDeleteFoda(id));
      },
      ansoff: () => {
        dispatch(onDeleteAnsoff(id));
      },
      mckinsey: () => {
        dispatch(onDeleteMckinsey(id));
      },
      balanceScorecard: () => {
        dispatch(onDeleteBalanceScorecard(id));
      },
      okr: () => {
        dispatch(onDeleteOkr(id));
      },
      questionnaire: () => {
        dispatch(onDelete(id));
      },
    };
    deleteTool[tool]();
  };

  useEffect(() => {
    if (isValidStage(stageName)) {
      getToolsFor[stageName]();
      dispatch(onGetOne(projectId));
    } else {
      navigate(`/dashboard`)
    }

    if (stageName) {
      const step = STEPS.find(({ id }) => id == stageName);
      if (step) {
        setStep(step)
      }
    }
  }, [projectId, stageName]);

  const openConfirmDeleteModal = (item) => {
    setIsConfirmDeleteModalOpen(true);
    setItemToDelete(item);
  };

  const closeConfirmDeleteModal = () => {
    setIsConfirmDeleteModalOpen(false);
    setConfirmDeleteError(null);
    setItemToDelete(null);
  };

  const onSubmitConfirmModal = ({ name }) => {
    if (
      name !== itemToDelete?.titulo &&
      name !== itemToDelete?.description
    ) {
      setConfirmDeleteError('Nombre de la herramienta incorrecto.');
    } else {
      deleteTool(itemToDelete);
      closeConfirmDeleteModal();
    }
  };

  const handleAddTool = (toolName) => {
    const toolsAddOptions = getMenuItemsBy(stageName, toolName);
    setAddTool(toolsAddOptions)
  }

  const onSubmitTool = (action, formData) => {
    formData.projectId = projectId;
    if (formData.area !== NO_AREA) {
      formData.areaId = organizationalChart?.data.nodes?.find((node) =>
        node.data.label === formData.area
      ).id
    } else {
      formData.areaId = ''
    }

    if (formData.parent !== NO_PARENT) {
      formData.parentId = allOkrs.find((okr) =>
        okr.description === formData.parent
      )._id
    } else {
      formData.parentId = undefined
    }

    dispatch(action(formData));
    setAddTool(null);
  };

  const areaOptions = [NO_AREA].concat(organizationalChart?.data.nodes?.map((node) => node.data.label))

  const onClickBack = () => navigate(`/projects/${projectId}`)
  return (
    <LayoutContainer>
      {step &&
        <>
          <StageToolView>
            <StepCard style={{ backgroundColor: step?.color }}>
              <IconButton size="small" onClick={onClickBack} sx={{ position: 'absolute', left: 50 }}>
                <ArrowBack />
              </IconButton>
              {step?.title}
              <IconButton>
                <HelpOutlined onClick={() => { setIsModalOpen(true)}} />
              </IconButton>
            </StepCard>
            {toolItems && toolItems.length &&
              <>
                <ToolsView columns={toolItems.length}>
                  {toolItems.map((item) =>
                    <ToolColumn onHandleClick={onHandleCardClick} tool={item} step={step} showDeleteIcon={userIsCoordinator || userCanEdit()} handleOnAdd={handleAddTool} handleOnDelete={openConfirmDeleteModal}>
                    </ToolColumn>
                  )}
                </ToolsView>
              </>
            }
          </StageToolView>
        </>
      }
      <ConfirmDeleteModal
        isOpen={isConfirmDeleteModalOpen}
        onClose={closeConfirmDeleteModal}
        onSubmit={onSubmitConfirmModal}
        errors={confirmDeleteError}
        titulo="Eliminar herramienta"
        descripcion="Para confirmar la eliminación, escriba el nombre de la herramienta."
        fieldLabel="Nombre de la herramienta"
      />
      <ModalV2
        isOpen={!!addTool}
        backgroundColor={COLORS.WildSand}
        onClose={() => setAddTool(null)}
        title={addTool?.titulo}
      >
        <Formik
          onSubmit={(values) => onSubmitTool(addTool.action, values)}
          initialValues={{ titulo: '', area: 'Sin área' }}
        >
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <Field
                name="titulo"
                fieldLabel="Título"
                component={InputV2}
                validate={validateField}
              />
              {addTool?.area &&
                <Field
                  name="area"
                  fieldLabel="Área"
                  component={SelectInputV2}
                  options={areaOptions}
                  validate={validateField}
                />
              }
              {addTool?.horizon &&
                <Field
                  name="horizon"
                  fieldLabel="Horizonte"
                  component={SelectInputV2}
                  options={Object.values(addTool?.horizon)}
                  validate={validateField}
                />
              }
              {addTool?.requireStartDate &&
                <Field
                  name="startingDate"
                  fieldLabel="Fecha de inicio"
                  component={DateInput}
                  validate={validateField}
                />
              }
              {addTool?.parent &&
                <Field
                  name="parent"
                  fieldLabel="OKR padre"
                  component={ParentInput}
                  allOkrs={allOkrs}
                  organizationalChart={organizationalChart?.data}
                  validate={validateField}
                />
              }
              <ButtonsContainer>
                <Button color="secondary" onClick={() => setAddTool(null)}>
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
      <StepInfoModal
        isOpen={isModalOpen}
        selectedStep={step}
        onClose={() => setIsModalOpen(false)}
      />
    </LayoutContainer>
  );
};

export default StageContainer;

function ParentInput(props) {
  const { allOkrs, organizationalChart } = props
  const { values } = useFormikContext()

  const extraOptions = useMemo(() => {
    const canHaveParent = values.area !== NO_AREA
    if (!canHaveParent) return []
    const node = organizationalChart.nodes.find((n) => n.data.label === values.area)
    const parentEdge = organizationalChart.edges.find((e) => e.target === node.id)
    if (!parentEdge) return []
    const parentNode = organizationalChart.nodes.find((n) => n.id === parentEdge.source)
    return allOkrs
      .filter((okr) => okr.area === parentNode.data.label && okr.keyResults.length === 0)
      .map((okr) => okr.description)
  }, [values.area])

  return (
    <SelectInputV2
      options={[NO_PARENT, ...extraOptions]}
      {...props}
    />
  )
}
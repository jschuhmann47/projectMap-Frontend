// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { ButtonBase, IconButton, Menu, MenuItem, Popover } from '@mui/material';
import { Formik, Field, ErrorMessage, Form } from 'formik';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import { PopupModal } from 'react-calendly';
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
  onGetSharedUsers,
  onSearchByEmail,
  onShareUser,
  onUnShareUsers,
  openModal,
  closeModal,
  onAddUser,
  changeMemberPermission,
  changeMemberRole,
  onSaveMembers,
  goBackModal
} from 'redux/actions/projects.actions';
import { STEPS } from 'helpers/enums/steps';
import { COLORS } from 'helpers/enums/colors';

import Modal from 'components/commons/Modal';
import Button from 'components/commons/Button';
import InputV2 from 'components/inputs/InputV2';
import {
  CustomForm,
  ButtonsContainer,
  Title,
  FormContainer,
} from 'styles/form';

import LayoutContainer from 'containers/LayoutContainer';
import ProjectView from 'views/ProjectView/indexv2';
import { MenuItemText } from 'views/ProjectView/styles';
import {
  stepToolsSelector,
  progressSelector,
  getConsultantSelector,
  getLoadingSelector,
} from 'redux/selectors/project.selector';
import { validateField } from 'helpers/validateField';
import DeleteIcon from '@mui/icons-material/Delete';
import { onDelete as onDeletePestel } from 'redux/actions/pestel.actions';
import { onDelete as onDeletePorter } from 'redux/actions/porter.actions';
import { onDelete as onDeleteFoda } from 'redux/actions/foda.actions';
import { onDelete as onDeleteAnsoff } from 'redux/actions/ansoff.actions';
import { onDelete as onDeleteMckinsey } from 'redux/actions/mckinsey.actions';
import { onDelete as onDeleteBalanceScorecard } from 'redux/actions/balanceScorecard.actions';
import { onDeleteTool as onDeleteOkr } from 'redux/actions/okr.actions';
import { getMenuItems } from 'helpers/enums/steps';
import Comments from 'components/comments/Comments';
import ShareModal from 'views/ProjectView/components/shareModal';
import UnShareModal from 'views/ProjectView/components/unShareModal';
import ConfirmDeleteModal from 'components/commons/ProjectCard/components/confirmDeleteModal';
import Loading from 'components/commons/Loading';
import { onGetAll as onGetAllComments } from 'redux/actions/comments.actions';
import { onDelete } from 'redux/actions/questionnarie.actions';
import { CardTitle } from 'views/FodaView/styles';
import { horizonOptions } from 'helpers/enums/okr';
import ModalV2 from 'components/commons/ModalV2';
import SelectInputV2 from 'components/inputs/SelectInputV2';
import DateInput from 'components/inputs/DateInput';
import { onGetOrganizationalChart } from 'redux/actions/projects.actions';

const NO_AREA = 'Sin área'

const ProjectContainer = () => {
  let { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorElement, setAnchorElement] = useState(null);
  const [openComments, setOpencomments] = useState(null);
  const [anchorElementAdd, setAnchorElementAdd] = useState(null);
  const [stepValue, setStepValue] = useState(0);
  const [addTool, setAddTool] = useState(null);
  const [isCalendlyOpen, setCalendlyOpen] = useState(false);

  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isUnShareModalOpen, setIsUnShareModalOpen] = useState(false);
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] =
    useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [confirmDeleteError, setConfirmDeleteError] = useState(null);
  // const menuItems = getMenuItems(stepValue);
  const toolsItems = useSelector(stepToolsSelector);
  const toolsAddOptions = getMenuItems(stepValue);
  const stepsColors = useSelector(progressSelector);
  const consultant = useSelector(getConsultantSelector);

  const projectInfo = useSelector((state) => state.projects.data);
  const sharedUsers = useSelector((state) => state.projects.sharedUsers);
  const members = useSelector((state) => state.projects.members);
  const addUserModalInfo = useSelector((state) => state.projects.addUserModal);
  const errorShared = useSelector(
    (state) => state.projects.errorShared?.response?.data?.message
  );
  const sharedUsersSuccess = useSelector(
    (state) => state.projects.sharedUsersSuccess
  );
  const user = useSelector((state) => state.user.data);
  const loading = useSelector(getLoadingSelector);
  const { organizationalChart } = useSelector((state) => state.projects);

  const onClickButtonGoBack = () => {
    if (user?.role && user?.role === 'AdminConsultant')
      navigate(`/consultoria`);
    else navigate(`/dashborard`);
  };

  const openShareModal = () => {
    setIsShareModalOpen(true);
  };

  const closeShareModal = () => {
    setIsShareModalOpen(false);
  };

  const openUnShareModal = () => {
    setIsUnShareModalOpen(true);
  };

  const closeUnShareModal = () => {
    setIsUnShareModalOpen(false);
  };

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

  const shareModalOnSubmit = (formData) => {
    dispatch(onShareUser(id, formData));
  };

  const unShareModalOnSubmit = (formDataDirty) => {
    const formData = {
      emails: formDataDirty.projects
        .filter((x) => x.checked)
        .map((x) => x.titulo),
    };
    dispatch(onUnShareUsers(id, formData));
    closeUnShareModal();
  };

  useEffect(() => {
    dispatch(onGetOne(id));
    dispatch(onGetFoda(id));
    dispatch(onGetPestel(id));
    dispatch(onGetPorter(id));
    dispatch(onGetAnsoff(id));
    dispatch(onGetMckinsey(id));
    dispatch(onGetOKR(id));
    dispatch(onGetBalanced(id));
    dispatch(onGetQuestionnaire(id));
    dispatch(onGetSharedUsers(id));
    dispatch(onGetAllComments('HUB', id));
    dispatch(onGetOrganizationalChart(id));
  }, []);

  useEffect(() => {
    if (sharedUsersSuccess) closeShareModal();
  }, [sharedUsersSuccess]);

  const onClickAdd = (value, anchorElement) => {
    setStepValue(value);
    setAnchorElementAdd(anchorElement);
  };

  const onClickList = (value, anchorElement) => {
    setStepValue(value);
    setAnchorElement(anchorElement);
  };

  const onSubmitTool = (action, formData) => {
    formData.projectId = id;
    if (formData.area !== NO_AREA) {
      formData.areaId = organizationalChart?.data.nodes?.find((node) =>
        node.data.label === formData.area
      ).id
    } else {
      formData.areaId = ''
    }
    dispatch(action(formData));
    navigate('createTool');
  };

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

  const onCLickMejoraContinua = () => navigate('mejora-continua');

  const items = STEPS?.map((step, index) => ({
    ...step,
    onClickAdd,
    onClickList,
  }));

  function onSearchUserByEmail(email) {
    dispatch(onSearchByEmail(email));
  };

  function onGoBackModal() {
    dispatch(goBackModal());
  }

  function onOpenModal() {
    dispatch(openModal());
  };

  function onCloseModal() {
    dispatch(closeModal());
  };

  function onAddUserToProject(email, role) {
    dispatch(onAddUser(id, { userEmail: email, role }));
  };

  function onChangeMemberRole(userId, newRole) {
    dispatch(changeMemberRole(userId, newRole));
  };

  function onChangeMemberPermission(userId, stepId, newPermission) {
    dispatch(changeMemberPermission(userId, stepId, newPermission));
  };

  function onSaveChanges(usersToDelete) {
    const remainingMembers = members.filter(member => !usersToDelete.has(member.user._id));
    const users = remainingMembers.map((m) => ({
      userId: m.user._id,
      role: m.role,
      stages: m.role === 'participant' ? m.stages : undefined,
    }));
    dispatch(onSaveMembers(id, { users }))
  }

  const hasFullPermissions =
    user?.isAdmin ||
    projectInfo?.coordinators.find((u) => u.email === user?.email)

  const stepPermissions = projectInfo?.participants
    .find((u) => u.user.email === user?.email)?.stages

  const areaOptions = [NO_AREA].concat(organizationalChart?.data.nodes?.map((node) => node.data.label))

  return (
    <LayoutContainer>
      <ProjectView
        items={items}
        title={projectInfo?.name}
        project={projectInfo}
        members={members}
        addUserModalInfo={addUserModalInfo}
        onSearchUserByEmail={onSearchUserByEmail}
        onAddUserToProject={onAddUserToProject}
        onOpenModal={onOpenModal}
        onCloseModal={onCloseModal}
        onGoBackModal={onGoBackModal}
        onChangeMemberRole={onChangeMemberRole}
        onChangeMemberPermission={onChangeMemberPermission}
        onSaveChanges={onSaveChanges}
        hasFullPermissions={hasFullPermissions}
        stepPermissions={stepPermissions}
      />
      <Menu
        anchorEl={openComments}
        onClose={() => setOpencomments(null)}
        open={!!openComments}
        PaperProps={{
          style: {
            width: 500,
          },
        }}
        sx={{
          '& .MuiMenu-list': {
            background: COLORS.AthensGray,
          },
        }}
      >
        <MenuItem
          key={1}
          disableRipple
          sx={{ ':hover': { background: COLORS.AthensGray } }}
        >
          <Comments show tool="HUB" toolId={id} projectId={id} />
        </MenuItem>
      </Menu>
      <Menu
        anchorEl={anchorElement}
        onClose={() => setAnchorElement(null)}
        open={!!anchorElement}
      >
        {toolsItems[stepValue]?.map((item) => (
          <MenuItem key={item?.key}>
            <Box
              display="flex"
              sx={{
                width: '100%',
                justifyContent: 'space-between',
                gap: '10px',
              }}
            >
              <MenuItemText
                sx={{ width: '80%' }}
                onClick={() => {
                  if (item._id) {
                    navigate(item.redirectUrl);
                  } else {
                    setAddTool(item);
                    setAnchorElement(null);
                  }
                }}
              >
                {item?.titulo ?? item?.description}
              </MenuItemText>
              {item._id && (hasFullPermissions || stepPermissions?.[stepValue-1]?.permission === 'edit') && !Number.isInteger(item._id) && (
                <IconButton
                  sx={{
                    display: 'flex',
                    width: '10px',
                    height: '10px',
                    alignItems: 'right',
                  }}
                  onClick={() => openConfirmDeleteModal(item)}
                >
                  <DeleteIcon />
                </IconButton>
              )}
            </Box>
          </MenuItem>
        ))}
      </Menu>
      <Menu
        anchorEl={anchorElementAdd}
        onClose={() => setAnchorElementAdd(null)}
        open={!!anchorElementAdd}
      >
        {toolsAddOptions?.map((item) => (
          <MenuItem key={item?.key}>
            <Box
              display="flex"
              sx={{ width: '100%', justifyContent: 'space-between' }}
            >
              <MenuItemText
                sx={{ width: '80%' }}
                onClick={() => {
                  setAddTool(item);
                  setAnchorElementAdd(null);
                }}
              >
                {item?.titulo}
              </MenuItemText>
              {item._id && (
                <IconButton
                  sx={{
                    display: 'flex',
                    width: '10px',
                    height: '10px',
                    alignItems: 'right',
                  }}
                  onClick={() => deleteTool(item)}
                >
                  <DeleteIcon />
                </IconButton>
              )}
            </Box>
          </MenuItem>
        ))}
      </Menu>
      <ModalV2
        isOpen={!!addTool}
        backgroundColor={COLORS.WildSand}
        onClose={() => setAddTool(null)}
        title={addTool?.titulo}
      >
        <Formik
          onSubmit={(values) => onSubmitTool(addTool.action, values)}
          initialValues={{ titulo: '', area: NO_AREA }}
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
      {!!consultant?.calendlyUser && (
        <ButtonBase
          sx={{
            position: 'fixed',
            bottom: '20px',
            left: '20px',
            color: '#ffffff',
            backgroundColor: '#00A4E8',
            padding: '15px',
            fontSize: '16px',
            borderRadius: 30,
            fontWeight: '800',
          }}
          onClick={() => setCalendlyOpen(true)}
        >
          Agende con un consultor
        </ButtonBase>
      )}
      <PopupModal
        url={consultant?.calendlyUser}
        onModalClose={() => setCalendlyOpen(false)}
        open={isCalendlyOpen}
        /*
         * react-calendly uses React's Portal feature (https://reactjs.org/docs/portals.html) to render the popup modal. As a result, you'll need to
         * specify the rootElement property to ensure that the modal is inserted into the correct domNode.
         */
        rootElement={document.getElementById('root')}
      />
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={closeShareModal}
        onSubmit={shareModalOnSubmit}
        errorShared={errorShared}
      />
      <UnShareModal
        isOpen={isUnShareModalOpen}
        onClose={closeUnShareModal}
        onSubmit={unShareModalOnSubmit}
        sharedUsers={sharedUsers.map((user) => ({
          id: user._id,
          titulo: user.email,
          checked: false,
        }))}
      />
      <ConfirmDeleteModal
        isOpen={isConfirmDeleteModalOpen}
        onClose={closeConfirmDeleteModal}
        onSubmit={onSubmitConfirmModal}
        errors={confirmDeleteError}
        titulo="Eliminar herramienta"
        descripcion="Para confirmar la eliminación, escriba el nombre de la herramienta."
        fieldLabel="Nombre de la herramienta"
      />
      {loading && <Loading isModalMode message="Cargando proyecto" />}
    </LayoutContainer>
  );
};

export default ProjectContainer;

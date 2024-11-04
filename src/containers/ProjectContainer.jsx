// @ts-nocheck
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { ButtonBase, IconButton, Menu, MenuItem, Popover } from '@mui/material';
import { Formik, Field, ErrorMessage, Form, useFormikContext } from 'formik';
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
  onSearchByEmail,
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
import { getMenuItems } from 'helpers/enums/steps';
import Comments from 'components/comments/Comments';
import Loading from 'components/commons/Loading';
import { onGetAll as onGetAllComments } from 'redux/actions/comments.actions';
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

  const [rolesTabChanged, setRolesTabChanged] = useState(false);

  const toolsItems = useSelector(stepToolsSelector);
  const toolsAddOptions = getMenuItems(stepValue);
  const stepsColors = useSelector(progressSelector);
  const consultant = useSelector(getConsultantSelector);

  const projectInfo = useSelector((state) => state.projects.data);
  const members = useSelector((state) => state.projects.members);
  const addUserModalInfo = useSelector((state) => state.projects.addUserModal);
  const user = useSelector((state) => state.user.data);
  const loading = useSelector(getLoadingSelector);
  const { organizationalChart } = useSelector((state) => state.projects);
  const allOkrs = useSelector((state) => state.projects.okrs);

  const onClickButtonGoBack = () => {
    if (user?.role && user?.role === 'AdminConsultant')
      navigate(`/consultoria`);
    else navigate(`/dashborard`);
  };

  useEffect(() => {
    dispatch(onGetOne(id));
    dispatch(onGetOrganizationalChart(id));
  }, []);

  const onClickAdd = (value, anchorElement) => {
    setStepValue(value);
    setAnchorElementAdd(anchorElement);
  };

  const onClickList = (value, anchorElement) => {
    setStepValue(value);
    setAnchorElement(anchorElement);
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
    setRolesTabChanged(true);
  };

  function onChangeMemberPermission(userId, stepId, newPermission) {
    dispatch(changeMemberPermission(userId, stepId, newPermission));
    setRolesTabChanged(true);
  };

  function onSaveChanges(usersToDelete) {
    const remainingMembers = members.filter(member => !usersToDelete.has(member.user._id));
    const users = remainingMembers.map((m) => ({
      userId: m.user._id,
      role: m.role,
      stages: m.role === 'participant' ? m.stages : undefined,
    }));
    dispatch(onSaveMembers(id, { users }))
    setRolesTabChanged(false);
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
        description={projectInfo?.description}
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
        rolesTabChanged={rolesTabChanged}
      />
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
      {loading && <Loading isModalMode message="Cargando proyecto" />}
    </LayoutContainer>
  );
};

export default ProjectContainer;
import * as constants from 'redux/contansts/projects.constants';

export const onCreate = (formData) => ({
  type: constants.PROJECTS_ON_CREATE_REQUESTED,
  formData,
});

export const onDelete = (id) => ({
  type: constants.PROJECTS_ON_DELETE_REQUESTED,
  id,
});

export const onGetAll = () => ({
  type: constants.PROJECTS_ON_GET_ALL_REQUESTED,
});

export const onSearch = (text) => ({
  type: constants.PROJECTS_ON_SEARCH_REQUESTED,
  text
})

export const onGetOne = (id) => ({
  type: constants.PROJECTS_ON_GET_ONE_REQUESTED,
  id,
});

export const onGetFoda = (id) => ({
  type: constants.PROJECTS_ON_GET_FODA_REQUESTED,
  id,
});

export const onGetPestel = (id) => ({
  type: constants.PROJECTS_ON_GET_PESTEL_REQUESTED,
  id,
});

export const onGetPorter = (id) => ({
  type: constants.PROJECTS_ON_GET_PORTER_REQUESTED,
  id,
});

export const onGetOKR = (id) => ({
  type: constants.PROJECTS_ON_GET_OKR_REQUESTED,
  id,
});

export const onGetMckinsey = (id) => ({
  type: constants.PROJECTS_ON_GET_MCKINSEY_REQUESTED,
  id,
});

export const onGetAnsoff = (id) => ({
  type: constants.PROJECTS_ON_GET_ANSOFF_REQUESTED,
  id,
});

export const onGetBalanced = (id) => ({
  type: constants.PROJECTS_ON_GET_BALANCED_SCORECARD_REQUESTED,
  id,
});

export const onGetQuestionnaire = (id) => ({
  type: constants.PROJECTS_ON_GET_QUESTIONNAIRE_REQUESTED,
  id,
});

export const onGetSharedUsers = (id) => ({
  type: constants.PROJECTS_SHARED_USERS_REQUESTED,
  id,
});

export const onGetOrganizationalChart = (id) => ({
  type: constants.PROJECTS_ON_GET_ORGANIZATIONAL_CHART_REQUESTED,
  id
});

export const onSaveOrganizationalChart = (id, chart) => ({
  type: constants.PROJECTS_ON_SAVE_ORGANIZATIONAL_CHART_REQUESTED,
  id,
  chart
});

export const onShareUser = (id, formData) => ({
  type: constants.PROJECTS_SHARE_USER_REQUESTED,
  id,
  formData,
});

export const onUnShareUsers = (id, formData) => ({
  type: constants.PROJECTS_UNSHARE_USER_REQUESTED,
  id,
  formData,
});

export const onSearchByEmail = (email) => ({
  type: constants.PROJECTS_SEARCH_BY_EMAIL_REQUESTED,
  email,
});

export const openModal = () => ({
  type: constants.PROJECTS_OPEN_ADD_USER_MODAL,
});

export const closeModal = () => ({
  type: constants.PROJECTS_CLOSE_ADD_USER_MODAL,
});

export const goBackModal = () => ({
  type: constants.PROJECTS_GO_BACK_ADD_USER_MODAL,
});

export const onAddUser = (id, formData) => ({
  type: constants.PROJECTS_ADD_USER_REQUESTED,
  id,
  formData,
});

export const changeMemberRole = (userId, newRole) => ({
  type: constants.PROJECTS_CHANGE_MEMBER_ROLE,
  data: {
    userId,
    newRole
  }
});

export const changeMemberPermission = (userId, stepId, newPermission) => ({
  type: constants.PROJECTS_CHANGE_MEMBER_PERMISSION,
  data: {
    userId,
    stepId,
    newPermission
  }
});

export const onSaveMembers = (id, formData) => ({
  type: constants.PROJECTS_SAVE_MEMBERS_REQUESTED,
  id,
  formData
});
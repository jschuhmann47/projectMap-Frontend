import * as constants from 'redux/contansts/okr.constants';

export const onCreateTool = (formData) => ({
  type: constants.CREATE_OKR_TOOL_REQUESTED,
  formData,
});

export const onGetOneTool = (id) => ({
  type: constants.GET_OKR_TOOL_REQUESTED,
  id,
});

export const onEditTool = (id, formData) => ({
  type: constants.EDIT_OKR_TOOL_REQUESTED,
  id,
  formData,
});

export const onDeleteTool = (id) => ({
  type: constants.DELETE_OKR_TOOL_REQUEST,
  id,
});

export const onAddKeyResult = (id, formData) => ({
  type: constants.ADD_OKR_KEY_RESULT_REQUESTED,
  id,
  formData,
});

export const onEditKeyResult = (id, keyResultId, formData) => ({
  type: constants.EDIT_KEY_RESULT_REQUESTED,
  id,
  keyResultId,
  formData,
});

export const onDeleteKeyResult = (id, keyResultId) => ({
  type: constants.DELETE_KEY_RESULT_REQUESTED,
  id,
  keyResultId,
});

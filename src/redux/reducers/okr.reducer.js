import * as constants from 'redux/contansts/okr.constants';
import * as projectConstants from 'redux/contansts/projects.constants';

export const defaultState = {
  data: null,
  loading: false,
  items: null,
};

const okrReducer = (state = defaultState, action) => {
  const { data, error, type } = action;
  switch (type) {
    case constants.CREATE_OKR_TOOL_REQUESTED:
    case constants.ADD_OKR_KEY_RESULT_REQUESTED:
    case constants.GET_OKR_TOOL_REQUESTED:
    case constants.EDIT_OKR_TOOL_REQUESTED:
      return {
        ...state,
        loading: true,
      };
    case constants.CREATE_OKR_TOOL_SUCCEEDED:
    case constants.ADD_OKR_KEY_RESULT_SUCCEEDED:
    case constants.GET_OKR_TOOL_SUCCEEDED:
    case constants.EDIT_KEY_RESULT_SUCCEEDED:
    case constants.EDIT_OKR_TOOL_SUCCEEDED:
      return {
        ...state,
        data: { ...state.data, ...data },
        loading: false,
      };
    case constants.DELETE_KEY_RESULT_SUCCEEDED:
      return {
        ...state,
        data,
      };
    case constants.ADD_OKR_KEY_RESULT_FAILED:
    case constants.CREATE_OKR_TOOL_FAILED:
    case constants.EDIT_KEY_RESULT_FAILED:
    case constants.EDIT_OKR_TOOL_FAILED:
      return {
        ...state,
        loading: false,
      };
    case projectConstants.PROJECTS_ON_GET_ONE_REQUESTED:
      return defaultState;
    default:
      return error?.response?.status === 401 ? defaultState : state;
  }
};

export default okrReducer;

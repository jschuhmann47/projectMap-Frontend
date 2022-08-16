import * as constants from 'redux/contansts/projects.constants';

export const defaultState = {
  items: [],
  loading: false,
};

const projectsReducer = (state = defaultState, action) => {
  const { data, error, type } = action;
  switch (type) {
    case constants.PROJECTS_ON_CREATE_REQUESTED:
      return {
        ...state,
        loading: true,
      };
    case constants.PROJECTS_ON_CREATE_SUCCEEDED:
      return {
        ...state,
        items: state.items.concat(data),
        loading: false,
      };
    case constants.PROJECTS_ON_GET_ALL_SUCCEEDED:
      return {
        ...state,
        items: data,
        loading: false,
      };
    case constants.PROJECTS_ON_CREATE_FAILED:
      return defaultState;
    default:
      return error?.response?.status === 401 ? defaultState : state;
  }
};

export default projectsReducer;
import * as constants from 'redux/contansts/pdca.constants';
import * as projectConstants from 'redux/contansts/projects.constants';

const defaultState = {
  data: {
    id: "",
    projectId: "",
    name: "",
    actions: [],
    progress: 0,
  },
  loading: false,
}

export default function pdcaReducer(state = defaultState, action) {
  const { data, error, type } = action;
  switch (type) {
    case constants.GET_PDCA_REQUESTED:
    case constants.PATCH_PDCA_REQUESTED:
      return { ...state, loading: true };
    case constants.GET_PDCA_SUCCEEDED:
    case constants.PATCH_PDCA_SUCCEEDED:
      return { data, loading: false };
    case constants.GET_PDCA_FAILED:
    case constants.PATCH_PDCA_FAILED:
      return { ...state, loading: false };
    case projectConstants.PROJECTS_ON_GET_ONE_REQUESTED:
      return defaultState;
    default:
      return error?.response?.status === 401 ? defaultState : state;
  }
}

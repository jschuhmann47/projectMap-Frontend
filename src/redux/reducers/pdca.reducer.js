import { DEMING_STAGE_ACT, DEMING_STAGE_DO, DEMING_STAGE_PLAN, DEMING_STAGE_CHECK } from 'helpers/enums/pdca';
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
  demingStage: DEMING_STAGE_PLAN,
}

export default function pdcaReducer(state = defaultState, action) {
  const { data, error, type } = action;
  switch (type) {
    case constants.GET_PDCA_REQUESTED:
    case constants.PATCH_PDCA_REQUESTED:
      return { ...state, loading: true };
    case constants.GET_PDCA_SUCCEEDED:
      return { data, loading: false, demingStage: determineInitialDemingStage(data) };
    case constants.PATCH_PDCA_SUCCEEDED:
      return { ...state, data, loading: false };
    case constants.GET_PDCA_FAILED:
    case constants.PATCH_PDCA_FAILED:
      return { ...state, loading: false };
    case constants.CHANGE_DEMING_STAGE:
      return { ...state, demingStage: data.newStage };
    case projectConstants.PROJECTS_ON_GET_ONE_REQUESTED:
      return defaultState;
    default:
      return error?.response?.status === 401 ? defaultState : state;
  }
}

function determineInitialDemingStage(pdca) {
  if (pdca.actions.length === 0) {
    return DEMING_STAGE_PLAN
  }
  if (pdca.actions.every((a) => a.responsible && a.progress && a.deadline)) {
    return DEMING_STAGE_ACT
  }
  if (pdca.actions.every((a) => a.responsible && a.deadline)) {
    return DEMING_STAGE_CHECK
  }
  return DEMING_STAGE_DO
}

import { DemingStage } from 'helpers/enums/pdca';
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
  demingStage: DemingStage.Planificar,
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
    return DemingStage.Planificar
  }
  if (pdca.actions.every((a) => a.responsible && a.progress && a.deadline)) {
    return DemingStage.Actuar
  }
  if (pdca.actions.every((a) => a.responsible && a.deadline)) {
    return DemingStage.Verificar
  }
  return DemingStage.Hacer
}

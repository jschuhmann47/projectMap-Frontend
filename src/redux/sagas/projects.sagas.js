import { containerClasses } from '@mui/material';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { onSaveOrganizationalChart } from 'redux/actions/projects.actions';

import * as constantesConsultora from 'redux/contansts/consultora.constants';
import * as constants from 'redux/contansts/projects.constants';
import { addProject } from 'services/consultora.services';
import {
  getAll,
  getAnsoffs,
  getFodas,
  getMckinsey,
  getOkrs,
  getOne,
  getPestels,
  getPorters,
  getBalancedScorecard,
  getQuestionnaires,
  save,
  deleteProject,
  getSharedUsers,
  shareUser,
  unShareUsers,
  addUser,
  updateUsers,
  getOrganizationalChart,
  saveOrganizationalChart
} from 'services/projects.services';
import { searchByEmail } from 'services/user.services';

export function* projectsSaveOne(action) {
  try {
    const { formData } = action;
    const { data } = yield call(save, formData);
    if (formData?.consultora) {
      const { data: dataConsultora } = yield call(
        addProject,
        formData.consultora,
        data._id
      );
      yield put({
        type: constantesConsultora.CONSULTORIA_ADD_PROJECT_SUCCEEDED,
        data: dataConsultora,
      });
    } else {
      yield put({
        type: constants.PROJECTS_ON_CREATE_SUCCEEDED,
        data,
      });
    }
  } catch (error) {
    yield put({ type: constants.PROJECTS_ON_CREATE_FAILED, error });
  }
}

export function* projectsDelete(action) {
  try {
    const { id } = action;
    const { data } = yield call(deleteProject, id);
    yield put({
      type: constants.PROJECTS_ON_DELETE_SUCCEEDED,
      data,
    });
  } catch (error) {
    yield put({ type: constants.PROJECTS_ON_DELETE_FAILED, error });
  }
}

export function* projectsOnGetAll(action) {
  try {
    const { limit, offset, search } = action;
    const { data } = yield call(getAll, { limit, offset, search });
    yield put({
      type: constants.PROJECTS_ON_GET_ALL_SUCCEEDED,
      data: data.items,
      total: data.total,
    });
  } catch (error) {
    yield put({ type: constants.PROJECTS_ON_GET_ALL_FAILED, error });
  }
}

export function* projectsOnGetOne(action) {
  try {
    const { id } = action;
    if (id) {
      const { data } = yield call(getOne, id);
      yield put({
        type: constants.PROJECTS_ON_GET_ONE_SUCCEEDED,
        data,
      });
    }
  } catch (error) {
    yield put({ type: constants.PROJECTS_ON_GET_ONE_FAILED, error });
  }
}

export function* projectsOnGetFodas(action) {
  try {
    const { id } = action;
    if (id) {
      const { data } = yield call(getFodas, id);
      yield put({
        type: constants.PROJECTS_ON_GET_FODA_SUCCEEDED,
        data,
      });
    }
  } catch (error) {
    yield put({ type: constants.PROJECTS_ON_GET_FODA_FAILED, error });
  }
}

export function* projectsOnGetPestels(action) {
  try {
    const { id } = action;
    if (id) {
      const { data } = yield call(getPestels, id);
      yield put({
        type: constants.PROJECTS_ON_GET_PESTEL_SUCCEEDED,
        data,
      });
    }
  } catch (error) {
    yield put({ type: constants.PROJECTS_ON_GET_PESTEL_FAILED, error });
  }
}

export function* projectsOnGetPorters(action) {
  try {
    const { id } = action;
    if (id) {
      const { data } = yield call(getPorters, id);
      yield put({
        type: constants.PROJECTS_ON_GET_PORTER_SUCCEEDED,
        data,
      });
    }
  } catch (error) {
    yield put({ type: constants.PROJECTS_ON_GET_PORTER_FAILED, error });
  }
}

export function* projectsOnGetAnsoffs(action) {
  try {
    const { id } = action;
    if (id) {
      const { data } = yield call(getAnsoffs, id);
      yield put({
        type: constants.PROJECTS_ON_GET_ANSOFF_SUCCEEDED,
        data,
      });
    }
  } catch (error) {
    yield put({ type: constants.PROJECTS_ON_GET_ANSOFF_FAILED, error });
  }
}

export function* projectsOnGetOkrs(action) {
  try {
    const { id } = action;
    if (id) {
      const { data } = yield call(getOkrs, id);
      yield put({
        type: constants.PROJECTS_ON_GET_OKR_SUCCEEDED,
        data,
      });
    }
  } catch (error) {
    yield put({ type: constants.PROJECTS_ON_GET_OKR_FAILED, error });
  }
}

export function* projectsOnGetMckinseys(action) {
  try {
    const { id } = action;
    if (id) {
      const { data } = yield call(getMckinsey, id);
      yield put({
        type: constants.PROJECTS_ON_GET_MCKINSEY_SUCCEEDED,
        data,
      });
    }
  } catch (error) {
    yield put({ type: constants.PROJECTS_ON_GET_MCKINSEY_FAILED, error });
  }
}

export function* projectsOnGetBalancedScorecard(action) {
  try {
    const { id } = action;
    if (id) {
      const { data } = yield call(getBalancedScorecard, id);
      yield put({
        type: constants.PROJECTS_ON_GET_BALANCED_SCORECARD_SUCCEEDED,
        data,
      });
    }
  } catch (error) {
    yield put({
      type: constants.PROJECTS_ON_GET_BALANCED_SCORECARD_FAILED,
      error,
    });
  }
}

export function* projectsOnGetQuestionnaires(action) {
  try {
    const { id } = action;
    if (id) {
      const { data } = yield call(getQuestionnaires, id);
      yield put({
        type: constants.PROJECTS_ON_GET_QUESTIONNAIRE_SUCCEEDED,
        data,
      });
    }
  } catch (error) {
    yield put({
      type: constants.PROJECTS_ON_GET_QUESTIONNAIRE_FAILED,
      error,
    });
  }
}

export function* projectsOnGetUsersShared(action) {
  try {
    const { id } = action;
    const { data } = yield call(getSharedUsers, id);
    yield put({
      type: constants.PROJECTS_SHARED_USERS_SUCCEEDED,
      data,
    });
  } catch (error) {
    yield put({ type: constants.PROJECTS_SHARED_USERS_FAILED, error });
  }
}


export function* projectsOnGetOrganizationalChart(action) {
  try {
    const { id } = action;
    const { data } = yield call(getOrganizationalChart, id);
    yield put({
      type: constants.PROJECTS_ON_GET_ORGANIZATIONAL_CHART_SUCCEEDED,
      data,
    });
  } catch (error) {
    yield put({ type: constants.PROJECTS_ON_GET_ORGANIZATIONAL_CHART_FAILED, error });
  }
}

export function* projectsOnSaveOrganizationalChart(action) {
  try {
    const { id, chart } = action;
    const { data } = yield call(saveOrganizationalChart, id, chart);
    yield put({
      type: constants.PROJECTS_ON_SAVE_ORGANIZATIONAL_CHART_SUCCEEDED,
      data: { ...chart, message: 'El organigrama se guardó exitosamente' },
    });
  } catch (error) {
    yield put({
      type: constants.PROJECTS_ON_SAVE_ORGANIZATIONAL_CHART_FAILED,
      error: { ...error }
    });
  }
}

export function* projectsOnShareUser(action) {
  try {
    const { id, formData } = action;
    const { data } = yield call(shareUser, id, formData);
    yield put({
      type: constants.PROJECTS_SHARE_USER_SUCCEEDED,
      data,
    });
  } catch (error) {
    yield put({ type: constants.PROJECTS_SHARE_USER_FAILED, error });
  }
}

export function* projectsOnUnShareUsers(action) {
  try {
    const { id, formData } = action;
    const { data } = yield call(unShareUsers, id, formData);
    yield put({
      type: constants.PROJECTS_UNSHARE_USER_SUCCEEDED,
      data,
    });
  } catch (error) {
    yield put({ type: constants.PROJECTS_UNSHARE_USER_FAILED, error });
  }
}

export function* projectsOnSearchByEmail(action) {
  try {
    const { email } = action;
    if (email) {
      const { data } = yield call(searchByEmail, email);
      yield put({
        type: constants.PROJECTS_SEARCH_BY_EMAIL_SUCCEEDED,
        data,
      });
    }
  } catch (error) {
    yield put({ type: constants.PROJECTS_SEARCH_BY_EMAIL_FAILED, error });
  }
}

export function* projectsOnAddUser(action) {
  try {
    const { id, formData } = action;
    yield call(addUser, id, formData);
    yield put({
      type: constants.PROJECTS_ADD_USER_SUCCEEDED,
      data: { message: 'Se agregó exitosamente al usuario al proyecto.' }
    })
    // reload project data after adding user (todo: refactor)
    const { data } = yield call(getOne, id);
    yield put({
      type: constants.PROJECTS_ON_GET_ONE_SUCCEEDED,
      data,
    });
  } catch (error) {
    yield put({ type: constants.PROJECTS_ADD_USER_FAILED, error });
  }
}

export function* projectsOnSaveMembers(action) {
  try {
    const { id, formData } = action;
    yield call(updateUsers, id, formData);
    yield put({
      type: constants.PROJECTS_SAVE_MEMBERS_SUCCEEDED,
      data: { message: 'Se guardaron exitosamente los cambios en los permisos.' },
    })
    // reload project data after saving members (todo: refactor)
    const { data } = yield call(getOne, id);
    yield put({
      type: constants.PROJECTS_ON_GET_ONE_SUCCEEDED,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.PROJECTS_SAVE_MEMBERS_FAILED,
      error: { ...error, message: 'Hubo un problema al guardar los cambios.' },
    })
  }
}

export function* watchProjects() {
  yield all([
    takeLatest(constants.PROJECTS_ON_GET_ONE_REQUESTED, projectsOnGetOne),
    takeLatest(constants.PROJECTS_ON_DELETE_REQUESTED, projectsDelete),
    takeLatest(constants.PROJECTS_ON_GET_ALL_REQUESTED, projectsOnGetAll),
    takeLatest(constants.PROJECTS_ON_CREATE_REQUESTED, projectsSaveOne),
    takeLatest(constants.PROJECTS_ON_GET_FODA_REQUESTED, projectsOnGetFodas),
    takeLatest(
      constants.PROJECTS_ON_GET_PORTER_REQUESTED,
      projectsOnGetPorters
    ),
    takeLatest(
      constants.PROJECTS_ON_GET_PESTEL_REQUESTED,
      projectsOnGetPestels
    ),
    takeLatest(
      constants.PROJECTS_ON_GET_ANSOFF_REQUESTED,
      projectsOnGetAnsoffs
    ),
    takeLatest(constants.PROJECTS_ON_GET_OKR_REQUESTED, projectsOnGetOkrs),
    takeLatest(
      constants.PROJECTS_ON_GET_MCKINSEY_REQUESTED,
      projectsOnGetMckinseys
    ),
    takeLatest(
      constants.PROJECTS_ON_GET_BALANCED_SCORECARD_REQUESTED,
      projectsOnGetBalancedScorecard
    ),
    takeLatest(
      constants.PROJECTS_ON_GET_QUESTIONNAIRE_REQUESTED,
      projectsOnGetQuestionnaires
    ),
    takeLatest(
      constants.PROJECTS_SHARED_USERS_REQUESTED,
      projectsOnGetUsersShared
    ),
    takeLatest(constants.PROJECTS_SHARE_USER_REQUESTED, projectsOnShareUser),
    takeLatest(
      constants.PROJECTS_UNSHARE_USER_REQUESTED,
      projectsOnUnShareUsers
    ),
    takeLatest(constants.PROJECTS_SEARCH_BY_EMAIL_REQUESTED, projectsOnSearchByEmail),
    takeLatest(constants.PROJECTS_ADD_USER_REQUESTED, projectsOnAddUser),
    takeLatest(constants.PROJECTS_SAVE_MEMBERS_REQUESTED, projectsOnSaveMembers),
    takeLatest(constants.PROJECTS_ON_GET_ORGANIZATIONAL_CHART_REQUESTED, projectsOnGetOrganizationalChart),
    takeLatest(constants.PROJECTS_ON_SAVE_ORGANIZATIONAL_CHART_REQUESTED, projectsOnSaveOrganizationalChart),
  ]);
}

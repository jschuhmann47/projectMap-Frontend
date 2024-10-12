import { all, call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import {
  getOneOkr,
  addKeyResult,
  createOkr,
  editKeyResult,
  deleteOkr,
  deleteKeyResult,
  editOneOkr,
} from 'services/okr.services';

import * as constants from 'redux/contansts/okr.constants';
import { horizonOptions } from 'helpers/enums/okr';
import store from 'redux/store';
import { onGetOKR } from 'redux/actions/projects.actions';

export function* okrCreateTool(action) {
  try {
    const { formData } = action;
    const req = {
      description: formData.titulo,
      areaId: formData.areaId,
      horizon: +Object.entries(horizonOptions).find((kv) => kv[1] === formData.horizon)[0],
      keyResults: [],
      projectId: formData.projectId,
      startingDate: formData.startingDate,
    };
    const { data } = yield call(createOkr, req);
    const { projectId } = formData;
    store.dispatch(onGetOKR(projectId))
    yield put({ type: constants.CREATE_OKR_TOOL_SUCCEEDED, data });
  } catch (error) {
    yield put({
      type: constants.CREATE_OKR_TOOL_FAILED,
      error: { ...error, message: 'La creación del OKR falló.' },
    });
  }
}

export function* okrEditTool(action) {
  try {
    const { id, formData } = action;
    const { data } = yield call(editOneOkr, id, formData);
    yield put({ type: constants.EDIT_OKR_TOOL_SUCCEEDED, data });
  } catch (error) {
    yield put({ type: constants.EDIT_OKR_TOOL_FAILED, error });
  }
}

export function* okrGetOkrTool(action) {
  try {
    const { id } = action;
    const { data } = yield call(getOneOkr, id);
    yield put({ type: constants.GET_OKR_TOOL_SUCCEEDED, data });
  } catch (error) {
    yield put({ type: constants.GET_OKR_TOOL_FAILED, error });
  }
}

export function* okrDelete(action) {
  try {
    const { id } = action;
    const { data } = yield call(deleteOkr, id);
    yield put({ type: constants.DELETE_OKR_TOOL_SUCCEEDED, data: { _id: data } });
  } catch (error) {
    yield put({ type: constants.DELETE_OKR_TOOL_FAILED, error });
  }
}

export function* okrAddKeyResult(action) {
  try {
    const { id, formData } = action;
    const { data } = yield call(addKeyResult, id, formData);
    yield put({ type: constants.ADD_OKR_KEY_RESULT_SUCCEEDED, data });
  } catch (error) {
    yield put({ type: constants.ADD_OKR_KEY_RESULT_FAILED, error });
  }
}

export function* okrEditKeyResult(action) {
  try {
    const { id, keyResultId, formData } = action;
    const { data } = yield call(
      editKeyResult,
      id,
      keyResultId,
      formData
    );
    yield put({
      type: constants.EDIT_KEY_RESULT_SUCCEEDED,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.EDIT_KEY_RESULT_FAILED,
      error,
    });
  }
}


export function* okrDeleteKeyResult(action) {
  try {
    const { id, keyResultId } = action;
    const { data } = yield call(deleteKeyResult, id, keyResultId);
    yield put({
      type: constants.DELETE_KEY_RESULT_SUCCEEDED,
      data,
    });
  } catch (error) {
    yield put({ type: constants.DELETE_KEY_RESULT_FAILED, error });
  }
}

export function* watchOkr() {
  yield all([
    takeLatest(constants.CREATE_OKR_TOOL_REQUESTED, okrCreateTool),
    takeLatest(constants.EDIT_OKR_TOOL_REQUESTED, okrEditTool),
    takeLatest(constants.GET_OKR_TOOL_REQUESTED, okrGetOkrTool),
    takeLatest(constants.DELETE_OKR_TOOL_REQUEST, okrDelete),
    takeLatest(constants.ADD_OKR_KEY_RESULT_REQUESTED, okrAddKeyResult),
    takeEvery(constants.EDIT_KEY_RESULT_REQUESTED, okrEditKeyResult),
    takeLatest(constants.DELETE_KEY_RESULT_REQUESTED, okrDeleteKeyResult),
  ]);
}

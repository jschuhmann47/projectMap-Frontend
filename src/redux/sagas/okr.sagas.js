import { all, call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import {
  getOneOkr,
  addKeyResult,
  createOkr,
  editKeyResult,
  deleteOkr,
  deleteKeyResult,
} from 'services/okr.services';

import * as constants from 'redux/contansts/okr.constants';

export function* okrCreateTool(action) {
  try {
    const { formData } = action;
    const { data } = yield call(createOkr, formData);
    yield put({ type: constants.CREATE_OKR_TOOL_SUCCEEDED, data });
  } catch (error) {
    yield put({ type: constants.CREATE_OKR_TOOL_FAILED, error });
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
    yield put({ type: constants.DELETE_OKR_TOOL_SUCCEEDED, data });
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
    takeLatest(constants.GET_OKR_TOOL_REQUESTED, okrGetOkrTool),
    takeLatest(constants.DELETE_OKR_TOOL_REQUEST, okrDelete),
    takeLatest(constants.ADD_OKR_KEY_RESULT_REQUESTED, okrAddKeyResult),
    takeEvery(constants.EDIT_KEY_RESULT_REQUESTED, okrEditKeyResult),
    takeLatest(constants.DELETE_KEY_RESULT_REQUESTED, okrDeleteKeyResult),
  ]);
}

import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
  create,
  deleteFoda,
  getOne,
  insertFactor,
  deleteFactor,
  updateFactor,
  getOptions,
  getSeeds,
} from 'services/foda.services';

import * as constants from 'redux/contansts/foda.constants';
import store from 'redux/store';
import { onGetFoda } from 'redux/actions/projects.actions';

export function* fodaCreate(action) {
  try {
    const { formData } = action;
    const { data } = yield call(create, formData);
    const { projectId } = formData;
    store.dispatch(onGetFoda(projectId))
    yield put({ type: constants.CREATE_FODA_SUCCEEDED, data });
  } catch (error) {
    yield put({
      type: constants.CREATE_FODA_FAILED,
      error: { ...error, message: 'La creación del análisis FODA falló.' },
    });
  }
}

export function* fodaDelete(action) {
  try {
    const { formData, id } = action;
    const { data } = yield call(deleteFoda, id, formData);
    yield put({ type: constants.DELETE_FODA_SUCCEEDED, data });
  } catch (error) {
    yield put({ type: constants.DELETE_FODA_FAILED, error });
  }
}

export function* fodaGet(action) {
  try {
    const { id } = action;
    const { data } = yield call(getOne, id);
    yield put({ type: constants.GET_FODA_SUCCEEDED, data });
  } catch (error) {
    yield put({ type: constants.GET_FODA_FAILED, error });
  }
}

export function* fodaInsertFactor(action) {
  try {
    const { formData, id } = action;
    const { data } = yield call(insertFactor, id, formData);
    yield put({ type: constants.FODA_INSERT_FACTOR_SUCCEEDED, data });
  } catch (error) {
    yield put({ type: constants.FODA_INSERT_FACTOR_FAILED, error });
  }
}

export function* fodaDeleteFactor(action) {
  try {
    const { idFoda, idFactor } = action;
    const { data } = yield call(deleteFactor, idFoda, idFactor);
    yield put({ type: constants.FODA_DELETE_FACTOR_SUCCEEDED, data });
  } catch (error) {
    yield put({ type: constants.FODA_DELETE_FACTOR_FAILED, error });
  }
}

export function* fodaUpdateFactor(action) {
  try {
    const { formData, idFoda, idFactor } = action;
    const { data } = yield call(updateFactor, idFoda, idFactor, formData);
    yield put({ type: constants.FODA_UPDATE_FACTOR_SUCCEEDED, data });
  } catch (error) {
    yield put({ type: constants.FODA_UPDATE_FACTOR_FAILED, error });
  }
}

export function* fodaGetOptions(action) {
  try {
    const { data: options } = yield call(getOptions);
    yield put({
      type: constants.FODA_GET_OPTIONS_SUCCEEDED,
      data: { options },
    });
  } catch (error) {
    yield put({ type: constants.FODA_GET_OPTIONS_FAILED, error });
  }
}

export function* fodaGetSeeds() {
  try {
    const { data: seeds } = yield call(getSeeds);
    yield put({
      type: constants.FODA_GET_SEEDS_SUCCEEDED,
      data: { seeds },
    });
  } catch (error) {
    yield put({ type: constants.FODA_GET_SEEDS_FAILED, error });
  }
}

export function* watchFoda() {
  yield all([
    takeLatest(constants.CREATE_FODA_REQUESTED, fodaCreate),
    takeLatest(constants.DELETE_FODA_REQUEST, fodaDelete),
    takeLatest(constants.GET_FODA_REQUESTED, fodaGet),
    takeLatest(constants.FODA_INSERT_FACTOR_REQUESTED, fodaInsertFactor),
    takeLatest(constants.FODA_DELETE_FACTOR_REQUESTED, fodaDeleteFactor),
    takeLatest(constants.FODA_UPDATE_FACTOR_REQUESTED, fodaUpdateFactor),
    takeLatest(constants.FODA_GET_OPTIONS_REQUESTED, fodaGetOptions),
    takeLatest(constants.FODA_GET_SEEDS_REQUESTED, fodaGetSeeds),
  ]);
}

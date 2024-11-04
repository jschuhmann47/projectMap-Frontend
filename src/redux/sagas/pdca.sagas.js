import * as constants from 'redux/contansts/pdca.constants';
import { put, call, all, takeLatest } from 'redux-saga/effects';
import { createPdca, deletePdca } from 'services/pdca.services';
import { onGetPdcas } from 'redux/actions/projects.actions';
import store from 'redux/store';

function* pdcaCreate(action) {
  try {
    const { formData } = action;
    const req = {
      name: formData.titulo,
      projectId: formData.projectId,
    };
    const { data } = yield call(createPdca, req);
    store.dispatch(onGetPdcas(formData.projectId));
    yield put({ type: constants.CREATE_PDCA_SUCCEEDED, data });
  } catch (error) {
    yield put({
      type: constants.CREATE_PDCA_FAILED,
      error: { ...error, message: 'La creación del ciclo PDCA falló.' },
    });
  }
}

function* pdcaDelete(action) {
  try {
    const { id } = action;
    yield call(deletePdca, id);
    yield put({ type: constants.DELETE_PDCA_SUCCEEDED, data: { _id: id } });
  } catch (error) {
    yield put({ type: constants.DELETE_PDCA_FAILED, error });
  }
}

export function* watchPdca() {
  yield all([
    takeLatest(constants.CREATE_PDCA_REQUESTED, pdcaCreate),
    takeLatest(constants.DELETE_PDCA_REQUESTED, pdcaDelete),
  ])
}

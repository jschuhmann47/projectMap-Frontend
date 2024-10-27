import * as constants from 'redux/contansts/pdca.constants';
import { put, call, all, takeLatest } from 'redux-saga/effects';
import { createPdca, deletePdca } from 'services/pdca.services';

function* pdcaCreate(action) {
  try {
    const { formData } = action;
    const req = {
      name: formData.titulo,
      projectId: formData.projectId,
    };
    const { data } = yield call(createPdca, req);
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
    const { data } = yield call(deletePdca, id);
    yield put({ type: constants.DELETE_PDCA_SUCCEEDED, data });
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

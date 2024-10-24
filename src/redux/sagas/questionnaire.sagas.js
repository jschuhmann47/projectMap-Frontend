import { all, call, put, takeLatest } from '@redux-saga/core/effects';
import { onGetQuestionnaire } from 'redux/actions/projects.actions';
import * as constants from 'redux/contansts/questionnarie.constants';
import store from 'redux/store';
import {
  create,
  deleteQuestionnaire,
  getOne,
  insert,
  questions,
} from 'services/questionnaire.services';

export function* questionnaireCreate(action) {
  try {
    const { formData } = action;
    const { data } = yield call(create, formData);
    const { projectId } = formData;
    store.dispatch(onGetQuestionnaire(projectId))
    yield put({
      type: constants.QUESTIONNARIE_ON_CREATE_SUCCEEDED,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.QUESTIONNARIE_ON_CREATE_FAILED,
      error: { ...error, message: 'La creación del plan de transformación falló.' },
    });
  }
}

export function* questionnaireGetQuestions() {
  try {
    const { data } = yield call(questions);
    yield put({
      type: constants.QUESTIONNARIE_ON_GET_QUIESTIONS_SUCCEEDED,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.QUESTIONNARIE_ON_GET_QUESTIONS_FAILED,
      error,
    });
  }
}

export function* questionnaireGetOne(action) {
  try {
    const { id } = action;
    const { data } = yield call(getOne, id);
    yield put({
      type: constants.QUESTIONNARIE_ON_GET_ONE_SUCCEEDED,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.QUESTIONNARIE_ON_GET_ONE_FAILED,
      error,
    });
  }
}

export function* questionnaireDelete(action) {
  try {
    const { id } = action;
    const { data } = yield call(deleteQuestionnaire, id);
    yield put({
      type: constants.QUESTIONNARIE_ON_DELETE_SUCCEEDED,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.QUESTIONNARIE_ON_DELETE_FAILED,
      error,
    });
  }
}

export function* questionnaireInsert(action) {
  try {
    const { id, formData } = action;
    const { data } = yield call(insert, formData, id);
    yield put({
      type: constants.QUESTIONNARIE_ON_INSERT_SUCCEEDED,
      data,
    });
    yield put({
      type: constants.QUESTIONNARIE_ON_GET_ONE_REQUESTED,
      id,
    });
  } catch (error) {
    yield put({
      type: constants.QUESTIONNARIE_ON_INSERT_FAILED,
      error,
    });
  }
}

export function* watchQuestionnaire() {
  yield all([
    takeLatest(
      constants.QUESTIONNARIE_ON_CREATE_REQUESTED,
      questionnaireCreate
    ),
    takeLatest(
      [
        constants.QUESTIONNARIE_ON_GET_ONE_REQUESTED,
        constants.QUESTIONNARIE_ON_GET_QUESTIONS_REQUESTED,
      ],
      questionnaireGetQuestions
    ),
    takeLatest(
      [
        constants.QUESTIONNARIE_ON_GET_ONE_REQUESTED,
        constants.QUESTIONNARIE_ON_GET_QUESTIONS_REQUESTED,
      ],
      questionnaireGetOne
    ),
    takeLatest(
      constants.QUESTIONNARIE_ON_INSERT_REQUESTED,
      questionnaireInsert
    ),
    takeLatest(
      constants.QUESTIONNARIE_ON_DELETE_REQUESTED,
      questionnaireDelete
    ),
  ]);
}

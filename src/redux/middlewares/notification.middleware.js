import {
  sendSuccessNotification,
  sendErrorNotification,
} from 'helpers/notifications';
import * as projectConstants from 'redux/contansts/projects.constants';
import * as userConstants from 'redux/contansts/user.constants';
import * as pestelConstants from 'redux/contansts/pestel.constants';
import * as porterConstants from 'redux/contansts/porter.constants';
import * as fodaConstants from 'redux/contansts/foda.constants';
import * as ansoffConstants from 'redux/contansts/ansoff.constants';
import * as mcKinseyConstants from 'redux/contansts/mckinsey.constants';
import * as questionnaireConstants from 'redux/contansts/questionnarie.constants';
import * as okrConstants from 'redux/contansts/okr.constants';
import * as bscConstants from 'redux/contansts/balanceScorecard.constants';
import * as pdcaConstants from 'redux/contansts/pdca.constants';

const notificationMiddleware = () => (next) => (action) => {
  const { data, error, type } = action;
  switch (type) {
    case userConstants.USER_ON_LOGIN_SUCCEEDED:
    case userConstants.USER_ON_FORGOT_PASSWORD_SUCCEEDED:
    case projectConstants.PROJECTS_SAVE_MEMBERS_SUCCEEDED:
    case projectConstants.PROJECTS_ON_SAVE_ORGANIZATIONAL_CHART_SUCCEEDED:
    case projectConstants.PROJECTS_ADD_USER_SUCCEEDED:
    case userConstants.USER_ON_REGISTER_SUCCEEDED:
      sendSuccessNotification(data.message);
      break;
    case userConstants.USER_ON_FORGOT_PASSWORD_FAILED:
    case userConstants.USER_ON_LOGIN_FAILED:
    case userConstants.USER_ON_LOGOUT_FAILED:
    case userConstants.USER_ON_RESET_PASSWORD_FAILED:
    case userConstants.USER_ON_REGISTER_FAILED:
    case projectConstants.PROJECTS_SAVE_MEMBERS_FAILED:
    case projectConstants.PROJECTS_ON_SAVE_ORGANIZATIONAL_CHART_FAILED:
    case pestelConstants.CREATE_PESTEL_FAILED:
    case porterConstants.PORTER_CREATE_FAILED:
    case fodaConstants.CREATE_FODA_FAILED:
    case ansoffConstants.CREATE_ANSOFF_FAILED:
    case mcKinseyConstants.CREATE_MCKINSEY_FAILED:
    case questionnaireConstants.QUESTIONNARIE_ON_CREATE_FAILED:
    case okrConstants.CREATE_OKR_TOOL_FAILED:
    case bscConstants.CREATE_BALANCE_SCORECARD_FAILED:
    case pdcaConstants.CREATE_PDCA_FAILED:
    case pdcaConstants.PATCH_PDCA_FAILED:
      sendErrorNotification(error.response?.data?.message || error.message);
      break;
  }
  if (error?.response?.status === 401) {
    // if status is unauthorized, we must redirect the user to the login page.
    window.location.assign('/login');
  }
  return next(action);
};

export default notificationMiddleware;

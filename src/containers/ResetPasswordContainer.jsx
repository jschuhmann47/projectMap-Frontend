import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { onResetPassword, onVerifyCode } from 'redux/actions/user.actions';

import Loading from 'components/commons/Loading';
import LayoutContainer from 'containers/LayoutContainer';
import ResetPasswordView from 'views/ResetPasswordView';

const ResetPasswordContainer = () => {
  const dispatch = useDispatch();
  const { loading, temporaryToken } = useSelector((state) => state.user);

  function verifyCode(formData) {
    dispatch(onVerifyCode(formData));
  }
  function resetPassword(formData) {
    if (!formData.password || formData.password !== formData.repeat) {
      return;
    }
    dispatch(onResetPassword(formData, temporaryToken));
  }

  return (
    <LayoutContainer hasHeader={false}>
      <ResetPasswordView
        onVerifyCode={verifyCode}
        onResetPassword={resetPassword}
        step={temporaryToken ? 'resetPassword' : 'verifyCode'}
      />
      {loading && <Loading isModalMode message="Cargando" />}
    </LayoutContainer>
  );
};

export default ResetPasswordContainer;

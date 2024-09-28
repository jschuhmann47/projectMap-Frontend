import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { onResetPassword, onVerifyCode } from 'redux/actions/user.actions';

import Loading from 'components/commons/Loading';
import LayoutContainer from 'containers/LayoutContainer';
import ResetPasswordView from 'views/ResetPasswordView';
import { useNavigate } from 'react-router-dom';

const ResetPasswordContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, temporaryToken, resetSucceeded } = useSelector((state) => state.user);

  function verifyCode(formData) {
    dispatch(onVerifyCode(formData));
  }
  function resetPassword(formData) {
    if (!formData.password || formData.password !== formData.repeat) {
      return;
    }
    dispatch(onResetPassword({ newPassword: formData.password }, temporaryToken));
  }

  useEffect(() => {
    if (resetSucceeded) navigate('/dashboard')
  }, [resetSucceeded])

  return (
    <LayoutContainer hasHeader={false}>
      <ResetPasswordView
        onVerifyCode={verifyCode}
        onResetPassword={resetPassword}
        step={temporaryToken ? 'newPassword' : 'verifyCode'}
      />
      {loading && <Loading isModalMode message="Cargando" />}
    </LayoutContainer>
  );
};

export default ResetPasswordContainer;

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { onVerifyCode } from 'redux/actions/user.actions';

import Loading from 'components/commons/Loading';
import LayoutContainer from 'containers/LayoutContainer';
import ResetPasswordView from 'views/ResetPasswordView';

const ResetPasswordContainer = () => {
  const dispatch = useDispatch();
  const { loading, temporaryToken } = useSelector((state) => state.user);

  const verifyCode = (formData) => dispatch(onVerifyCode(formData));

  return (
    <LayoutContainer hasHeader={false}>
      <ResetPasswordView
        onVerifyCode={verifyCode}
        onResetPassword={() => {}}
        step={temporaryToken ? 'resetPassword' : 'verifyCode'}
      />
      {loading && <Loading isModalMode message="Cargando" />}
    </LayoutContainer>
  );
};

export default ResetPasswordContainer;

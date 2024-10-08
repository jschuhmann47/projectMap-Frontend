import Loading from 'components/commons/Loading';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getUser, onEdit, onGetProfile } from 'redux/actions/user.actions';

import ProfileView from 'views/ProfileView';
import { Box, ButtonBase } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

import LayoutContainer from './LayoutContainer';

const UserProfileContainer = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.data);
  const profile = useSelector((state) => state.user.profile);
  const loading = useSelector((state) => state.user.loading);
  const loadingProfile = useSelector((state) => state.user.loadingProfile);

  useEffect(() => {
    if (userId) {
      dispatch(onGetProfile(userId));
    } else {
      dispatch(getUser());
    }
  }, [userId]);

  const onSubmit = (formData) => {
    dispatch(onEdit(profile?._id || user?._id, formData));
  };

  const initialValues = {
    _id: '',
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    calendlyUser: '',
  };

  const data = userId ? profile : user;
  const userData = { ...initialValues, ...data };

  const loadingPosta = userId ? loadingProfile : loading;

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <LayoutContainer>
      <ButtonBase
        onClick={handleBack}
        sx={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          display: 'flex',
          alignItems: 'center',
          padding: '8px 12px',
          borderRadius: '5px',
          backgroundColor: '#2c3e50',
          color: '#fff',
          fontSize: '16px',
          zIndex: 1,
          margin: '3%'
        }}
      >
        <ArrowBack />
        Volver
      </ButtonBase>
      {loadingPosta ? (
        <Loading isModalMode />
      ) : (
        <ProfileView onSubmit={onSubmit} user={userData} />
      )}
    </LayoutContainer>
  );
};

export default UserProfileContainer;

import React, { useEffect } from 'react';
import LayoutContainer from 'containers/LayoutContainer';
import { useParams } from 'react-router';
import OKRView from 'views/OKRView/indexv2';
import { Grid } from '@mui/material';
import {
  onAddKeyResult,
  onDeleteKeyResult,
  onEditKeyResult,
  onGetOneTool,
} from 'redux/actions/okr.actions';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import Loading from 'components/commons/Loading';
import { frequencyOptions } from 'helpers/enums/okr';
import { useNavigate } from 'react-router-dom';

const OKRContainer = () => {
  const { okrToolId, id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, data: okrData } = useSelector((state) => state.okr);
  const [isAddKrModalOpen, setIsAddKrModalOpen] = useState(false);
  const [krToDelete, setKrToDelete] = useState(null);
  const [confirmDeleteError, setConfirmDeleteError] = useState('');

  useEffect(() => {
    dispatch(onGetOneTool(okrToolId));
  }, []);

  function addKr({ description, frequency, responsible }) {
    const formData = {
      description,
      frequency: +(Object.entries(frequencyOptions).find((kv) => kv[1] === frequency)[0]),
      responsible,
      baseline: 0,
      goal: 0,
      priority: 0,
    };
    dispatch(onAddKeyResult(okrToolId, formData));
    setIsAddKrModalOpen(false);
  };
  
  function editKr({
    baseline,
    description,
    frequency,
    goal,
    keyStatus,
    priority,
    responsible,
    _id
  }) {
    const formData = {
      description,
      responsible,
      priority,
      baseline,
      goal,
      frequency,
      keyStatus,
    };
    dispatch(onEditKeyResult(okrToolId, _id, formData));
  };

  function deleteKr(keyResultId) {
    dispatch(onDeleteKeyResult(okrToolId, keyResultId));
  };

  function submitConfirmDeleteModal({ name }) {
    if (name !== krToDelete?.description) {
      setConfirmDeleteError('Nombre del Key Result incorrecto.');
      return;
    }
    deleteKr(krToDelete?._id);
    setConfirmDeleteError('');
    setKrToDelete(null);
  }

  return (
    <LayoutContainer>
      <Grid item sx={{ height: '100%', width: '100%' }}>
        <OKRView
          okrData={okrData}
          openAddKrModal={() => setIsAddKrModalOpen(true)}
          closeAddKrModal={() => setIsAddKrModalOpen(false)}
          isAddKrModalOpen={isAddKrModalOpen}
          addKr={addKr}
          editKr={editKr}
          openConfirmDeleteModal={(kr) => setKrToDelete(kr)}
          closeConfirmDeleteModal={() => setKrToDelete(null)}
          isConfirmDeleteModalOpen={!!krToDelete}
          submitConfirmDeleteModal={submitConfirmDeleteModal}
          confirmDeleteModalError={confirmDeleteError}
          onClickBack={() => navigate(`/projects/${id}`)}
        />
      </Grid>
      {loading && <Loading isModalMode message="Cargando OKR" />}
    </LayoutContainer>
  );
};

export default OKRContainer;
